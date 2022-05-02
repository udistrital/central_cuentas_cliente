import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_IMPUESTOS_RETENCIONES, DATOS_IMPUESTOS_RETENCIONES
} from '../../interfaces/interfaces';
import { ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada, getConceptosContables, selectRetenciones, getNodoSeleccionadoCuentaContable,
        getNodoSeleccionadoConcepto, seleccionarConcepto, selectOrdenesPagoById} from '../../../../shared/selectors/shared.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getConcepto, GetConceptosContables, getRetenciones, LoadFilaSeleccionada, SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { cargarDatosImpuestosYRetenciones, cargarImpYRet } from '../../actions/ordenespago.actions';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-set-impuestosyretenciones',
  templateUrl: './set-impuestosyretenciones.component.html',
  styleUrls: ['./set-impuestosyretenciones.component.scss']
})
export class SetImpuestosyretencionesComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  impuestosYRetenciones: FormGroup;
  configTableImpuestosRetenciones: any;
  datosTableImpuestosRetenciones: any;
  conceptosContables: any;
  subscription: any;
  subscriptionConceptos$: any;
  opcionesAreaFuncional: any;
  subRetenciones$: any;
  retenciones: any;
  porcentaje: any;
  subGetNodoSeleccionadoCuenta$: any;
  cuentaContableSeleccionada: any;
  subGetNodoSeleccionadoConcepto$: any;
  conceptoSeleccionado: any;
  subConcepto$: any;
  concepto: any;
  subscriptionCambios$: any;
  tituloAccion: string;
  subOrdenesPago$: any;
  ordenPago: any;
  subConceptos$: any;
  conceptos: any;
  editable: boolean = true;
  flagOP: boolean = true;
  subImpYRet$: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    ) {
    this.configTableImpuestosRetenciones = CONFIGURACION_IMPUESTOS_RETENCIONES;
    this.datosTableImpuestosRetenciones = [];
    this.store.dispatch(GetConceptosContables({ id: '' }));
    this.store.dispatch(getRetenciones({query: {TipoParametroId__Id: 54}}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    if (this.tituloAccion === 'ver') {
      this.editable = false;
      this.configTableImpuestosRetenciones.rowActions.actions[0].ngIf = false;
    }
  }

  ngOnInit() {
    this.porcentaje = '';
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    // Form
    this.impuestosYRetenciones = this.fb.group({
      retencion: [''],
      baseRetencion: [''],
      porcentajeDescuento: [''],
      conceptoContable: ['', Validators.required],
      codigoContable: [''],
      validator: ['', Validators.required]
    });
    // Conceptos contables
    this.subscriptionConceptos$ = this.store.select(getConceptosContables).subscribe((conceptos) => {
      this.conceptosContables = conceptos[0];
    });
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion) {
        if (accion.accion.idStep === 4 && accion.accion.name === 'modificar') {
          this.modalEliminar(accion.fila);
        }
      }
    });
    this.subRetenciones$ = this.store.select(selectRetenciones).subscribe((action) => {
      if (action && action.Retenciones) {
        this.retenciones = action.Retenciones;
        action.Retenciones = null;
      }
    });

    this.subscriptionCambios$ = this.impuestosYRetenciones.get('conceptoContable').valueChanges.subscribe((valor) => {
      this.store.dispatch(cargarImpYRet({ ImpYRet: valor }));
    });

    this.subOrdenesPago$ = this.store.select(selectOrdenesPagoById).subscribe((action) => {
      if (this.flagOP && action && action.OrdenesPagoById) {
        this.ordenPago = action.OrdenesPagoById;
        this.flagOP = false;
        if (this.tituloAccion === 'ver' || this.tituloAccion === 'editar') this.ordenesPago();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subRetenciones$.unsubscribe();
    this.subscriptionConceptos$.unsubscribe();
    this.subscriptionCambios$.unsubscribe();
    this.subOrdenesPago$.unsubscribe();
    if (this.subConcepto$) this.subConcepto$.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosTableImpuestosRetenciones.splice(this.datosTableImpuestosRetenciones.findIndex(
          (element: any) => element.codigo === fila.codigo
            && element.descuento === fila.descuento
            && element.base === fila.base
            && element.valor === fila.valor
        ), 1);
      }
    });
  }

  agregar() {
    const elemento = Object.assign({}, DATOS_IMPUESTOS_RETENCIONES[0]);
    elemento.Descuento = this.impuestosYRetenciones.get('porcentajeDescuento').value + '%';
    elemento.Base = this.impuestosYRetenciones.get('baseRetencion').value;
    elemento.Valor = this.valorDescuento;
    elemento.Nombre = this.impuestosYRetenciones.value.retencion.Nombre;
    elemento.Codigo = this.cuentaContableSeleccionada.data.Codigo;
    this.datosTableImpuestosRetenciones.push(elemento);
    this.validator();
  }

  SeleccionarCuentaContable(cuentaContable: any) {
    this.store.dispatch(SeleccionarCuentaContable(cuentaContable));
  }

  agregarCuentaContable() {
    this.subGetNodoSeleccionadoCuenta$ = this.store.select(getNodoSeleccionadoCuentaContable).subscribe((nodoCuenta: any) => {
      if (nodoCuenta) {
        if (Object.keys(nodoCuenta)[0] !== 'type') {
          if (nodoCuenta && !nodoCuenta.children) {
            this.SeleccionarCuentaContable(nodoCuenta);
            this.cuentaContableSeleccionada = nodoCuenta;
            this.impuestosYRetenciones.patchValue({
              codigoContable: this.cuentaContableSeleccionada.data.Codigo + ' - ' + this.cuentaContableSeleccionada.data.Nombre
            });
          }
        }
      }
    });
    this.subGetNodoSeleccionadoCuenta$.unsubscribe();
  }

  agregarConcepto() {
    if (this.subGetNodoSeleccionadoConcepto$) this.subGetNodoSeleccionadoConcepto$.unsubscribe();
    this.subGetNodoSeleccionadoConcepto$ = this.store.select(getNodoSeleccionadoConcepto).subscribe((nodoConcepto) => {
      if (nodoConcepto && Object.keys(nodoConcepto)[0] !== 'type') {
        this.store.dispatch(getConcepto({codigo: nodoConcepto.Codigo}));
        if (this.subConcepto$) {
          this.subConcepto$.unsubscribe();
          this.concepto = null;
        }
        this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
          if (concepto && concepto.Concepto) {
            this.concepto = concepto.Concepto;
            concepto.Concepto = null;
            this.impuestosYRetenciones.patchValue({
              conceptoContable: this.concepto
            });
          }
        });
      }
    });
  }

  retencion() {
    this.impuestosYRetenciones.patchValue({
      porcentajeDescuento: this.impuestosYRetenciones.value.retencion.Descripcion
    });
  }

  isInvalid(nombre: string) {
    const input = this.impuestosYRetenciones.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario() {
    if (this.datosTableImpuestosRetenciones.length > 0) {
      this.validator();
    }
    if (this.impuestosYRetenciones.invalid) {
      return Object.values(this.impuestosYRetenciones.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(cargarDatosImpuestosYRetenciones({data: this.datosTableImpuestosRetenciones}));
    }
  }

  ordenesPago() {
    this.datosTableImpuestosRetenciones = this.ordenPago.ImpuestosRetenciones;
    this.store.dispatch(getConcepto({codigo: this.ordenPago.Concepto}));
    this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
      if (concepto && concepto.Concepto) {
        this.concepto = concepto.Concepto;
        this.impuestosYRetenciones.patchValue({
          conceptoContable: concepto.Concepto
        });
        concepto.Concepto = null;
      }
    });
  }

  get valorNeto() {
    return this.datosTableImpuestosRetenciones.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  get valorTotal() {
    return this.datosTableImpuestosRetenciones.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  get valorDescuento() {
    return this.impuestosYRetenciones.get('baseRetencion').value * this.impuestosYRetenciones.get('porcentajeDescuento').value / 100;
  }

  private validator() {
    this.impuestosYRetenciones.patchValue({
      validator: 'a'
    });
  }
}
