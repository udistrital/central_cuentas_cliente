import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelacionautorizacionesRoutingModule } from './relacionautorizaciones-routing.module';
import {  } from '../relacionautorizaciones/services/relacionautorizaciones.service';
import { TableRelacionautorizacionComponent } from './components/table-relacionautorizacion/table-relacionautorizacion.component';
import { SetInfonuevarelacionComponent } from './components/set-infonuevarelacion/set-infonuevarelacion.component';
import { StoreModule } from '@ngrx/store';
import * as fromRelacionautorizaciones from './reducers/relacionautorizaciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RelacionautorizacionesEffects } from './effects/relacionautorizaciones.effects';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatStepperModule, } from '@angular/material';
import { NgbModalConfig, NgbModal, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MenutiporelacionComponent } from './components/menutiporelacion/menutiporelacion.component';
import { RelacionautorizacionesService } from './services/relacionautorizaciones.service';
import { SetConsultanuevarelacionComponent } from './components/set-consultanuevarelacion/set-consultanuevarelacion.component';
import { SetConceptonuevarelacionComponent } from './components/set-conceptonuevarelacion/set-conceptonuevarelacion.component';
import { StepperRelacionautorizacionComponent } from './components/stepper-relacionautorizacion/stepper-relacionautorizacion.component';
import { SetPdfviewComponent } from './components/set-pdfview/set-pdfview.component';
import { SetExtractodesagregacionComponent } from './components/set-extractodesagregacion/set-extractodesagregacion.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ScrollDispatchModule, ScrollingModule } from '@angular/cdk/scrolling';
import { SetMovimientocontableComponent } from './components/set-movimientocontable/set-movimientocontable.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MenutiporelacionComponent,
    TableRelacionautorizacionComponent,
    StepperRelacionautorizacionComponent,
    SetInfonuevarelacionComponent,
    SetConsultanuevarelacionComponent,
    SetConceptonuevarelacionComponent,
    SetMovimientocontableComponent,
    SetPdfviewComponent,
    SetExtractodesagregacionComponent,
  ],
  imports: [
    CommonModule,
    RelacionautorizacionesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    ScrollingModule,
    MatDividerModule,
    MatStepperModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
    MatOptionModule,
    NgbModule,
    NgbDatepickerModule,
    PdfViewerModule,
    StoreModule.forFeature(fromRelacionautorizaciones.relacionautorizacionesFeatureKey, fromRelacionautorizaciones.reducer),
    EffectsModule.forFeature([RelacionautorizacionesEffects])
  ],
  providers: [
    NgbModalConfig,
    NgbModal,
    RelacionautorizacionesService
],
})
export class RelacionautorizacionesModule { }
