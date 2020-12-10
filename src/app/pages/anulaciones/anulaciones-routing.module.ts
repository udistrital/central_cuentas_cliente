import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAnulacionesComponent } from './components/layout-anulaciones/layout-anulaciones.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [{
  path: '',
    component: LayoutAnulacionesComponent,
    children: [
      {
        path: 'lista',
        component: ListComponent
      },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnulacionesRoutingModule { }
