import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GetConceptosContables } from '../../../../shared/actions/shared.actions';
import { getConceptosContables } from '../../../../shared/selectors/shared.selectors';

@Component({
  selector: 'ngx-set-infosolicitante',
  templateUrl: './set-infosolicitante.component.html',
  styleUrls: ['./set-infosolicitante.component.scss']
})
export class SetInfosolicitanteComponent implements OnInit, OnDestroy {
  datosSolicitante: FormGroup;
  subscriptionConceptos$: any;
  conceptosContables: any;

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.conceptosContables = [];
    this.store.dispatch(GetConceptosContables({}));
  }

  ngOnInit() {
    this.crearFormulario();
    // Conceptos contables
    this.subscriptionConceptos$ = this.store.select(getConceptosContables).subscribe((accion) => {
      if (accion && accion[0]) this.conceptosContables = accion[0];
    });
  }

  ngOnDestroy() {
    this.subscriptionConceptos$.unsubscribe();
  }

  crearFormulario() {
    this.datosSolicitante = this.fb.group({
      tipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
      concepto: ['', Validators.required],
      razon: ['', Validators.required]
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
