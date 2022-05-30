import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromDevoluciontributaria from './reducers/devoluciontributaria.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DevoluciontributariaEffects } from './effects/devoluciontributaria.effects';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatIconModule, MatPaginatorModule, MatSelectModule, MatStepperModule, MatTableModule, MAT_DATE_LOCALE } from '@angular/material';
import { NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DevoluciontributariaRoutingModule } from './devoluciontributaria-routing.module';
import { StepperDevoluciontributariaComponent } from './components/stepper-devoluciontributaria/stepper-devoluciontributaria.component';
import { TableDevoluciontributariaComponent } from './components/table-devoluciontributaria/table-devoluciontributaria.component';
import { SetInfodevoluciontributariaComponent } from './components/set-infodevoluciontributaria/set-infodevoluciontributaria.component';
import { SetConsultaordenpagoComponent } from './components/set-consultaordenpago/set-consultaordenpago.component';
import { SetContabilizacionComponent } from './components/set-contabilizacion/set-contabilizacion.component';
import { ShowResumenDevolucionTributariaComponent } from './components/show-resumendevolucion/show-resumendevoluciontributaria.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { format_date } from '../../shared/interfaces/interfaces';


@NgModule({
  declarations: [
    TableDevoluciontributariaComponent,
    StepperDevoluciontributariaComponent,
    SetInfodevoluciontributariaComponent,
    SetConsultaordenpagoComponent,
    SetContabilizacionComponent,
    ShowResumenDevolucionTributariaComponent],
  imports: [
    CommonModule,
    DevoluciontributariaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDividerModule,
    NgbModule,
    StoreModule.forFeature(fromDevoluciontributaria.devoluciontributariaFeatureKey, fromDevoluciontributaria.reducer),
    EffectsModule.forFeature([DevoluciontributariaEffects]),
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    ScrollingModule,
    CurrencyMaskModule
  ],
  providers: [
    NgbModule,
    NgbModalConfig,
    {provide: MAT_DATE_LOCALE, useValue: format_date},
  ]
})
export class DevoluciontributariaModule { }
