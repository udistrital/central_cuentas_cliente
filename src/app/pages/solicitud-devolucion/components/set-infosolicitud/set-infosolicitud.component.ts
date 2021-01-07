import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { seleccionarTipoDevolucion } from '../../actions/solicitud-devolucion.actions';

@Component({
  selector: 'ngx-set-infosolicitud',
  templateUrl: './set-infosolicitud.component.html',
  styleUrls: ['./set-infosolicitud.component.scss']
})
export class SetInfosolicitudComponent implements OnInit {
  datosSolicitud: FormGroup;
  opcionesAreaFuncional: Array<any>;

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
  }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.datosSolicitud = this.fb.group({
      numeroSolicitud: ['', Validators.required],
      areaFuncional: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      tipoDevolucion: ['', Validators.required],
    });
    this.datosSolicitud.get('tipoDevolucion').valueChanges.subscribe(valor => {
      this.store.dispatch(seleccionarTipoDevolucion({ tipoDevolucion: valor }));
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosSolicitud.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario() {
    if (this.datosSolicitud.invalid) {
      return Object.values(this.datosSolicitud.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

}
