import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SetDatosbeneficiarioComponent} from '../set-datosbeneficiario/set-datosbeneficiario.component';
import {SetDatoscompromisoComponent} from '../set-datoscompromiso/set-datoscompromiso.component';
import {SetImpuntuacionpresupuestalComponent} from '../set-impuntuacionpresupuestal/set-impuntuacionpresupuestal.component';
import {SetMovimientocontableComponent} from '../set-movimientocontable/set-movimientocontable.component';
import {ShowResumenordenpagoComponent} from '../show-resumenordenpago/show-resumenordenpago.component';

@Component({
  selector: 'ngx-crear-ordenpago',
  templateUrl: './crear-ordenpago.component.html',
  styleUrls: ['./crear-ordenpago.component.scss']
})
export class CrearOrdenpagoComponent implements OnInit {
  @ViewChild(SetDatosbeneficiarioComponent, {static: false}) setDatosbeneficiarioComponent: SetDatosbeneficiarioComponent;
  @ViewChild(SetDatoscompromisoComponent, {static: false}) setDatoscompromisoComponent: SetDatoscompromisoComponent;
  @ViewChild(SetImpuntuacionpresupuestalComponent, {static: false}) setImpuntuacionpresupuestalComponent: SetImpuntuacionpresupuestalComponent;
  @ViewChild(SetMovimientocontableComponent, {static: false}) setMovimientocontableComponent: SetMovimientocontableComponent;
  @ViewChild(ShowResumenordenpagoComponent, {static: false}) showResumenordenpagoComponent: ShowResumenordenpagoComponent;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  get datosBeneficiarioGroup() {
    return this.setDatosbeneficiarioComponent ? this.setDatosbeneficiarioComponent.datosBeneficiario : this.fb.group({});
  }

  get datosCompromisoGroup() {
    return this.setDatosbeneficiarioComponent ? this.setDatoscompromisoComponent.datosCompromiso : this.fb.group({});
  }

  get impuntuacionPresupuestalGroup() {
    return this.setDatosbeneficiarioComponent ? this.setImpuntuacionpresupuestalComponent.impuntuacionPresupuestal : this.fb.group({});
  }

  get movimientoContableGroup() {
    return this.setDatosbeneficiarioComponent ? this.setMovimientocontableComponent.movimientoContable : this.fb.group({});
  }

  get resumenGroup() {
    return this.setDatosbeneficiarioComponent ? this.showResumenordenpagoComponent.resumen : this.fb.group({});
  }

}
