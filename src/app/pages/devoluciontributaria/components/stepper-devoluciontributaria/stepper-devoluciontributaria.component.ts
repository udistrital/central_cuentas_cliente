import { Component, ViewChild } from '@angular/core';
import { SetInfodevoluciontributariaComponent } from '../set-infodevoluciontributaria/set-infodevoluciontributaria.component';
import { FormBuilder } from '@angular/forms';
import { SetContabilizacionComponent } from '../set-contabilizacion/set-contabilizacion.component';
import { ShowComprobantepagoComponent } from '../show-comprobantepago/show-comprobantepago.component';

@Component({
  selector: 'ngx-stepper-devoluciontributaria',
  templateUrl: './stepper-devoluciontributaria.component.html',
  styleUrls: ['./stepper-devoluciontributaria.component.scss']
})
export class StepperDevoluciontributariaComponent {

  @ViewChild(SetInfodevoluciontributariaComponent, {static: false}) SetInfodevoluciontributariaComponent: SetInfodevoluciontributariaComponent;
  @ViewChild(SetContabilizacionComponent, {static: false}) SetContabilizacionComponent: SetContabilizacionComponent;
  @ViewChild(ShowComprobantepagoComponent, {static: false}) ShowComprobantepagoComponent: ShowComprobantepagoComponent;

  constructor( private fb: FormBuilder) {

  }
  get infoDevolucionGroup() {
    return this.SetInfodevoluciontributariaComponent ? this.SetInfodevoluciontributariaComponent.infoDevolucionGroup : this.fb.group([]) ;
  }
  get contabilizacionGroup() {
    return this.SetContabilizacionComponent ? this.SetContabilizacionComponent.contabilizacionGroup : this.fb.group([]) ;
  }
  get comprobantepagoGroup() {
    return this.ShowComprobantepagoComponent ? this.ShowComprobantepagoComponent.comprobantepagoGroup : this.fb.group([]) ;
  }
}
