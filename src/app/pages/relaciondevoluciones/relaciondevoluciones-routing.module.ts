import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperRelacionDevolucionComponent } from './components/stepper-ordenesdevolucion/stepper-relaciondevoluciones.component';
import { TableRelaciondevolucionesComponent } from './components/table-relaciondevoluciones/table-relaciondevoluciones.component';



const routes: Routes = [
  {
    path: 'lista',
    component: TableRelaciondevolucionesComponent,
  },
  {
    path: 'crear',
    component: StepperRelacionDevolucionComponent,
  },
  {
    path: 'editar/:id',
    component: StepperRelacionDevolucionComponent,
  },
  {
    path: 'ver/:id',
    component: StepperRelacionDevolucionComponent,
  },
  {
    path: 'revisar/:id',
    component: StepperRelacionDevolucionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelacionDevolucionesRoutingModule { }
