import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { seleccionarDatosSolicitante } from '../../actions/solicitud-devolucion.actions';

@Component({
  selector: 'ngx-set-infosolicitante',
  templateUrl: './set-infosolicitante.component.html',
  styleUrls: ['./set-infosolicitante.component.scss']
})
export class SetInfosolicitanteComponent implements OnInit, OnDestroy {
  datosSolicitante: FormGroup;
  susDatosSolicitante$: any;

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit() {
    this.crearFormulario();
  }

  ngOnDestroy() {
    this.susDatosSolicitante$.unsubscribe();
  }

  crearFormulario() {
    this.datosSolicitante = this.fb.group({
      tipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
      concepto: ['', Validators.required],
      razon: ['', Validators.required]
    });
    this.susDatosSolicitante$ = this.datosSolicitante.valueChanges.subscribe(valor => {
      if (this.datosSolicitante.valid)
        this.store.dispatch(seleccionarDatosSolicitante({ datosSolicitante: valor }));
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosSolicitante.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario() {
    if (this.datosSolicitante.invalid) {
      return Object.values(this.datosSolicitante.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

}
