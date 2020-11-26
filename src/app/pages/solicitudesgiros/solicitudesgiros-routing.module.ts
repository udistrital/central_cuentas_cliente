import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperSolicitudgiroComponent } from './components/stepper-solicitudgiro/stepper-solicitudgiro.component';
import { TableListasolicitudesComponent } from './components/table-listasolicitudes/table-listasolicitudes.component';

const routes: Routes = [
  {
    path: 'consultarsolicitudgiro',
    component: TableListasolicitudesComponent,
  },
  {
    path: 'crearsolicitudgiro',
    component: StepperSolicitudgiroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesgirosRoutingModule { }
