import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DATOS_VALOR } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-detail-step-uno',
  templateUrl: './detail-step-uno.component.html',
  styleUrls: ['./detail-step-uno.component.scss']
})
export class DetailStepUnoComponent implements OnInit {

  @Output () segundoForm: EventEmitter <any>;

  acta: FormGroup;
  datos: any;

  titles: String[] = ['Nombre del concepto', 'Valor'];
  attributes: any[] = [['nConcepto'], ['valor']];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.datos = DATOS_VALOR;
    this.segundoForm = new EventEmitter;
  }

  ngOnInit() {
    this.acta = this.formBuilder.group({
      justificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
    });
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.acta.statusChanges.subscribe(
      (result: any) => {if (result === 'VALID') {
        this.segundoForm.emit(true);
        } else if (result === 'INVALID') {
          this.segundoForm.emit(false);
        }
      }
    );
  }

  onSubmit() {
  }

}
