import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromDevoluciontributaria from './reducers/devoluciontributaria.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DevoluciontributariaEffects } from './effects/devoluciontributaria.effects';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatStepperModule } from '@angular/material';
import { NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DevoluciontributariaRoutingModule } from './devoluciontributaria-routing.module';
import { StepperDevoluciontributariaComponent } from './components/stepper-devoluciontributaria/stepper-devoluciontributaria.component';
import { TableDevoluciontributariaComponent } from './components/table-devoluciontributaria/table-devoluciontributaria.component';
import { SetInfodevoluciontributariaComponent } from './components/set-infodevoluciontributaria/set-infodevoluciontributaria.component';
import { SetConsultaordenpagoComponent } from './components/set-consultaordenpago/set-consultaordenpago.component';


@NgModule({
  declarations: [ 
    TableDevoluciontributariaComponent,
    StepperDevoluciontributariaComponent, 
    SetInfodevoluciontributariaComponent, 
    SetConsultaordenpagoComponent],
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
