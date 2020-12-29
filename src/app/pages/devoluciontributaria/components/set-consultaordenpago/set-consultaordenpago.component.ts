import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DATOS_CONSULTAOP, CONFIGURACION_CONSULTAOP } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-consultaordenpago',
  templateUrl: './set-consultaordenpago.component.html',
  styleUrls: ['./set-consultaordenpago.component.scss']
})
export class SetConsultaordenpagoComponent implements OnInit {

  configConsultaOP: any;
  datosConsultaOP: any;
  consultaOPGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    // Datos de ejemplo q se muestran en la tabla
    this.datosConsultaOP = DATOS_CONSULTAOP;
    this.configConsultaOP = CONFIGURACION_CONSULTAOP;
    this.createForm();
  }

  ngOnInit() {
  }

  // Validacion del Formulario
  get conceptoInvalid() {
    return this.consultaOPGroup.get('concepto').invalid && this.consultaOPGroup.get('concepto').touched;
  }

  createForm() {
    this.consultaOPGroup = this.fb.group({
      codigoDisponibilidad: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ],
      codigoRegistro: ['', Validators.required]
    });
  }

  saveForm() {
    if ( this.consultaOPGroup.invalid ) {
      return Object.values( this.consultaOPGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
