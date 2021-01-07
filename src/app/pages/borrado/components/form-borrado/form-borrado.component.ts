import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { cargarDatosCuenta } from '../../actions/borrado.actions';
@Component({
  selector: 'ngx-form-borrado',
  templateUrl: './form-borrado.component.html',
  styleUrls: ['./form-borrado.component.scss']
})
export class FormBorradoComponent implements OnInit {

  @Output () borradoForm: EventEmitter <any>;
  @Output () eleccionCuenta: EventEmitter <any>;

  areaFuncional: String [] = [
    'Servicios',
    'Pagos',
    'Formatos'
  ];

  tipoCuenta: any;
  borrado: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
  ) {
    this.borradoForm = new EventEmitter;
    this.eleccionCuenta = new EventEmitter;
   }

  ngOnInit() {
    this.borrado = this.formBuilder.group({
      fecha: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      tipoBorrado: ['', Validators.required],
    });
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.borrado.statusChanges.subscribe(
      (result: any) => {if (result === 'VALID') {
        this.borradoForm.emit(true);
        } else if (result === 'INVALID') {
          this.borradoForm.emit(false);
        }
      }
    );
  }

  onSubmit (data: any) {
    this.eleccionCuenta.emit(data);
    this.store.dispatch(cargarDatosCuenta(data)); 
  }

}
