import { Component, ViewChild } from '@angular/core';
import { SetInfonuevarelacionComponent } from '../set-infonuevarelacion/set-infonuevarelacion.component';
import { SetConceptonuevarelacionComponent } from '../set-conceptonuevarelacion/set-conceptonuevarelacion.component';
import { SetConsultanuevarelacionComponent } from '../set-consultanuevarelacion/set-consultanuevarelacion.component';

@Component({
  selector: 'ngx-stepper-relacionautorizacion',
  templateUrl: './stepper-relacionautorizacion.component.html',
  styleUrls: ['./stepper-relacionautorizacion.component.scss']
})
export class StepperRelacionautorizacionComponent {

   @ViewChild(SetInfonuevarelacionComponent, {static: false}) SetInfoautorizacionnominaComponent: SetInfonuevarelacionComponent;
   @ViewChild(SetConsultanuevarelacionComponent, {static: false}) SetConsultanuevarelacionComponent: SetConsultanuevarelacionComponent;
   @ViewChild(SetConceptonuevarelacionComponent, {static: false}) SetConceptonuevarelacionComponent: SetConceptonuevarelacionComponent;

  constructor( ) {

  }

   get inforelacionGroup() {
     return this.SetInfoautorizacionnominaComponent ? this.SetInfoautorizacionnominaComponent.inforelacionGroup : null ;
   }
   get conceptoGroup() {
     return this.SetConceptonuevarelacionComponent ? this.SetConceptonuevarelacionComponent.conceptoGroup : null;
   }
   get consultaGroup() {
     return this.SetConsultanuevarelacionComponent ? this.SetConsultanuevarelacionComponent.consultaGroup : null;
   }
  // get resumenSolicitudGroup() {
  //   return this.ShowResumensolicitudgiroComponent ? this.ShowResumensolicitudgiroComponent.resumenSolicitudGroup : null;
  // }
}

