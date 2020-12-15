import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnulacionesRoutingModule } from './anulaciones-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAnulaciones from './reducers/anulaciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AnulacionesEffects } from './effects/anulaciones.effects';
import { LayoutAnulacionesComponent } from './components/layout-anulaciones/layout-anulaciones.component';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateAnulationComponent } from './components/create-anulation/create-anulation.component';
import { DetailStepUnoComponent } from './components/detail-step-uno/detail-step-uno.component';
import { DetailStepDosComponent } from './components/detail-step-dos/detail-step-dos.component';
import { DetailStepTresComponent } from './components/detail-step-tres/detail-step-tres.component';
import { DetailStepCuatroComponent } from './components/detail-step-cuatro/detail-step-cuatro.component';
import { FormComponent } from './components/form/form.component';
import { OrderAnulationComponent } from './components/order-anulation/order-anulation.component';


@NgModule({
  declarations: [LayoutAnulacionesComponent, ListComponent, CreateAnulationComponent, DetailStepUnoComponent, DetailStepDosComponent, DetailStepTresComponent, DetailStepCuatroComponent, FormComponent, OrderAnulationComponent],
  imports: [
    CommonModule,
    AnulacionesRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromAnulaciones.anulacionesFeatureKey, fromAnulaciones.reducer),
    EffectsModule.forFeature([AnulacionesEffects])
  ]
})
export class AnulacionesModule { }
