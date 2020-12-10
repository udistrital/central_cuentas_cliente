import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenutiporelacionComponent } from './components/menutiporelacion/menutiporelacion.component';
import { TableRelacionautorizacionComponent } from './components/table-relacionautorizacion/table-relacionautorizacion.component';
import { StepperRelacionautorizacionComponent } from './components/stepper-relacionautorizacion/stepper-relacionautorizacion.component';


const routes: Routes = [
  {
    path: 'elegir',
    component: MenutiporelacionComponent,
  },
  {
    path: 'listar/:id',
    component: TableRelacionautorizacionComponent,
  },
  {
    path: 'crear',
    component: StepperRelacionautorizacionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelacionautorizacionesRoutingModule { }
