import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { SetInfonuevarelacionComponent } from '../set-infonuevarelacion/set-infonuevarelacion.component';

@Component({
  selector: 'ngx-stepper-relacionautorizacion',
  templateUrl: './stepper-relacionautorizacion.component.html',
  styleUrls: ['./stepper-relacionautorizacion.component.scss']
})
export class StepperRelacionautorizacionComponent {

  @ViewChild(SetInfonuevarelacionComponent, {static: false}) SetInfonuevarelacionComponent: SetInfonuevarelacionComponent;

  constructor( ) {

  }

   get inforelacionGroup() {
     return this.SetInfonuevarelacionComponent ? this.SetInfonuevarelacionComponent.inforelacionGroup : null ;
   }
}
