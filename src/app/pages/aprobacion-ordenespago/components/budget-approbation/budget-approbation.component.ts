import { Component, OnInit } from '@angular/core';
import { DATOS_ORDEN_DETALLE} from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
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

  rechazarAprobacion(){
    
  }


  aceptarAprobacion(){
    Swal.fire({
      type: 'success',
      title: '¡Aprobación exitosa!',
      text: 'Se aprobó la relación de orden de pago con consecutivo',
      confirmButtonText: 'Aceptar',
    });
  }

}
