import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBorradoComponent } from './components/layout-borrado/layout-borrado.component';
import { ListComponent } from './components/list/list.component';
import { CrearBorradoComponent } from './components/crear-borrado/crear-borrado.component';


const routes: Routes = [{
  path: '',
    component: LayoutBorradoComponent,
    children: [
      {
        path: 'lista',
        component: ListComponent,
      },
      {
        path: 'crear',
        component: CrearBorradoComponent,
      },
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'lista',
        pathMatch: 'full',
      },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorradoRoutingModule { }
