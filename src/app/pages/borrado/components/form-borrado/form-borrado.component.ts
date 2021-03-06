import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-form-borrado',
  templateUrl: './form-borrado.component.html',
  styleUrls: ['./form-borrado.component.scss']
})
export class FormBorradoComponent implements OnInit {

  @Output () eleccionCuenta: EventEmitter <any>;

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];

  tipoCuenta: any;
  borrado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.eleccionCuenta = new EventEmitter;
   }

  ngOnInit() {
    this.borrado = this.formBuilder.group({
      fecha: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoBorrado: ['', Validators.required],
    });
  }

  onSubmit (data: any) {
    this.eleccionCuenta.emit(data);
  }

}
