import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SetContabilizacionComponent } from '../set-contabilizacion/set-contabilizacion.component';
import { SetDatosbeneficiarioComponent } from '../set-datosbeneficiario/set-datosbeneficiario.component';
import { SetDatossolicitanteComponent } from '../set-datossolicitante/set-datossolicitante.component';
import { ShowResumenordendevolucionComponent } from '../show-resumenordendevolucion/show-resumenordendevolucion.component';

@Component({
  selector: 'ngx-stepper-ordenesdevolucion',
  templateUrl: './stepper-ordenesdevolucion.component.html',
  styleUrls: ['./stepper-ordenesdevolucion.component.scss']
})
export class StepperOrdenesdevolucionComponent {
  @ViewChild(SetDatossolicitanteComponent, {static: false}) SetDatossolicitanteComponent: SetDatossolicitanteComponent;
  @ViewChild(SetDatosbeneficiarioComponent, {static: false}) SetDatosbeneficiarioComponent: SetDatosbeneficiarioComponent;
  @ViewChild(SetContabilizacionComponent, {static: false}) SetContabilizacionComponent: SetContabilizacionComponent;

  constructor(
    private fb: FormBuilder
  ) { }

  get datosSolicitanteGroup() {
    return this.SetDatossolicitanteComponent ? this.SetDatossolicitanteComponent.datosSolicitanteGroup : this.fb.group([]) ;
  }
  get datosBeneficiarioGroup() {
    return this.SetDatosbeneficiarioComponent ? this.SetDatosbeneficiarioComponent.datosBeneficiarioGroup : this.fb.group([]) ;
  }
  get contabilizacionGroup() {
    return this.SetContabilizacionComponent ? this.SetContabilizacionComponent.contabilizacionGroup : this.fb.group([]) ;
  }
}
