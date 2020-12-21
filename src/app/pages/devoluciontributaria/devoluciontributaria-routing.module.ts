import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableDevoluciontributariaComponent } from './components/table-devoluciontributaria/table-devoluciontributaria.component';


const routes: Routes = [
  {
    path: 'lista',
    component: TableDevoluciontributariaComponent,
  }
  // {
  //   path: 'crear',
  //   component: StepperDevoluciontributariaComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevoluciontributariaRoutingModule { }
