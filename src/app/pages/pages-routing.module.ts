import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    {
      path: 'consultasolicitudesgiros',
      loadChildren: () => import('./consultas-solicitudesgiros/solicitudesgiros.module')
      .then(m => m.SolicitudesgirosModule),
    },
    {
      path: 'anulaciones',
      loadChildren: () => import ('./anulaciones/anulaciones.module')
      .then(m => m.AnulacionesModule),
    },
    {
      path: 'prueba',
      loadChildren: () => import('./primer-modulo/primer-modulo.module')
      .then(m => m.PrimerModuloModule),
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
