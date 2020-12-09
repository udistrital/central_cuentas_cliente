import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenutiporelacionComponent } from './components/menutiporelacion/menutiporelacion.component';
import { TableAutorizacionnominaComponent } from './components/table-autorizacionnomina/table-autorizacionnomina.component';
import { SetInfoautorizacionnominaComponent } from './components/set-infoautorizacionnomina/set-infoautorizacionnomina.component';


const routes: Routes = [
  {
    path: 'elegir',
    component: MenutiporelacionComponent,
  },
  {
    path: 'lista/:id',
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
