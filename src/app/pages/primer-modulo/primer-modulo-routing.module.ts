import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentePruebaComponent } from './components/componente-prueba.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentePruebaComponent,
    children: [
      {
        path: 'prueba',
        loadChildren: () => import('./components/componente-prueba.component')
        .then(m => m.ComponentePruebaComponent),
      },
    ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimerModuloRoutingModule { }
