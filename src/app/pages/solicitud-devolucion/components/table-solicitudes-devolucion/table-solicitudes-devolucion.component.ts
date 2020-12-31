import { Component, OnInit } from '@angular/core';
import { CONFIGURACION_TABLA_SOLICITUDES, DATOS_TABLA_SOLICITUDES } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-solicitudes-devolucion',
  templateUrl: './table-solicitudes-devolucion.component.html',
  styleUrls: ['./table-solicitudes-devolucion.component.scss']
})
export class TableSolicitudesDevolucionComponent implements OnInit {
  configuracionTabla: any;
  datosSolicitudes: any;

  constructor() {
    this.configuracionTabla = CONFIGURACION_TABLA_SOLICITUDES;
    this.datosSolicitudes = DATOS_TABLA_SOLICITUDES;
   }

  ngOnInit() {
  }

}
