import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_CONCEPTO_VALOR, DATOS_CONCEPTO_VALOR,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION
} from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CONFIGURACION_DOCUMENTOS } from '../../../solicitudesgiros/interfaces/interfaces';

@Component({
  selector: 'ngx-set-impuntuacionpresupuestal',
  templateUrl: './set-impuntuacionpresupuestal.component.html',
  styleUrls: ['./set-impuntuacionpresupuestal.component.scss']
})

export class SetImpuntuacionpresupuestalComponent implements OnInit {
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
  totalGasto: number;
  subscription: any;

  constructor(private fb: FormBuilder, private store: Store<any>, private modalService: NgbModal) {
    this.configTableHistorial = CONFIGURACION_CONCEPTO_VALOR;
    this.datosTableHistorial = DATOS_CONCEPTO_VALOR;
    this.configTableFuentes = CONFIGURACION_CONCEPTO_VALOR;
    this.datosTableFuentes = DATOS_CONCEPTO_VALOR;
    this.configTableImpuntuacion = CONFIGURACION_IMPUNTUACION;
    this.datosTableImputacion = [];
    this.mostrarOcultar = "Mostrar";
    this.mostrarOcultarIcono = "fa-eye";
    this.totalGasto = 0.00;
  }

  ngOnInit() {
    this.impuntuacionPresupuestal = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.mostrarOcultarHistoria("");
    this.agregar();//TODO
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion) {
        if (accion.accion.name == "modificar") {
          this.modalEliminar(accion.fila);
        } else if (accion.accion.name == "ver") {
          this.modalService.open(this.fuentesFinanciamientoModal);
        }
      }
    });
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
    if (state == "false") {
      this.mostrarOcultar = "Ocultar";
      this.mostrarOcultarIcono = "fa-eye-slash";
    } else {
      this.mostrarOcultar = "Mostrar";
      this.mostrarOcultarIcono = "fa-eye";
    }
  }

  agregar() {
    //TODO
    this.datosTableImputacion.push(DATOS_IMPUNTUACION[0]);
    //Valor total
    this.totalGasto = this.datosTableImputacion.reduce((a, b) => a + b.valor, 0);
  }

}
