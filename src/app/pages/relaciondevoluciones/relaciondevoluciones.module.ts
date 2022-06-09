import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelacionDevolucionesRoutingModule } from './relaciondevoluciones-routing.module';
import { TableRelaciondevolucionesComponent } from './components/table-relaciondevoluciones/table-relaciondevoluciones.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromRelacionDevoluciones from './reducers/relaciondevoluciones.reducer';
import { MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatPaginatorModule, MatSelectModule, MatStepperModule, MatTableModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RelacionDevolucionesEffects } from './effects/relaciondevoluciones.effects';
import { SetRelaciondevolucionesComponent } from './components/set-relaciondevoluciones/set-relaciondevoluciones.component';
import { StepperRelacionDevolucionComponent } from './components/stepper-ordenesdevolucion/stepper-relaciondevoluciones.component';
import { ShowResumenRelacionDevolucionesComponent } from './components/show-resumenrelaciondevoluciones/show-resumenrelaciondevoluciones.component';



@NgModule({
  declarations: [
    TableRelaciondevolucionesComponent,
    SetRelaciondevolucionesComponent,
    ShowResumenRelacionDevolucionesComponent,
    StepperRelacionDevolucionComponent
  ],
  imports: [
    CommonModule,
    RelacionDevolucionesRoutingModule,
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
    StoreModule.forFeature(fromRelacionDevoluciones.relaciondevolucionesFeatureKey, fromRelacionDevoluciones.reducer),
    EffectsModule.forFeature([RelacionDevolucionesEffects])
  ]
})
export class RelacionDevolucionesModule { }
