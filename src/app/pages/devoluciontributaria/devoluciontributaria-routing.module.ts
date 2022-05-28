import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableDevoluciontributariaComponent } from './components/table-devoluciontributaria/table-devoluciontributaria.component';
import { StepperDevoluciontributariaComponent } from './components/stepper-devoluciontributaria/stepper-devoluciontributaria.component';


const routes: Routes = [
  {
    path: 'lista',
    component: TableDevoluciontributariaComponent,
  },
  {
    path: 'crear',
    component: StepperDevoluciontributariaComponent,
  },
  {
    path: 'editar/:id',
    component: StepperDevoluciontributariaComponent,
  },
  {
    path: 'ver/:id',
    component: StepperDevoluciontributariaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevoluciontributariaRoutingModule { }
