import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAnulacionesComponent } from './components/layout-anulaciones/layout-anulaciones.component';
import { ListComponent } from './components/list/list.component';
import { CrearAnulacionComponent } from './components/crear-anulacion/crear-anulacion.component';
import { NuevaAnulacionComponent } from './components/nueva-anulacion/nueva-anulacion.component';

const routes: Routes = [{
  path: '',
    component: LayoutAnulacionesComponent,
    children: [
      {
        path: 'lista',
        component: ListComponent,
      },
      {
        path: 'crear',
        component: CrearAnulacionComponent,
      },
      {
        path: 'detalle/:tipo',
        component: NuevaAnulacionComponent,
      },
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'lista',
        pathMatch: 'full',
      },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnulacionesRoutingModule { }
