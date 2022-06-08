import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperOrdenesdevolucionComponent } from './components/stepper-ordenesdevolucion/stepper-ordenesdevolucion.component';
import { TableOrdenesdevolucionComponent } from './components/table-ordenesdevolucion/table-ordenesdevolucion.component';


const routes: Routes = [
  {
    path: 'lista',
    component: TableOrdenesdevolucionComponent,
  },
  {
    path: 'crear',
    component: StepperOrdenesdevolucionComponent,
  },
  {
    path: 'editar/:id',
    component: StepperOrdenesdevolucionComponent,
  },
  {
    path: 'ver/:id',
    component: StepperOrdenesdevolucionComponent,
  },
  {
    path: 'revisar/:id',
    component: StepperOrdenesdevolucionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesDevolucionRoutingModule { }
