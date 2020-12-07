import { Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { cargarDatosIniciales } from '../../actions/aprobaciones.actions';
import { Router } from '@angular/router';
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
    private route: Router,
  ) {

   }

  ngOnInit() {
    this.aprobaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAprobacion: ['', Validators.required],
    });
  }

  onSubmit (data: any) {
    this.store.dispatch(cargarDatosIniciales(data));
    if (data.tipoAprobacion === "Orden de pago"){
      this.route.navigateByUrl('pages/aprobaciones/orden/lista');      
    }
  }
}
