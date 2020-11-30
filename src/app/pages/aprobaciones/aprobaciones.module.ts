import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionesRoutingModule } from './aprobaciones-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAprobaciones from './reducers/aprobaciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AprobacionesEffects } from './effects/aprobaciones.effects';
import { TableComponent } from './components/table/table.component';
import { CreateApprobationComponent } from './components/create-approbation/create-approbation.component';
import { ListApprobationsComponent } from './components/list-approbations/list-approbations.component';
import { RelationApprobationComponent } from './components/relation-approbation/relation-approbation.component';
import { OrderApprobationComponent } from './components/order-approbation/order-approbation.component';
import { SharedModule } from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormComponent } from './components/form/form.component';
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
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    TableComponent, 
    CreateApprobationComponent, 
    ListApprobationsComponent, 
    RelationApprobationComponent, 
    OrderApprobationComponent, 
    FormComponent, LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    AprobacionesRoutingModule,
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
    StoreModule.forFeature(fromAprobaciones.aprobacionesFeatureKey, fromAprobaciones.reducer),
    EffectsModule.forFeature([AprobacionesEffects])
  ]
})
export class AprobacionesModule { }
