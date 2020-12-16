import { Component, OnInit } from '@angular/core';
import { DATOS_ORDENPAGO, DATOS_RELACION_AUTORIZACION } from '../../interfaces/interfaces'
import { FormService } from '../../../../shared/services/form.service';
@Component({
  selector: 'ngx-create-anulation',
  templateUrl: './create-anulation.component.html',
  styleUrls: ['./create-anulation.component.scss']
})
export class CreateAnulationComponent implements OnInit {

  tipoAnulacion:any;
  datosOrden: any;
  datosRelacion: any;

  titlesOrden: String[] = ['Vigencia', 'Consecutivo', 'Tipo ID', 'No. ID', 'Nombre'];
  attributesOrden: any[] = [['vigencia'], ['consecutivo'], ['tipoID'], ['numeroID'],['nombre']];

  titlesRelacion: String[] = ['Área funcional', 'Vigencia', 'Mes', 'Consecutivo', 'Estado'];
  attributesRelacion: any[] = [['areaFuncional'], ['vigencia'], ['mes'], ['consecutivo'], ['estado']];

  constructor(
    public form: FormService,
  ) { 
    this.datosOrden = DATOS_ORDENPAGO;
    this.datosRelacion = DATOS_RELACION_AUTORIZACION;
  }


  ngOnInit() {
    this.form.aprobacionesElegidas = [];
  }

  eleccionAnulacion(data:any){
    this.tipoAnulacion = data.tipoAnulacion;  
  }

}
