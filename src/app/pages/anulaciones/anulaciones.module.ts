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
import { FormAnulationComponent } from './components/form-anulation/form-anulation.component';
import { CreateAnulationComponent } from './components/create-anulation/create-anulation.component';
import { DetailStepUnoComponent } from './components/detail-step-uno/detail-step-uno.component';
import { DetailStepDosComponent } from './components/detail-step-dos/detail-step-dos.component';
import { DetailStepTresComponent } from './components/detail-step-tres/detail-step-tres.component';
import { DetailStepCuatroComponent } from './components/detail-step-cuatro/detail-step-cuatro.component';
import { OrderAnulationComponent } from './components/order-anulation/order-anulation.component';
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
import { FormDocumentComponent } from './components/form-document/form-document.component';

@NgModule({
  declarations: [LayoutAnulacionesComponent,
    ListComponent,
    CreateAnulationComponent,
    DetailStepUnoComponent,
    DetailStepDosComponent,
    DetailStepTresComponent,
    DetailStepCuatroComponent,
    OrderAnulationComponent,
    FormAnulationComponent,
    FormDocumentComponent],
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
