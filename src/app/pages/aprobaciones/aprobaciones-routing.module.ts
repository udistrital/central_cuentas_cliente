import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListApprobationsComponent} from './components/list-approbations/list-approbations.component'
import { CreateApprobationComponent } from "./components/create-approbation/create-approbation.component";
import { RelationApprobationComponent } from './components/relation-approbation/relation-approbation.component';


const routes: Routes = [
  {
    path: '',
    component: ListApprobationsComponent,
    children: [
      {
        path: 'aprobaciones',
        loadChildren: () => import ('./components/list-approbations/list-approbations.component')
        .then(m => m.ListApprobationsComponent),
      }
    ],
  },
  {
    path: 'crear',
    component: CreateApprobationComponent, canActivate: []
  },
  {
    path: 'rAuto',
    component: RelationApprobationComponent, canActivate: [ ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionesRoutingModule { }
