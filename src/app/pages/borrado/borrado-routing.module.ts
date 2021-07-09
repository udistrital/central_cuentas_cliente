import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBorradoComponent } from './components/layout-borrado/layout-borrado.component';
import { ListComponent } from './components/list/list.component';
import { CrearBorradoComponent } from './components/crear-borrado/crear-borrado.component';
import { DetalleBorradoComponent } from './components/detalle-borrado/detalle-borrado.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';


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
        path: 'detalle/:tipo',
        component: DetalleBorradoComponent,
      },
      {
        path: 'cuentas/:tipo',
        component: CuentasComponent
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
