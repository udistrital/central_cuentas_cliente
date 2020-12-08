import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableListaordenesComponent } from './components/table-listaordenes/table-listaordenes.component';
import { CrearOrdenpagoComponent } from './components/crear-ordenpago/crear-ordenpago.component';

const routes: Routes = [
  {
    path: 'lista',
    component: TableListaordenesComponent,
  },
  {
    path: 'crear',
    component: CrearOrdenpagoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenespagoRoutingModule { }
