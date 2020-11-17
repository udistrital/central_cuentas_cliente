import { Component, OnInit } from '@angular/core';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'ngx-componente-prueba',
  templateUrl: './componente-prueba.component.html',
  styleUrls: ['./componente-prueba.component.scss']
})
export class ComponentePruebaComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  constructor() {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }
  ngOnInit() {
  }

}
