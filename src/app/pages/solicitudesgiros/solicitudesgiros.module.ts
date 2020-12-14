import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesgirosRoutingModule } from './solicitudesgiros-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromSolicitudesgiros from './reducers/solicitudesgiros.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SolicitudesgirosEffects } from './effects/solicitudesgiros.effects';
import { TableListasolicitudesComponent } from './components/table-listasolicitudes/table-listasolicitudes.component';
import { SetInfosolicitudgiroComponent } from './components/set-infosolicitudgiro/set-infosolicitudgiro.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatStepperModule } from '@angular/material';
import { NgbModalConfig, NgbModal, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SetCargardocumentosComponent } from './components/set-cargardocumentos/set-cargardocumentos.component';
import { SetAutorizaciongiroComponent } from './components/set-autorizaciongiro/set-autorizaciongiro.component';
import { ShowResumensolicitudgiroComponent } from './components/show-resumensolicitudgiro/show-resumensolicitudgiro.component';
import { StepperSolicitudgiroComponent } from './components/stepper-solicitudgiro/stepper-solicitudgiro.component';

@NgModule({
  declarations: [
    TableListasolicitudesComponent,
    StepperSolicitudgiroComponent,
    SetInfosolicitudgiroComponent,
    SetCargardocumentosComponent,
    SetAutorizaciongiroComponent,
    ShowResumensolicitudgiroComponent,
  ],
  imports: [
    CommonModule,
    SolicitudesgirosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDividerModule,
    NgbModule,
    StoreModule.forFeature(fromSolicitudesgiros.solicitudesgirosFeatureKey, fromSolicitudesgiros.reducer),
    EffectsModule.forFeature([SolicitudesgirosEffects])
  ],
  providers: [
    NgbModalConfig,
    NgbModal,
],
  exports: [
    MatStepperModule,
  ]
})
export class SolicitudesgirosModule { }
