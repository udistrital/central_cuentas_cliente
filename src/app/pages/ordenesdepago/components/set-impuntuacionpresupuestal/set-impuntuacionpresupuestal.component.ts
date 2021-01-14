import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_CONCEPTO_VALOR, DATOS_CONCEPTO_VALOR,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION
} from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { cargarDatosImputacionPresupuestal } from '../../actions/ordenespago.actions';

@Component({
  selector: 'ngx-set-impuntuacionpresupuestal',
  templateUrl: './set-impuntuacionpresupuestal.component.html',
  styleUrls: ['./set-impuntuacionpresupuestal.component.scss']
})

export class SetImpuntuacionpresupuestalComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  @ViewChild('fuentesFinanciamientoModal', { static: false }) fuentesFinanciamientoModal: ElementRef;
  impuntuacionPresupuestal: FormGroup;
  configTableHistorial: any;
  datosTableHistorial: any;
  configTableFuentes: any;
  datosTableFuentes: any;
  configTableImpuntuacion: any;
  datosTableImputacion: any;
  mostrarOcultar: string;
  mostrarOcultarIcono: string;
  subscription: any;

  constructor(private fb: FormBuilder, private store: Store<any>, private modalService: NgbModal) {
    this.configTableHistorial = CONFIGURACION_CONCEPTO_VALOR;
    this.datosTableHistorial = DATOS_CONCEPTO_VALOR;
    this.configTableFuentes = CONFIGURACION_CONCEPTO_VALOR;
    this.datosTableFuentes = DATOS_CONCEPTO_VALOR;
    this.configTableImpuntuacion = CONFIGURACION_IMPUNTUACION;
    this.datosTableImputacion = [];
    this.mostrarOcultar = 'Mostrar';
    this.mostrarOcultarIcono = 'fa-eye';
  }

  ngOnInit() {
    this.impuntuacionPresupuestal = this.fb.group({
      disponibilidad: [''],
      registro: [''],
      valor: [''],
    });
    this.mostrarOcultarHistoria('');
    this.agregar(); // TODO
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion && accion.accion.idStep === 3) {
        if (accion.accion.name === 'modificar') {
          this.modalEliminar(accion.fila);
        } else if (accion.accion.name === 'ver') {
          this.modalService.open(this.fuentesFinanciamientoModal);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosTableImputacion.splice(this.datosTableImputacion.findIndex(
          (element: any) => element.codigo === fila.codigo
            && element.disponibilidad === fila.disponibilidad
            && element.registro === fila.registro
            && element.valor === fila.valor
        ), 1);
      }
    });
  }

  mostrarOcultarHistoria(state: string) {
    if (state === 'false') {
      this.mostrarOcultar = 'Ocultar';
      this.mostrarOcultarIcono = 'fa-eye-slash';
    } else {
      this.mostrarOcultar = 'Mostrar';
      this.mostrarOcultarIcono = 'fa-eye';
    }
  }

  agregar() {
    // TODO
    this.datosTableImputacion.push(DATOS_IMPUNTUACION[0]);
  }

  totalGasto() {
    return this.datosTableImputacion.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  cargarImputacion() {
    this.store.dispatch(cargarDatosImputacionPresupuestal(this.datosTableImputacion));
  }

}
