import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { cargarDatosCompromiso, cargarDatosAlmacenadosCompromiso } from '../../actions/ordenespago.actions';
import { DATOS_COMPROMISO } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-datoscompromiso',
  templateUrl: './set-datoscompromiso.component.html',
  styleUrls: ['./set-datoscompromiso.component.scss']
})
export class SetDatoscompromisoComponent implements OnInit {
  datosCompromiso: FormGroup;
  datosAlmacenadosCompromisos: any;
  datosAlmacenadosCompromiso: any;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    ) {
      this.datosAlmacenadosCompromisos = DATOS_COMPROMISO;
      this.datosAlmacenadosCompromiso = [];
    }

  ngOnInit() {
    this.crearFormulario();
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.datosCompromiso.valueChanges.subscribe(
      (result: any) => {
        if (result.numeroCompromiso !== '') {
          this.datosAlmacenadosCompromisos.filter(
            (data: any) => {
              if (data.numeroCompromiso === result.numeroCompromiso) {
                this.datosAlmacenadosCompromiso = data;
              } else {
                this.datosAlmacenadosCompromiso = [];
              }
            });
        }
      }
    );
  }

  crearFormulario() {
    this.datosCompromiso = this.fb.group({
      compromiso: ['', Validators.required],
      numeroCompromiso: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]],
      vigencia: ['', Validators.required],
      tipoOrden: ['', Validators.required],
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosCompromiso.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario(data: any) {
    if (this.datosCompromiso.invalid) {
      return Object.values(this.datosCompromiso.controls).forEach(control => {
        control.markAsDirty();
      });
    } else {
      this.store.dispatch(cargarDatosAlmacenadosCompromiso(this.datosAlmacenadosCompromiso));
      this.store.dispatch(cargarDatosCompromiso(data));
    }
  }
}
