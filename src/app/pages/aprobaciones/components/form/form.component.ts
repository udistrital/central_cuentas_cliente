import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];
  aprobaciones: any;
  nombreAprobacion: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.aprobaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      nAprobacion: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAprobacion: '',
    })
   }

  ngOnInit() {
    
  }

  onSubmit (data:any) {
    console.log(data);
    }
}
