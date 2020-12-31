import { Component, OnInit } from '@angular/core';
import { CONFIGURACION_TABLA_ANEXOS, DATOS_TABLA_ANEXOS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-anexosimpuestos',
  templateUrl: './set-anexosimpuestos.component.html',
  styleUrls: ['./set-anexosimpuestos.component.scss']
})
export class SetAnexosimpuestosComponent implements OnInit {
  configTablaAnexos: any;
  datosAnexos: any;
  valorDevolucion: number;

  constructor() {
    this.configTablaAnexos = CONFIGURACION_TABLA_ANEXOS;
    this.datosAnexos = DATOS_TABLA_ANEXOS;
    this.valorDevolucion = 0;
  }

  ngOnInit() {
  }

}
