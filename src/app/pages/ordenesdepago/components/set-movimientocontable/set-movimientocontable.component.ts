import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE
} from '../../interfaces/interfaces';
import { ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada, getConceptosContables } from '../../../../shared/selectors/shared.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetConceptosContables, LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';

@Component({
  selector: 'ngx-set-movimientocontable',
  templateUrl: './set-movimientocontable.component.html',
  styleUrls: ['./set-movimientocontable.component.scss']
})
export class SetMovimientocontableComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  movimientoContable: FormGroup;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;
  conceptosContables: any;
  subscription: any;
  subscriptionConceptos: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private store: Store<any>) {
    this.configTableMovimientoContable = CONFIGURACION_MOVIMIENTO_CONTABLE;
    this.datosTableMovimientoContable = [];
    this.store.dispatch(GetConceptosContables({ id: '' }));
  }

  ngOnInit() {
    // Form
    this.movimientoContable = this.fb.group({
      baseRetencion: ['1500000'],
      porcentajeDescuento: ['20'],
    });
    // Conceptos contables
    this.subscriptionConceptos = this.store.select(getConceptosContables).subscribe((conceptos) => {
      this.conceptosContables = conceptos[0];
    });
    this.agregar(); // TODO: Eliminar
    // Fila seleccionada
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (accion.accion.idStep === 4 && accion.accion.name === 'modificar') {
          this.modalEliminar(accion.fila);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionConceptos.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosTableMovimientoContable.splice(this.datosTableMovimientoContable.findIndex(
          (element: any) => element.codigo === fila.codigo
            && element.descuento === fila.descuento
            && element.base === fila.base
            && element.valor === fila.valor
        ), 1);
      }
    });
  }

  agregar() {
    // TODO
    const elemento = Object.assign({}, DATOS_MOVIMIENTO_CONTABLE[0]);
    elemento.descuento = this.movimientoContable.get('porcentajeDescuento').value / 100;
    elemento.base = this.movimientoContable.get('baseRetencion').value;
    elemento.valor = this.valorDescuento;
    this.datosTableMovimientoContable.push(elemento);
  }

  get valorNeto() {
    return this.datosTableMovimientoContable.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  get valorTotal() {
    return this.datosTableMovimientoContable.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  get valorDescuento() {
    return this.movimientoContable.get('baseRetencion').value * this.movimientoContable.get('porcentajeDescuento').value / 100;
  }
}
