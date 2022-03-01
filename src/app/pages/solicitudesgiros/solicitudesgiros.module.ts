import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesgirosRoutingModule } from './solicitudesgiros-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromSolicitudesgiros from './reducers/solicitudesgiros.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SolicitudesgirosEffects } from './effects/solicitudesgiros.effects';
import { TableListasolicitudesComponent } from './components/table-listasolicitudes/table-listasolicitudes.component';
import { SetInfosolicitudgiroComponent } from './components/set-infosolicitudgiro/set-infosolicitudgiro.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule, MatIconModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatStepperModule, MatTableModule } from '@angular/material';
import { NgbModalConfig, NgbModal, NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { MatOptionModule } from '@angular/material';
import { SetCargardocumentosComponent } from './components/set-cargardocumentos/set-cargardocumentos.component';
import { SetAutorizaciongiroComponent } from './components/set-autorizaciongiro/set-autorizaciongiro.component';
import { ShowResumensolicitudgiroComponent } from './components/show-resumensolicitudgiro/show-resumensolicitudgiro.component';
import { StepperSolicitudgiroComponent } from './components/stepper-solicitudgiro/stepper-solicitudgiro.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTooltipModule, NbTreeGridModule } from '@nebular/theme';

@NgModule({
  declarations: [
    TableListasolicitudesComponent,
    StepperSolicitudgiroComponent,
    SetInfosolicitudgiroComponent,
    SetCargardocumentosComponent,
    SetAutorizaciongiroComponent,
    ShowResumensolicitudgiroComponent,
  ],
  imports: [
    CommonModule,
    SolicitudesgirosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatStepperModule,
    MatDividerModule,
    NgbModule,
    CurrencyMaskModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatSelectModule,
    ScrollingModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    StoreModule.forFeature(fromSolicitudesgiros.solicitudesgirosFeatureKey, fromSolicitudesgiros.reducer),
    EffectsModule.forFeature([SolicitudesgirosEffects])
  ],

  providers: [
    NgbModalConfig,
    NgbModal,
    { provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }
],
  exports: [
    MatStepperModule,
  ]
})
export class SolicitudesgirosModule { }
