import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorradoRoutingModule } from './borrado-routing.module';
import { LayoutBorradoComponent } from './components/layout-borrado/layout-borrado.component';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromBorrado from './reducers/borrado.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BorradoEffects } from './effects/borrado.effects';
import { CrearBorradoComponent } from './components/crear-borrado/crear-borrado.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatStepperModule,
  MatInputModule, } from '@angular/material';
import { FormBorradoComponent } from './components/form-borrado/form-borrado.component';

@NgModule({
  declarations: [LayoutBorradoComponent, ListComponent, CrearBorradoComponent, FormBorradoComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatStepperModule,
    MatInputModule,
    BorradoRoutingModule,
    StoreModule.forFeature(fromBorrado.borradoFeatureKey, fromBorrado.reducer),
    EffectsModule.forFeature([BorradoEffects])
  ]
})
export class BorradoModule { }
