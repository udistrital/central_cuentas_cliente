import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION,
} from '../../interfaces/interfaces';
import { getDatosAlmacenadosBeneficiario, getDatosBeneficiario, getDatosCompromiso, getDatosAlmacenadosCompromiso } from '../../selectors/ordenespago.selectors';
import { Store } from '@ngrx/store';
@Component({
  selector: 'ngx-show-resumenordenpago',
  templateUrl: './show-resumenordenpago.component.html',
  styleUrls: ['./show-resumenordenpago.component.scss']
})
export class ShowResumenordenpagoComponent implements OnInit, OnDestroy {
  resumen: FormGroup;
  configTableImpuntuacion: any;
  datosTableImputacion: any;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;

  datosBeneficiario: any;
  datosAlmacenadosBeneficiario: any;
  datosCompromiso: any;
  datosAlmacenadosCompromiso: any;

  subscriptionDatosBeneficiario$: any;
  subscriptionDatosAlmacenadosBeneficiario$: any;
  subscriptionDatosCompromiso$: any;
  subscriptionDatosAlmacenadosCompromiso$: any;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    ) {
    this.configTableImpuntuacion = Object.assign({}, CONFIGURACION_IMPUNTUACION);
    this.configTableMovimientoContable = Object.assign({}, CONFIGURACION_MOVIMIENTO_CONTABLE);
    this.configTableImpuntuacion.rowActions = null;
    this.configTableMovimientoContable.rowActions = null;
    this.datosTableImputacion = DATOS_IMPUNTUACION;
    this.datosTableMovimientoContable = DATOS_MOVIMIENTO_CONTABLE;
  }

  ngOnDestroy () {
    this.subscriptionDatosAlmacenadosBeneficiario$.unsubscribe();
    this.subscriptionDatosBeneficiario$.unsubscribe();
    this.subscriptionDatosAlmacenadosCompromiso$.unsubscribe();
    this.subscriptionDatosCompromiso$.unsubscribe();
  }

  ngOnInit() {
    this.resumen = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.subscriptionDatosBeneficiario$ = this.store.select(getDatosBeneficiario).subscribe(
      data => {
        if (data !== null) {
          this.datosBeneficiario = data;
        }
      }
    );
    this.subscriptionDatosAlmacenadosBeneficiario$ = this.store.select(getDatosAlmacenadosBeneficiario).subscribe(
      data => {
        if (data !== null) {
          this.datosAlmacenadosBeneficiario = data;
        }
      }
    );
    this.subscriptionDatosCompromiso$ = this.store.select(getDatosCompromiso).subscribe(
      data => {
        if (data !== null) {
          this.datosCompromiso = data;
        }
      }
    );
    this.subscriptionDatosAlmacenadosCompromiso$ = this.store.select(getDatosAlmacenadosCompromiso).subscribe(
      data => {
        if (data !== null) {
          this.datosAlmacenadosCompromiso = data;
        }
      }
    );
  }
}
