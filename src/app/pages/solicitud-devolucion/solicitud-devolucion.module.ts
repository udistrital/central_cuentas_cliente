import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudDevolucionRoutingModule } from './solicitud-devolucion-routing.module';
import { TableSolicitudesDevolucionComponent } from './components/table-solicitudes-devolucion/table-solicitudes-devolucion.component';
import { CrearSolicitudesDevolucionComponent } from './components/crear-solicitudes-devolucion/crear-solicitudes-devolucion.component';
import { SharedModule } from '../../shared/shared.module';
import { SetInfosolicitudComponent } from './components/set-infosolicitud/set-infosolicitud.component';
import { MatStepperModule, MatTabsModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SetInfosolicitanteComponent } from './components/set-infosolicitante/set-infosolicitante.component';
import { SetAnexosimpuestosComponent } from './components/set-anexosimpuestos/set-anexosimpuestos.component';
import { StoreModule } from '@ngrx/store';
import * as fromSolicitudDevolucion from './reducers/solicitud-devolucion.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SolicitudDevolucionEffects } from './effects/solicitud-devolucion.effects';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ShowResumenComponent } from './components/show-resumen/show-resumen.component';


@NgModule({
  declarations: [
    TableSolicitudesDevolucionComponent,
    CrearSolicitudesDevolucionComponent,
    SetInfosolicitudComponent,
    SetInfosolicitanteComponent,
    SetAnexosimpuestosComponent,
    ShowResumenComponent
  ],
  imports: [
    CommonModule,
    SolicitudDevolucionRoutingModule,
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    StoreModule.forFeature(fromSolicitudDevolucion.solicitudDevolucionFeatureKey, fromSolicitudDevolucion.reducer),
    EffectsModule.forFeature([SolicitudDevolucionEffects]),
    CurrencyMaskModule,
    MatSelectModule,
    ScrollingModule
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }]
})
export class SolicitudDevolucionModule { }
