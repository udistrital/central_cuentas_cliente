import { Component, OnInit } from '@angular/core';
import { DATOS_ORDENPAGO, DATOS_RELACION_AUTORIZACION } from '../../interfaces/interfaces';
import { FormService } from '../../../../shared/services/form.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-crear-anulacion',
  templateUrl: './crear-anulacion.component.html',
  styleUrls: ['./crear-anulacion.component.scss']
})
export class CrearAnulacionComponent implements OnInit {

  tipoAnulacion: any;
  datosOrden: any;
  datosRelacion: any;
  anulacionForm: boolean = false;

  titlesOrden: String[] = ['Vigencia', 'Consecutivo', 'Tipo ID', 'No. ID', 'Nombre'];
  attributesOrden: any[] = [['vigencia'], ['consecutivo'], ['tipoID'], ['numeroID'], ['nombre']];

  titlesRelacion: String[] = ['Área funcional', 'Vigencia', 'Mes', 'Consecutivo', 'Estado'];
  attributesRelacion: any[] = [['areaFuncional'], ['vigencia'], ['mes'], ['consecutivo'], ['estado']];

  constructor(
    public form: FormService,
    public route: Router,
  ) {
    this.datosOrden = DATOS_ORDENPAGO;
    this.datosRelacion = DATOS_RELACION_AUTORIZACION;
  }

  ngOnInit() {
    this.form.aprobacionesElegidas = [];
  }

  eleccionAnulacion( data: any ) {
    this.tipoAnulacion = data.tipoAnulacion;
  }

  validarForm ( data: any ) {
    this.anulacionForm = data;
  }

  crear () {
    if (this.tipoAnulacion === 'Orden de pago') {
      this.route.navigateByUrl('/pages/anulaciones/detalle/opago');
    } else if (this.tipoAnulacion === 'Relación de autorización') {
      this.route.navigateByUrl('/pages/anulaciones/detalle/rautorizacion');
    }
  }

}
