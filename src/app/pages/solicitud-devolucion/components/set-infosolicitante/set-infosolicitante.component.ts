import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-set-infosolicitante',
  templateUrl: './set-infosolicitante.component.html',
  styleUrls: ['./set-infosolicitante.component.scss']
})
export class SetInfosolicitanteComponent implements OnInit {
  datosSolicitante: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
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
