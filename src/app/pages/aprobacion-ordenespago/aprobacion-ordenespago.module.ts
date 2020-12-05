import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionOrdenespagoRoutingModule } from './aprobacion-ordenespago-routing.module';
import { LayoutAprobacionordenComponent } from './components/layout-aprobacionorden/layout-aprobacionorden.component';
import { AccountantApprobationComponent } from './components/accountant-approbation/accountant-approbation.component';
import { BudgetApprobationComponent } from './components/budget-approbation/budget-approbation.component';


@NgModule({
  declarations: [LayoutAprobacionordenComponent,
    AccountantApprobationComponent,
    BudgetApprobationComponent],
  imports: [
    CommonModule,
    AprobacionOrdenespagoRoutingModule
  ]
})
export class AprobacionOrdenespagoModule { }
