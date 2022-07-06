import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableListaordenesComponent } from './components/table-listaordenes/table-listaordenes.component';
import { CrearOrdenpagoComponent } from './components/crear-ordenpago/crear-ordenpago.component';
import { SetContabilizacionordenpagoComponent } from './components/set-contabilizacionordenpago/set-contabilizacionordenpago.component';

const routes: Routes = [
  {
    path: 'lista',
    component: TableListaordenesComponent,
  },
  {
    path: 'crear',
    component: CrearOrdenpagoComponent,
  },
  {
    path: 'ver/:Id',
    component: CrearOrdenpagoComponent,
  },
  {
    path: 'editar/:Id',
    component: CrearOrdenpagoComponent,
  },
  {
    path: 'revisar/:Id',
    component: CrearOrdenpagoComponent,
  },
  {
    path: 'contabilizar/:Id',
    component: SetContabilizacionordenpagoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenespagoRoutingModule { }
