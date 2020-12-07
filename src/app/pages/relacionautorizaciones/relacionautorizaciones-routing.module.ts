import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenutemporalComponent } from './components/menutemporal/menutemporal.component';
import { TableAutorizacionnominaComponent } from './components/table-autorizacionnomina/table-autorizacionnomina.component';
import { SetInfoautorizacionnominaComponent } from './components/set-infoautorizacionnomina/set-infoautorizacionnomina.component';


const routes: Routes = [
  {
    path: 'elegir',
    component: MenutemporalComponent,
  },
  {
    path: 'consultar/:id',
    component: TableAutorizacionnominaComponent,
  },
  {
    path: 'crear',
    component: SetInfoautorizacionnominaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelacionautorizacionesRoutingModule { }
