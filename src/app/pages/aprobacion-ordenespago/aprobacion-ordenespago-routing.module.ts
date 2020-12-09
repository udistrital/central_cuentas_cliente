import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAprobacionordenComponent } from './components/layout-aprobacionorden/layout-aprobacionorden.component';
import { BudgetApprobationComponent } from './components/budget-approbation/budget-approbation.component';
import { AccountantApprobationComponent } from './components/accountant-approbation/accountant-approbation.component';
import { OrderApprobationComponent } from './components/order-approbation/order-approbation.component';
import { DiscountComponent } from './components/discount/discount.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAprobacionordenComponent,
    children: [
      {
        path: 'lista',
        component: OrderApprobationComponent,
      },
      {
        path: 'contable/:id',
        component: AccountantApprobationComponent,
      },
      {
        path: 'presupuestal/:id',
        component: BudgetApprobationComponent,
      },
      {
        path: 'descuento/:id',
        component: DiscountComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionOrdenespagoRoutingModule { }
