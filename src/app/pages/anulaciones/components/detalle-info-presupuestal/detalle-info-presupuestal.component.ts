import { Component, OnInit } from '@angular/core';
import { DATOS_PRESUPUESTAL } from '../../interfaces/interfaces';
@Component({
  selector: 'ngx-detalle-info-presupuestal',
  templateUrl: './detalle-info-presupuestal.component.html',
  styleUrls: ['./detalle-info-presupuestal.component.scss']
})
export class DetalleInfoPresupuestalComponent implements OnInit {

  titles: String[] = ['Código', 'Nombre del concepto', 'Disponibilidad', 'Registro', 'Valor aplicación (gasto)'];
  attributes: any[] = [['codigo'], ['nombreConcepto'], ['disponibilidad'], ['registro'], ['valorAplicacion']];

  datos: any;

  constructor() {
    this.datos = DATOS_PRESUPUESTAL;
   }

  ngOnInit() {
  }

}
