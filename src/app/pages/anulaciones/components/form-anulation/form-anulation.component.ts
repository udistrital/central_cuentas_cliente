import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-form-anulation',
  templateUrl: './form-anulation.component.html',
  styleUrls: ['./form-anulation.component.scss']
})
export class FormAnulationComponent implements OnInit {

  @Output () eleccion: EventEmitter <any>;
  @Output () anulacionForm: EventEmitter <any>;

  nombreAprobacion: any;
  anulaciones: any;

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.eleccion = new EventEmitter;
    this.anulacionForm = new EventEmitter;
  }

  ngOnInit() {
    this.anulaciones = this.formBuilder.group({
      fecha: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoAnulacion: ['', Validators.required],
    });
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.anulaciones.statusChanges.subscribe(
      (result: any) => {if (result === 'VALID') {
        this.anulacionForm.emit(true);
        } else if (result === 'INVALID') {
          this.anulacionForm.emit(false);
        }
      }
    );
  }

  onSubmit (data: any) {
    this.eleccion.emit(data);
  }

}
