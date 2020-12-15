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


@NgModule({
  declarations: [LayoutAnulacionesComponent, ListComponent, CreateAnulationComponent],
  imports: [
    CommonModule,
    AnulacionesRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromAnulaciones.anulacionesFeatureKey, fromAnulaciones.reducer),
    EffectsModule.forFeature([AnulacionesEffects])
  ]
})
export class AnulacionesModule { }
