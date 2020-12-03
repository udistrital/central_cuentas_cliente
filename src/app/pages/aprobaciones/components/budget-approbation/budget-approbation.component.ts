import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DATOS_ORDEN_DETALLE} from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-budget-approbation',
  templateUrl: './budget-approbation.component.html',
  styleUrls: ['./budget-approbation.component.scss']
})
export class BudgetApprobationComponent implements OnInit {

  titles: String[] = ['Cód. cuenta contable', 'Vigencia', 'Entidad', 'Unidad', 'Disponibilidad', 'Registro', 'Valor'];
  attributes: any[] = [['codigoCuentaContable'], ['vigencia'], ['entidad'], ['unidad'], ['disponibilidad'], ['registro'], ['valor']];
  datosCreacion: any;

  constructor() { 
    this.datosCreacion = DATOS_ORDEN_DETALLE;
  }

  ngOnInit() {
  }

  recha(){

  }

  aprobar(){

  }

}
