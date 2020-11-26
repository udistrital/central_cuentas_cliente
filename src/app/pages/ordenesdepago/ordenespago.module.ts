import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenespagoRoutingModule } from './ordenespago-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { StoreModule } from '@ngrx/store';
import * as fromOrdenespago from './reducers/ordenespago.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrdenespagoEffects } from './effects/ordenespago.effects';
import { TableListaordenesComponent } from './components/table-listaordenes/table-listaordenes.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearOrdenpagoComponent } from './components/crear-ordenpago/crear-ordenpago.component';


@NgModule({
  declarations: [LayoutComponent, TableListaordenesComponent, CrearOrdenpagoComponent],
  imports: [
    CommonModule,
    OrdenespagoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromOrdenespago.ordenespagoFeatureKey, fromOrdenespago.reducer),
    EffectsModule.forFeature([OrdenespagoEffects])
  ]
})
export class OrdenespagoModule { }
