import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromDevoluciontributaria from './reducers/devoluciontributaria.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DevoluciontributariaEffects } from './effects/devoluciontributaria.effects';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatStepperModule } from '@angular/material';
import { NgbModalConfig, NgbModal, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DevoluciontributariaRoutingModule } from './devoluciontributaria-routing.module';
// import { StepperDevoluciontributariaComponent } from './components/stepper-devoluciontributaria/';
import { TableDevoluciontributariaComponent } from './components/table-devoluciontributaria/table-devoluciontributaria.component';


@NgModule({
  declarations: [ TableDevoluciontributariaComponent],
  imports: [
    CommonModule,
    DevoluciontributariaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDividerModule,
    NgbModule,
    StoreModule.forFeature(fromDevoluciontributaria.devoluciontributariaFeatureKey, fromDevoluciontributaria.reducer),
    EffectsModule.forFeature([DevoluciontributariaEffects])
  ],
  providers: [
    NgbModule,
    NgbModalConfig
  ]
})
export class DevoluciontributariaModule { }
