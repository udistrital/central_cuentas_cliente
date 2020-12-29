import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-show-comprobantepago',
  templateUrl: './show-comprobantepago.component.html',
  styleUrls: ['./show-comprobantepago.component.scss']
})
export class ShowComprobantepagoComponent implements OnInit {

  comprobantepagoGroup: FormGroup;

  constructor( private fb: FormBuilder) {

    this.createForm();
   }

  ngOnInit() {
  }
  // Validacion de Formulario
  get observacionInvalid() {
    return this.comprobantepagoGroup.get('observacion').invalid && this.comprobantepagoGroup.get('observacion').touched;
  }
  get nombreAutorizaInvalid() {
    return this.comprobantepagoGroup.get('nombreAutoriza').invalid && this.comprobantepagoGroup.get('nombreAutoriza').touched;
  }

  createForm() {
    this.comprobantepagoGroup = this.fb.group({
      observacion: ['',
      [Validators.required,
      Validators.minLength(5)]],
      nombreAutoriza: ['',
      [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)]]
    });
  }

  saveForm() {
    if ( this.comprobantepagoGroup.invalid ) {
      return Object.values( this.comprobantepagoGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
