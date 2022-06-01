import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-set-datossolicitante',
  templateUrl: './set-datossolicitante.component.html',
  styleUrls: ['./set-datossolicitante.component.scss']
})
export class SetDatossolicitanteComponent implements OnInit {

  datosSolicitanteGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.datosSolicitanteGroup = this.fb.group({
      areaFuncional: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      estado: [''],
      nombre: [''],
      cargo: [''],
      numeroRequerimiento: [''],
      fechaRequerimiento: [''],
      concepto: [''],
      razonDevolucion: [''],
      valorDevolucion: [''],
    });
  }
}
