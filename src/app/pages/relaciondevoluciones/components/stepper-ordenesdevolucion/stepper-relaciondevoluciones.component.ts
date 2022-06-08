import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SetRelaciondevolucionesComponent } from '../set-relaciondevoluciones/set-relaciondevoluciones.component';

@Component({
  selector: 'ngx-stepper-relaciondevoluciones',
  templateUrl: './stepper-relaciondevoluciones.component.html',
  styleUrls: ['./stepper-relaciondevoluciones.component.scss']
})
export class StepperRelacionDevolucionComponent {
  @ViewChild(SetRelaciondevolucionesComponent, {static: false}) SetRelaciondevolucionesComponent: SetRelaciondevolucionesComponent;

  constructor(
    private fb: FormBuilder
  ) { }

  get relacionDevolucionesGroup() {
    return this.SetRelaciondevolucionesComponent ? this.SetRelaciondevolucionesComponent.relacionDevolucionesGroup : this.fb.group([]) ;
  }
}
