import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION,
} from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-show-resumenordenpago',
  templateUrl: './show-resumenordenpago.component.html',
  styleUrls: ['./show-resumenordenpago.component.scss']
})
export class ShowResumenordenpagoComponent implements OnInit {
  resumen: FormGroup;
  configTableImpuntuacion: any;
  datosTableImputacion: any;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;

  constructor(private fb: FormBuilder) {
    this.configTableImpuntuacion = Object.assign({}, CONFIGURACION_IMPUNTUACION);
    this.configTableMovimientoContable = Object.assign({}, CONFIGURACION_MOVIMIENTO_CONTABLE);
    this.configTableImpuntuacion.rowActions = null;
    this.configTableMovimientoContable.rowActions = null;
    this.datosTableImputacion = DATOS_IMPUNTUACION;
    this.datosTableMovimientoContable = DATOS_MOVIMIENTO_CONTABLE;
  }

  ngOnInit() {
    this.resumen = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
  }
}
