import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperSolicitudgiroComponent } from './components/stepper-solicitudgiro/stepper-solicitudgiro.component';
import { TableListasolicitudesComponent } from './components/table-listasolicitudes/table-listasolicitudes.component';

const routes: Routes = [
  {
    path: 'lista',
    component: TableListasolicitudesComponent,
  },
  {
    path: 'crear',
    component: StepperSolicitudgiroComponent,
  },
  {
    path: 'editar/:Id',
    component: StepperSolicitudgiroComponent,
  },
  {
    path: 'ver/:Id',
    component: StepperSolicitudgiroComponent,
  },
  {
    path: 'revisar/:Id',
    component: StepperSolicitudgiroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesgirosRoutingModule { }
