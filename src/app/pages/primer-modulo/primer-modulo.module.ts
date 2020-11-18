import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimerModuloRoutingModule } from './primer-modulo-routing.module';
import { ComponentePruebaComponent } from './components/componente-prueba.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ComponentePruebaComponent],
  imports: [
    CommonModule,
    PrimerModuloRoutingModule,
    SharedModule,
  ]
})
export class PrimerModuloModule { }
