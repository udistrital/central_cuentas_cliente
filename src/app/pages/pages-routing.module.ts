import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'solicitudesgiros',
        loadChildren: () => import('./solicitudesgiros/solicitudesgiros.module')
          .then(m => m.SolicitudesgirosModule),
      },
      {
        path: 'aprobaciones',
        loadChildren: () => import('./aprobaciones/aprobaciones.module')
          .then(m => m.AprobacionesModule)
      },
      {
        path: 'ordenespago',
        loadChildren: () => import('./ordenesdepago/ordenespago.module')
          .then(m => m.OrdenespagoModule)
      },
      {
        path: 'relacionautorizaciones',
        loadChildren: () => import('./relacionautorizaciones/relacionautorizaciones.module')
        .then(m => m.RelacionautorizacionesModule),
      },
      {
        path: 'anulaciones',
        loadChildren: () => import ('./anulaciones/anulaciones.module')
        .then(m => m.AnulacionesModule),
      },
      {
        path: 'devoluciontributaria',
        loadChildren: () => import('./devoluciontributaria/devoluciontributaria.module')
        .then(m => m.DevoluciontributariaModule),
      },
      {
        path: 'ordenesdevolucion',
        loadChildren: () => import('./ordenesdevolucion/ordenesdevolucion.module')
        .then(m => m.OrdenesdevolucionModule),
      },
      {
        path: 'relaciondevoluciones',
        loadChildren: () => import('./relaciondevoluciones/relaciondevoluciones.module')
        .then(m => m.RelacionDevolucionesModule),
      },
      {
        path: 'solicituddevolucion',
        loadChildren: () => import('./solicitud-devolucion/solicitud-devolucion.module')
        .then(m => m.SolicitudDevolucionModule),
      },
      {
        path: 'borrado',
        loadChildren: () => import ('./borrado/borrado.module')
        .then(m => m.BorradoModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
