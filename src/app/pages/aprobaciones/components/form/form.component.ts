import { Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { cargarDatosIniciales } from '../../actions/aprobaciones.actions';
@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  aprobaciones: any;
  nombreAprobacion: any;

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
  ) {

   }

  ngOnInit() {
    this.aprobaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      nAprobacion: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAprobacion: ['', Validators.required],
    });
  }

  onSubmit (data: any) {
    this.store.dispatch(cargarDatosIniciales(data));
  }
}
