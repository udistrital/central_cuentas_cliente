import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudDevolucionRoutingModule } from './solicitud-devolucion-routing.module';
import { TableSolicitudesDevolucionComponent } from './components/table-solicitudes-devolucion/table-solicitudes-devolucion.component';
import { CrearSolicitudesDevolucionComponent } from './components/crear-solicitudes-devolucion/crear-solicitudes-devolucion.component';
import { SharedModule } from '../../shared/shared.module';
import { SetInfosolicitudComponent } from './components/set-infosolicitud/set-infosolicitud.component';
import { MatStepperModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetInfosolicitanteComponent } from './components/set-infosolicitante/set-infosolicitante.component';
import { SetAnexosimpuestosComponent } from './components/set-anexosimpuestos/set-anexosimpuestos.component';


@NgModule({
  declarations: [TableSolicitudesDevolucionComponent, CrearSolicitudesDevolucionComponent, SetInfosolicitudComponent, SetInfosolicitanteComponent, SetAnexosimpuestosComponent],
  imports: [
    CommonModule,
    SolicitudDevolucionRoutingModule,
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule
  ]
})
export class SolicitudDevolucionModule { }