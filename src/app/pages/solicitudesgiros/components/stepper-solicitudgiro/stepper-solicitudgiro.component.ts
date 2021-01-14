import { Component, ViewChild } from '@angular/core';
import { SetInfosolicitudgiroComponent } from '../set-infosolicitudgiro/set-infosolicitudgiro.component';
import { SetCargardocumentosComponent } from '../set-cargardocumentos/set-cargardocumentos.component';
import { SetAutorizaciongiroComponent } from '../set-autorizaciongiro/set-autorizaciongiro.component';
import { ShowResumensolicitudgiroComponent } from '../show-resumensolicitudgiro/show-resumensolicitudgiro.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getTiposID } from '../../../../shared/actions/shared.actions';

@Component({
  selector: 'ngx-stepper-solicitudgiro',
  templateUrl: './stepper-solicitudgiro.component.html',
  styleUrls: ['./stepper-solicitudgiro.component.scss']
})
export class StepperSolicitudgiroComponent {

  @ViewChild(SetInfosolicitudgiroComponent, {static: false}) SetInfosolicitudgiroComponent: SetInfosolicitudgiroComponent;
  @ViewChild(SetCargardocumentosComponent, {static: false}) SetCargardocumentosComponent: SetCargardocumentosComponent;
  @ViewChild(SetAutorizaciongiroComponent, {static: false}) SetAutorizaciongiroComponent: SetAutorizaciongiroComponent;
  @ViewChild(ShowResumensolicitudgiroComponent, {static: false}) ShowResumensolicitudgiroComponent: ShowResumensolicitudgiroComponent;

  constructor( private fb: FormBuilder, private store: Store<any> ) {
    this.store.dispatch(getTiposID());

  }

  get infoSolicitudGroup() {
    return this.SetInfosolicitudgiroComponent ? this.SetInfosolicitudgiroComponent.infoSolicitudGroup : this.fb.group([]);
  }
  get documentosGroup() {
    return this.SetCargardocumentosComponent ? this.SetCargardocumentosComponent.documentosGroup : this.fb.group([]);
  }
  get autorizacionGroup() {
    return this.SetAutorizaciongiroComponent ? this.SetAutorizaciongiroComponent.autorizacionGroup : this.fb.group([]);
  }
  get resumenSolicitudGroup() {
    return this.ShowResumensolicitudgiroComponent ? this.ShowResumensolicitudgiroComponent.resumenSolicitudGroup : this.fb.group([]);
  }
}

