import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenespagoRoutingModule } from './ordenespago-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromOrdenespago from './reducers/ordenespago.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrdenespagoEffects } from './effects/ordenespago.effects';
import { TableListaordenesComponent } from './components/table-listaordenes/table-listaordenes.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearOrdenpagoComponent } from './components/crear-ordenpago/crear-ordenpago.component';
import { MatStepperModule } from '@angular/material';
import { SetDatosbeneficiarioComponent } from './components/set-datosbeneficiario/set-datosbeneficiario.component';
import { SetDatoscompromisoComponent } from './components/set-datoscompromiso/set-datoscompromiso.component';
import { SetImpuntuacionpresupuestalComponent } from './components/set-impuntuacionpresupuestal/set-impuntuacionpresupuestal.component';
import { SetMovimientocontableComponent } from './components/set-movimientocontable/set-movimientocontable.component';
import { ShowResumenordenpagoComponent } from './components/show-resumenordenpago/show-resumenordenpago.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TableListaordenesComponent, CrearOrdenpagoComponent,
    SetDatosbeneficiarioComponent, SetDatoscompromisoComponent,
    SetImpuntuacionpresupuestalComponent, SetMovimientocontableComponent,
    ShowResumenordenpagoComponent],
  imports: [
    NgbModule,
    CurrencyMaskModule,
    CommonModule,
    OrdenespagoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    StoreModule.forFeature(fromOrdenespago.ordenespagoFeatureKey, fromOrdenespago.reducer),
    EffectsModule.forFeature([OrdenespagoEffects])
  ]
})
export class OrdenespagoModule { }
