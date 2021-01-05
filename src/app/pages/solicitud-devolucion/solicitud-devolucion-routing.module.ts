import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearSolicitudesDevolucionComponent } from './components/crear-solicitudes-devolucion/crear-solicitudes-devolucion.component';
import { TableSolicitudesDevolucionComponent } from './components/table-solicitudes-devolucion/table-solicitudes-devolucion.component';


const routes: Routes = [
  {
    path: 'lista',
    component: TableSolicitudesDevolucionComponent,
  },
  {
    path: 'crear',
    component: CrearSolicitudesDevolucionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudDevolucionRoutingModule { }
