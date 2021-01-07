import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { cambiarTotalSolicitado, seleccionarDatosTablaAnexos, seleccionarDatosTablaImpuestos } from '../../actions/solicitud-devolucion.actions';
import {
  CONFIGURACION_TABLA_ANEXOS, DATOS_TABLA_ANEXOS,
  CONFIGURACION_TABLA_IMPUESTOS, DATOS_TABLA_IMPUESTOS
} from '../../interfaces/interfaces';
import { getTipoDevolucion } from '../../selectors/solicitud-devolucion.selectors';

@Component({
  selector: 'ngx-set-anexosimpuestos',
  templateUrl: './set-anexosimpuestos.component.html',
  styleUrls: ['./set-anexosimpuestos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetAnexosimpuestosComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) modalEliminar: ElementRef;
  configTablaAnexos: any;
  datosAnexos: any;
  valorDevolucion: number;
  subscription: any;
  tipoDevolucion: string;
  datosImpuestos: FormGroup;
  configTablaImpuestos: any;
  datosTablaImpuestos: any;
  selectedIndex: number;
  subscription2$: any;
  susTotalSolicitado$: any;


  constructor(private store: Store<any>, private fb: FormBuilder, private modalService: NgbModal) {
    this.configTablaAnexos = CONFIGURACION_TABLA_ANEXOS;
    this.datosAnexos = [];
    this.configTablaImpuestos = CONFIGURACION_TABLA_IMPUESTOS;
    this.datosTablaImpuestos = [];
    this.tipoDevolucion = null;
    this.selectedIndex = 0;
  }

  ngOnInit() {
    this.subscription = this.store.select(getTipoDevolucion).subscribe((valor) => {
      if (valor && valor.tipoDevolucion) {
        this.tipoDevolucion = valor.tipoDevolucion;
      }
    });
    this.crearFormulario();
    this.subscription2$ = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion && accion.fila && accion.accion.idTable) {
        if (accion.accion.idTable === 'anexos') {
          this.eliminarAnexo(accion.fila);
        } else if (accion.accion.idTable === 'impuestos') {
          this.eliminarImpuesto(accion.fila);
        }
      }
    });
    this.susTotalSolicitado$ = this.datosImpuestos.get('valorDevolucion').valueChanges.subscribe(valor => {
      if (this.datosImpuestos.valid)
        this.store.dispatch(cambiarTotalSolicitado({ totalSolicitado: valor }));
    });
    this.agregar(); // Eliminar
  }

  crearFormulario() {
    this.datosImpuestos = this.fb.group({
      valorDevolucion: ['', Validators.required],
      nombreImpuesto: ['IVA'],
      porcentaje: ['19'],
      base: ['15789473.68'],
      valorLetras: ['']
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosImpuestos.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario() {
    if (this.datosImpuestos.invalid) {
      return Object.values(this.datosImpuestos.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2$.unsubscribe();
    this.susTotalSolicitado$.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  agregar() {
    // TODO
    const elemento = Object.assign({}, DATOS_TABLA_IMPUESTOS[0]);
    elemento.porcentaje = this.datosImpuestos.get('porcentaje').value / 100;
    elemento.base = this.datosImpuestos.get('base').value;
    elemento.valorLetras = this.datosImpuestos.get('valorLetras').value;
    elemento.valorCifras = this.valorCifras;
    this.datosTablaImpuestos.push(elemento);
    this.store.dispatch(seleccionarDatosTablaImpuestos({ datosTablaImpuestos: this.datosTablaImpuestos }));
  }

  get valorCifras() {
    return this.datosImpuestos.get('base').value * this.datosImpuestos.get('porcentaje').value / 100;
  }

  get totalImpuestos() {
    const total = this.datosTablaImpuestos.reduce((a: any, b: { valorCifras: number; }) => a + b.valorCifras, 0);
    if (total && total !== undefined && total !== 0) {
      this.datosImpuestos.get('valorDevolucion').setValue(total);
    }
    return total;
  }

  selectTab(current: number, index: number) {
    const dif = this.selectedIndex - index;
    this.selectedIndex -= dif !== 0 ? dif : current - index;
  }

  eliminarAnexo(fila: any) {
    this.modalService.open(this.modalEliminar).result.then((result) => {
      if (`${result}`) {
        this.datosAnexos.splice(this.datosAnexos.findIndex(
          (element: any) => element.nombre === fila.nombre
            && element.estado === fila.estado
        ), 1);
        this.store.dispatch(seleccionarDatosTablaAnexos({ datosTablaAnexos: this.datosAnexos }));
      }
    }, () => { });
  }

  eliminarImpuesto(fila: any) {
    this.modalService.open(this.modalEliminar).result.then((result) => {
      if (`${result}`) {
        this.datosTablaImpuestos.splice(this.datosTablaImpuestos.findIndex(
          (element: any) => element.nombreImpuesto === fila.nombreImpuesto
            && element.porcentaje === fila.porcentaje
            && element.base === fila.base
            && element.valorLetras === fila.valorLetras
            && element.valorCifras === fila.valorCifras
        ), 1);
        this.store.dispatch(seleccionarDatosTablaImpuestos({ datosTablaImpuestos: this.datosTablaImpuestos }));
      }
    }, () => { });
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.datosAnexos.push({ nombre: item.name, estado: '', file: item });
      this.store.dispatch(seleccionarDatosTablaAnexos({ datosTablaAnexos: this.datosAnexos }));
    }
  }

}
