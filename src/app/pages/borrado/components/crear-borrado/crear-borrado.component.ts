import { Component, OnInit } from '@angular/core';
import { DATOS_RELACION_AUTORIZACION, DATOS_ORDENPAGO} from '../../interfaces/interfaces';
import { FormService } from '../../../../shared/services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-crear-borrado',
  templateUrl: './crear-borrado.component.html',
  styleUrls: ['./crear-borrado.component.scss']
})
export class CrearBorradoComponent implements OnInit {

  tipoBorrado: any;
  borradoForm: boolean = false;

  datosOrden: any;
  datosRelacion: any;

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

  eleccionBorrado (data: any) {
    this.tipoBorrado = data.tipoBorrado;
  }

  validarForm (data: any) {
    this.borradoForm = data;
  }

  crear () {
    if (this.tipoBorrado === 'Orden de pago') {
      this.route.navigateByUrl('/pages/borrado/detalle/opago');
    } else if (this.tipoBorrado === 'Relación de autorización') {
      this.route.navigateByUrl('/pages/borrado/detalle/rautorizacion');
    }
  }

}
