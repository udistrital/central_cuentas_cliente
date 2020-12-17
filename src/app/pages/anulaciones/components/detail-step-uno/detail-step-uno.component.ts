import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DATOS_VALOR } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-detail-step-uno',
  templateUrl: './detail-step-uno.component.html',
  styleUrls: ['./detail-step-uno.component.scss']
})
export class DetailStepUnoComponent implements OnInit {

  acta: any;
  datos: any;

  titles: String[] = ['Nombre del concepto', 'Valor'];
  attributes: any[] = [['nConcepto'], ['valor']];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.datos = DATOS_VALOR;
    this.acta = this.formBuilder.group({
      justificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
  }

}
