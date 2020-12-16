import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-form-anulation',
  templateUrl: './form-anulation.component.html',
  styleUrls: ['./form-anulation.component.scss']
})
export class FormAnulationComponent implements OnInit {

  @Output () eleccion: EventEmitter <any>;

  nombreAprobacion: any;
  anulaciones: any;

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.anulaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAnulacion: ['', Validators.required],
    });
    this.eleccion = new EventEmitter;
  }

  ngOnInit() {
  }

  onSubmit (data: any) {
    this.eleccion.emit(data);
  }

}
