import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearsolicitudgiroRoutingModule } from './crear-solicitudgiro-routing.module';
import { SetInfosolicitudgiroComponent } from './components/set-infosolicitudgiro/set-infosolicitudgiro.component';
import { LayoutComponent } from '../crear-solicitudgiro/components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDividerModule,
        MatTableModule
  } from '@angular/material';
import { SetCargardocumentosComponent } from './components/set-cargardocumentos/set-cargardocumentos.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LayoutComponent,
    SetInfosolicitudgiroComponent,
    SetCargardocumentosComponent],
  imports: [
    CommonModule,
    CrearsolicitudgiroRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [NgbModalConfig, NgbModal]
})
export class CrearsolicitudgiroModule { }
