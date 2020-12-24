import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-set-infosolicitud',
  templateUrl: './set-infosolicitud.component.html',
  styleUrls: ['./set-infosolicitud.component.scss']
})
export class SetInfosolicitudComponent implements OnInit {
  datosSolicitud: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.datosSolicitud = this.fb.group({
      numeroSolicitud: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      fechaSolicitud: ['', Validators.required]
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosSolicitud.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

}
