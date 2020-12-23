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
import { FormAnulacionComponent } from './components/form-anulacion/form-anulacion.component';
import { CrearAnulacionComponent } from './components/crear-anulacion/crear-anulacion.component';
import { DetalleActaComponent } from './components/detalle-acta/detalle-acta.component';
import { DetalleInfoPagoComponent } from './components/detalle-info-pago/detalle-info-pago.component';
import { DetalleInfoPresupuestalComponent } from './components/detalle-info-presupuestal/detalle-info-presupuestal.component';
import { DetalleInfoFinancieraComponent } from './components/detalle-info-financiera/detalle-info-financiera.component';
import { NuevaAnulacionComponent } from './components/nueva-anulacion/nueva-anulacion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatTableModule } from '@angular/material';
import { FormOficioComponent } from './components/form-oficio/form-oficio.component';

@NgModule({
  declarations: [LayoutAnulacionesComponent,
    ListComponent,
    CrearAnulacionComponent,
    DetalleActaComponent,
    DetalleInfoPagoComponent,
    DetalleInfoPresupuestalComponent,
    DetalleInfoFinancieraComponent,
    NuevaAnulacionComponent,
    FormAnulacionComponent,
    FormOficioComponent],
  imports: [
    CommonModule,
    AnulacionesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    StoreModule.forFeature(fromAnulaciones.anulacionesFeatureKey, fromAnulaciones.reducer),
    EffectsModule.forFeature([AnulacionesEffects])
  ]
})
export class AnulacionesModule { }
