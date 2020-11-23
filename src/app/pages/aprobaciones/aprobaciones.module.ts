import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionesRoutingModule } from './aprobaciones-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAprobaciones from './reducers/aprobaciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AprobacionesEffects } from './effects/aprobaciones.effects';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    AprobacionesRoutingModule,
    StoreModule.forFeature(fromAprobaciones.aprobacionesFeatureKey, fromAprobaciones.reducer),
    EffectsModule.forFeature([AprobacionesEffects])
  ]
})
export class AprobacionesModule { }
