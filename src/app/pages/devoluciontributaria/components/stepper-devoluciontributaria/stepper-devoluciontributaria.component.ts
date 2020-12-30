import { Component, ViewChild } from '@angular/core';
import { SetInfodevoluciontributariaComponent } from '../set-infodevoluciontributaria/set-infodevoluciontributaria.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-stepper-devoluciontributaria',
  templateUrl: './stepper-devoluciontributaria.component.html',
  styleUrls: ['./stepper-devoluciontributaria.component.scss']
})
export class StepperDevoluciontributariaComponent {

  @ViewChild(SetInfodevoluciontributariaComponent, {static: false}) SetInfodevoluciontributariaComponent: SetInfodevoluciontributariaComponent;

  constructor( private fb: FormBuilder) {

  }

  get infoDevolucionGroup() {
    return this.SetInfodevoluciontributariaComponent ? this.SetInfodevoluciontributariaComponent.infoDevolucionGroup : this.fb.group([]) ;
  }
}
