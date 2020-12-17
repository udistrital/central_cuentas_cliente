import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.scss']
})
export class FormDocumentComponent implements OnInit {
  oficio: any;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.oficio = this.formBuilder.group({
      oficio: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  onSubmit () {

  }
}
