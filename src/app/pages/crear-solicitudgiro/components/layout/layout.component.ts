import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  titulo: any;

  constructor( ) {
    this.titulo = 'CREAR NUEVA SOLICITUD DE AUTORIZACIÓN DE GIRO';
  }


}
