import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionOrdenespagoRoutingModule } from './aprobacion-ordenespago-routing.module';
import { LayoutAprobacionordenComponent } from './components/layout-aprobacionorden/layout-aprobacionorden.component';
import { AccountantApprobationComponent } from './components/accountant-approbation/accountant-approbation.component';
import { BudgetApprobationComponent } from './components/budget-approbation/budget-approbation.component';
import { OrderApprobationComponent } from './components/order-approbation/order-approbation.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [LayoutAprobacionordenComponent,
    AccountantApprobationComponent,
    BudgetApprobationComponent,
    SharedModule,
    OrderApprobationComponent],
  imports: [
    CommonModule,
    SharedModule,
    AprobacionOrdenespagoRoutingModule
  ]
})
export class AprobacionOrdenespagoModule { }
