import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudDevolucionRoutingModule } from './solicitud-devolucion-routing.module';
import { TableSolicitudesDevolucionComponent } from './components/table-solicitudes-devolucion/table-solicitudes-devolucion.component';
import { CrearSolicitudesDevolucionComponent } from './components/crear-solicitudes-devolucion/crear-solicitudes-devolucion.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [TableSolicitudesDevolucionComponent, CrearSolicitudesDevolucionComponent],
  imports: [
    CommonModule,
    SolicitudDevolucionRoutingModule,
    SharedModule
  ]
})
export class SolicitudDevolucionModule { }
