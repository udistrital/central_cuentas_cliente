import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DATOS_CONSULTAOP, CONFIGURACION_CONSULTAOP } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-infodevoluciontributaria',
  templateUrl: './set-infodevoluciontributaria.component.html',
  styleUrls: ['./set-infodevoluciontributaria.component.scss']
})
export class SetInfodevoluciontributariaComponent implements OnInit {

  configConsultaOP: any;
  datosConsultaOP: any;
  infoDevolucionGroup: FormGroup;

  constructor(private fb: FormBuilder) {
            // Datos de ejemplo q se muestran en la tabla
            this.datosConsultaOP = DATOS_CONSULTAOP;
            this.configConsultaOP = CONFIGURACION_CONSULTAOP;
            // Configuracion de la tabla
            // this.stringBusqueda = '';
            // this.selectedAction = new EventEmitter<any>();
            this.createForm();
  }

  ngOnInit() {
  }

  // Validacion del Formulario
  get areaFuncionalInvalid() {
    return this.infoDevolucionGroup.get('areaFuncional').invalid && this.infoDevolucionGroup.get('areaFuncional').touched;
  }
  get fechaDevolucionInvalid() {
    return this.infoDevolucionGroup.get('fechaDevolucion').invalid && this.infoDevolucionGroup.get('fechaDevolucion').touched;
  }
  get tipoComprobanteInvalid() {
    return this.infoDevolucionGroup.get('tipoComprobante').invalid && this.infoDevolucionGroup.get('tipoComprobante').touched;
  }
  get tipoIdInvalid() {
    return this.infoDevolucionGroup.get('tipoId').invalid && this.infoDevolucionGroup.get('tipoId').touched;
  }
  get numeroIdInvalid() {
    return this.infoDevolucionGroup.get('numeroId').invalid && this.infoDevolucionGroup.get('numeroId').touched;
  }
  get requerimientoInvalid() {
    return this.infoDevolucionGroup.get('requerimiento').invalid && this.infoDevolucionGroup.get('requerimiento').touched;
  }
  get conceptoInvalid() {
    return this.infoDevolucionGroup.get('concepto').invalid && this.infoDevolucionGroup.get('concepto').touched;
  }
  get razonDevolucionInvalid() {
    return this.infoDevolucionGroup.get('razonDevolucion').invalid && this.infoDevolucionGroup.get('razonDevolucion').touched;
  }


  createForm() {
    this.infoDevolucionGroup = this.fb.group({
      areaFuncional: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
      numeroComprobante: ['001', ],
      tipoComprobante: ['', Validators.required],
      tipoId: ['', Validators.required],
      numeroId: ['',
      [Validators.required,
      Validators.pattern('^[0-9]*$')]],
      requerimiento: ['',
      [Validators.required,
      Validators.pattern('^[0-9]*$')]],
      concepto: ['', Validators.required],
      razonDevolucion: ['', Validators.required],
    });
  }

  saveForm() {
    if ( this.infoDevolucionGroup.invalid ) {
      return Object.values( this.infoDevolucionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
