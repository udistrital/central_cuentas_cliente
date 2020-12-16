import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAnulacionesComponent } from './components/layout-anulaciones/layout-anulaciones.component';
import { ListComponent } from './components/list/list.component';
import { CreateAnulationComponent } from './components/create-anulation/create-anulation.component';
import { OrderAnulationComponent } from './components/order-anulation/order-anulation.component';

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
        component: CreateAnulationComponent,
      },
      {
        path: 'datos',
        component: OrderAnulationComponent,
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
