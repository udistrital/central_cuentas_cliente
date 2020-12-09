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
      path: 'relacionautorizaciones',
      loadChildren: () => import('./relacionautorizaciones/relacionautorizaciones.module')
      .then(m => m.RelacionautorizacionesModule),
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
