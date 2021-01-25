import { Component, OnInit } from '@angular/core';
import { DATOS_FINANCIERA } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-detalle-info-financiera',
  templateUrl: './detalle-info-financiera.component.html',
  styleUrls: ['./detalle-info-financiera.component.scss']
})
export class DetalleInfoFinancieraComponent implements OnInit {

  titles: String[] = ['Valor bruto', 'Descuento', 'Base de retención', 'Cód. contable', 'Valor'];
  attributes: any[] = [['valorBruto'], ['descuento'], ['baseRetencion'], ['codigoContable'], ['valor']];

  datos: any;

  constructor(
    private route: Router,
  ) {
    this.datos = DATOS_FINANCIERA;
  }

  ngOnInit() {
  }

  onSubmit () {
    Swal.fire({
      type: 'success',
      title: '¡Proceso exitoso!',
      text: 'Se ha anulado la orden de pago con consecutivo',
      confirmButtonText: 'Aceptar',
    });
    this.route.navigateByUrl('/pages/anulaciones/lista');
  }

}
