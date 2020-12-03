import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableAutorizacionnominaComponent } from './components/table-autorizacionnomina/table-autorizacionnomina.component';
// import { StepperAutorizacionnominaComponent } from './components/stepper-autorizacionomina/stepper-autorizacionnomina.component';
import { SetInfoautorizacionnominaComponent } from './components/set-infoautorizacionnomina/set-infoautorizacionnomina.component';


const routes: Routes = [
  {
    path: 'consultar',
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
