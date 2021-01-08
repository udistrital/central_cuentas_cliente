import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OPCIONES_AREA_FUNCIONAL } from '../../../../shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { cargarDatosBeneficiario, cargarDatosAlmacenadosBeneficiario } from '../../actions/ordenespago.actions';
import { DATOS_BENEFICIARIO } from '../../interfaces/interfaces';
@Component({
  selector: 'ngx-set-datosbeneficiario',
  templateUrl: './set-datosbeneficiario.component.html',
  styleUrls: ['./set-datosbeneficiario.component.scss']
})
export class SetDatosbeneficiarioComponent implements OnInit {
  datosBeneficiario: FormGroup;
  opcionesAreaFuncional: Array<any>;
  datosAlmacenadosBeneficiarios: any;
  datosAlmacenadosBeneficiario: any;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    ) {
      this.datosAlmacenadosBeneficiarios = DATOS_BENEFICIARIO;
     }

  ngOnInit() {
    this.opcionesAreaFuncional = OPCIONES_AREA_FUNCIONAL;
    this.crearFormulario();
    this.handleFormChanges();
  }

  handleFormChanges() {
    this.datosBeneficiario.valueChanges.subscribe(
      (result: any) => {
        if (result.numeroId !== '') {
          this.datosAlmacenadosBeneficiarios.filter(
            (data: any) => {
              if (data.numeroId === result.numeroId) {
                this.datosAlmacenadosBeneficiario = data;
              } else {
                this.datosAlmacenadosBeneficiario = [];
              }
            });
        }
      }
    );
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
  }

  esInvalido(nombre: string) {
    const input = this.datosBeneficiario.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  validarFormulario(data: any ) {
    if (this.datosBeneficiario.invalid) {
      return Object.values(this.datosBeneficiario.controls).forEach(control => {
        control.markAsDirty();
      });
    } else {
      this.store.dispatch(cargarDatosBeneficiario(data));
      this.store.dispatch(cargarDatosAlmacenadosBeneficiario(this.datosAlmacenadosBeneficiario));
    }
  }

}
