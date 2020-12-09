import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelacionautorizacionesRoutingModule } from './relacionautorizaciones-routing.module';
import { TableAutorizacionnominaComponent } from './components/table-autorizacionnomina/table-autorizacionnomina.component';
import { SetInfoautorizacionnominaComponent } from './components/set-infoautorizacionnomina/set-infoautorizacionnomina.component';
// import { StepperAutorizacionnominaComponent } from './components/stepper-autorizacionomina/stepper-autorizacionnomina.component';
import { StoreModule } from '@ngrx/store';
import * as fromRelacionautorizaciones from './reducers/relacionautorizaciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RelacionautorizacionesEffects } from './effects/relacionautorizaciones.effects';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatStepperModule } from '@angular/material';
import { NgbModalConfig, NgbModal, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TableAutorizacionnominaComponent,
    SetInfoautorizacionnominaComponent,
  //  StepperAutorizacionnominaComponent,
  ],
  imports: [
    CommonModule,
    RelacionautorizacionesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  //  MatStepperModule,
    MatDividerModule,
    NgbModule,
    StoreModule.forFeature(fromRelacionautorizaciones.relacionautorizacionesFeatureKey, fromRelacionautorizaciones.reducer),
    EffectsModule.forFeature([RelacionautorizacionesEffects])
  ],
  providers: [
    NgbModalConfig,
    NgbModal,
],
  exports: [
  //  MatStepperModule,
  ]
})
export class RelacionautorizacionesModule { }
