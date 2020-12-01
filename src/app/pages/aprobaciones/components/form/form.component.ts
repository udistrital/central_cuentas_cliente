import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    this.aprobaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      nAprobacion: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAprobacion: ['', Validators.required],
    })
   }

  ngOnInit() {
    
  }

  onSubmit (data:any) {
    this.store.dispatch(cargarDatosIniciales(data));
  }
}
