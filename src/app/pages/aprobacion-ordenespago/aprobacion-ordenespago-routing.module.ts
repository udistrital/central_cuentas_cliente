import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAprobacionordenComponent } from './components/layout-aprobacionorden/layout-aprobacionorden.component';
import { BudgetApprobationComponent } from './components/budget-approbation/budget-approbation.component';
import { AccountantApprobationComponent } from './components/accountant-approbation/accountant-approbation.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutAprobacionordenComponent,
    children: [
      {
        path: 'contable',
        component: AccountantApprobationComponent,
      },
      {
        path: 'presupuestal',
        component: BudgetApprobationComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionOrdenespagoRoutingModule { }
