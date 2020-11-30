import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() nombreAprobacion: any;
  @Output() aprobaciones: any;

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];
  
  

  constructor(
    private formBuilder: FormBuilder
  ) {
    
   }

  ngOnInit() {
    this.aprobaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      nAprobacion: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAprobacion: ['', Validators.required],
    })
  }

  onSubmit (data:any) {
    this.nombreAprobacion = data.tipoAprobacion;
    console.log(data);
    }
}
