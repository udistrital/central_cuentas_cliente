import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListApprobationsComponent } from './components/list-approbations/list-approbations.component';
import { CreateApprobationComponent } from "./components/create-approbation/create-approbation.component";
import { RelationApprobationComponent } from './components/relation-approbation/relation-approbation.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'lista',
        component: ListApprobationsComponent,
      },
      {
        path: 'crear', 
        component: CreateApprobationComponent, canActivate: []
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
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionesRoutingModule { }
