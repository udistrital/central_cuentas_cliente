import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnulacionesRoutingModule } from './anulaciones-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAnulaciones from './reducers/anulaciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AnulacionesEffects } from './effects/anulaciones.effects';
import { LayoutAnulacionesComponent } from './components/layout-anulaciones/layout-anulaciones.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [LayoutAnulacionesComponent, ListComponent],
  imports: [
    CommonModule,
    AnulacionesRoutingModule,
    StoreModule.forFeature(fromAnulaciones.anulacionesFeatureKey, fromAnulaciones.reducer),
    EffectsModule.forFeature([AnulacionesEffects])
  ]
})
export class AnulacionesModule { }
