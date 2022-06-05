import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperOrdenesdevolucionComponent } from './components/stepper-ordenesdevolucion/stepper-ordenesdevolucion.component';
import { TableOrdenesdevolucionComponent } from './components/table-ordenesdevolucion/table-ordenesdevolucion.component';
import { SetDatossolicitanteComponent } from './components/set-datossolicitante/set-datossolicitante.component';
import { SetDatosbeneficiarioComponent } from './components/set-datosbeneficiario/set-datosbeneficiario.component';
import { SetContabilizacionComponent } from './components/set-contabilizacion/set-contabilizacion.component';
import { ShowResumenordendevolucionComponent } from './components/show-resumenordendevolucion/show-resumenordendevolucion.component';
import { OrdenesDevolucionRoutingModule } from './ordenesdevolucion-routing.module';
import * as fromOrdenesDevolucion from './reducers/ordenesdevolucion.reducer';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatPaginatorModule, MatSelectModule, MatStepperModule, MatTableModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdenesDevolucionEffects } from './effects/ordenesdevolucion.effects';



@NgModule({
  declarations: [
    StepperOrdenesdevolucionComponent,
    TableOrdenesdevolucionComponent,
    SetDatossolicitanteComponent,
    SetDatosbeneficiarioComponent,
    SetContabilizacionComponent,
    ShowResumenordendevolucionComponent],
  imports: [
    CommonModule,
    OrdenesDevolucionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDividerModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    ScrollingModule,
    CurrencyMaskModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    StoreModule.forFeature(fromOrdenesDevolucion.ordenesdevolucionFeatureKey, fromOrdenesDevolucion.reducer),
    EffectsModule.forFeature([OrdenesDevolucionEffects])
  ]
})
export class OrdenesdevolucionModule { }
