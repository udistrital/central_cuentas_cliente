import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION,
} from '../../interfaces/interfaces';
import { getDatosAlmacenadosBeneficiario, getDatosBeneficiario, getDatosCompromiso, getDatosAlmacenadosCompromiso, getDatosImputacionPresupuestal, getDatosMovimientoContable } from '../../selectors/ordenespago.selectors';
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
  subscriptionDatosImputacion$: any;
  subscriptionDatosMovimiento$: any;
  descuento: any;
  gasto: any;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    ) {
    this.configTableImpuntuacion = Object.assign({}, CONFIGURACION_IMPUNTUACION);
    this.configTableMovimientoContable = Object.assign({}, CONFIGURACION_MOVIMIENTO_CONTABLE);
    this.configTableImpuntuacion.rowActions = null;
    this.configTableMovimientoContable.rowActions = null;
    this.datosTableImputacion = [];
    this.datosTableMovimientoContable = [];
  }

  ngOnDestroy () {
    this.subscriptionDatosAlmacenadosBeneficiario$.unsubscribe();
    this.subscriptionDatosBeneficiario$.unsubscribe();
    this.subscriptionDatosAlmacenadosCompromiso$.unsubscribe();
    this.subscriptionDatosCompromiso$.unsubscribe();
    this.subscriptionDatosImputacion$.unsubscribe();
    this.subscriptionDatosMovimiento$.unsubscribe();
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
    this.subscriptionDatosImputacion$ = this.store.select(getDatosImputacionPresupuestal).subscribe(
      data => {
        if (data !== null) {
          let i = 0;
          while (data[i] !== undefined) {
            this.datosTableImputacion.push(data[i]);
            i++;
          }
        }
      }
    );
    this.subscriptionDatosMovimiento$ = this.store.select(getDatosMovimientoContable).subscribe(
      data => {
        if (data !== null) {
          let i = 0;
          while (data[i] !== undefined) {
            this.datosTableMovimientoContable.push(data[i]);
            i++;
          }
        }
      }
    );
  }

  totalGasto() {
    return this.gasto = this.datosTableImputacion.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  totalDescuento() {
    return this.descuento =  this.datosTableMovimientoContable.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  totalNeto() {
    return this.gasto - this.descuento;
  }

  get vigenciaSeleccionada() {
    return this.datosCompromiso.get('vigencia').value;
  }
}
