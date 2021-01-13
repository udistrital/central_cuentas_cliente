import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { seleccionarAreaFuncional } from '../../actions/ordenespago.actions';
import { CONFIGURACION_TABLA_ESTADOS, DATOS_ESTADOS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit, OnDestroy {
  datosBeneficiario: FormGroup;
  opcionesAreaFuncional: Array<any>;
  configTableEstados: any;
  datosTableEstados: any;
  susUnidadEjecutora$: any;

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit() {
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.configTableEstados = CONFIGURACION_TABLA_ESTADOS;
    this.datosTableEstados = DATOS_ESTADOS;
    this.crearFormulario();
  }

  ngOnDestroy() {
    this.susUnidadEjecutora$.unsubscribe();
  }

  crearFormulario() {
    this.datosBeneficiario = this.fb.group({
      numeroOrden: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ],
      ],
      fechaOrden: ['', Validators.required],
      unidadEjecutora: ['', Validators.required],
      tipoId: ['', Validators.required],
      numeroId: ['', Validators.required],
      banco: ['', Validators.required],
      cuenta: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ],
      ]
    });
    this.susUnidadEjecutora$ = this.datosBeneficiario.get('unidadEjecutora').valueChanges.subscribe(valor => {
      this.store.dispatch(seleccionarAreaFuncional({ areaFuncional: valor }));
    });
  }

  esInvalido(nombre: string) {
    const input = this.datosBeneficiario.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario() {
    if (this.datosBeneficiario.invalid) {
      return Object.values(this.datosBeneficiario.controls).forEach(control => {
        control.markAsDirty();
      });
    }
  }

}
