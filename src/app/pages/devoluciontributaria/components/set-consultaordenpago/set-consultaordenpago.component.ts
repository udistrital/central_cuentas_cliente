import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DATOS_CONSULTAOP, CONFIGURACION_CONSULTAOP } from '../../interfaces/interfaces';
import { getAddSelected, getFilaSeleccionada, selectOrdenesPagoByDoc} from '../../../../shared/selectors/shared.selectors';
import { cargarDatosOrdenesPago } from '../../actions/devoluciontributaria.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-set-consultaordenpago',
  templateUrl: './set-consultaordenpago.component.html',
  styleUrls: ['./set-consultaordenpago.component.scss']
})
export class SetConsultaordenpagoComponent implements OnInit {

  configConsultaOP: any;
  datosConsultaOP: any;
  ordenesPagoSeleccionadas: any;
  consultaOPGroup: FormGroup;
  subOrdenPagoByDoc$: any;
  ordenesPagoByDoc: any;
  subscription: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private translate: TranslateService
    ) {
    // Datos de ejemplo q se muestran en la tabla
    this.datosConsultaOP = [];
    this.ordenesPagoSeleccionadas = [];
    this.configConsultaOP = CONFIGURACION_CONSULTAOP;
    for (let i = 0; i < this.configConsultaOP.dataConfig.length; i++) {
      this.configConsultaOP.dataConfig[i].title.name = this.translate.instant('DEVOL_TRIBUTARIA.' + this.configConsultaOP.dataConfig[i].title.label_i18n);
    }
    this.createForm();
  }

  ngOnInit() {
    this.subOrdenPagoByDoc$ = this.store.select(selectOrdenesPagoByDoc).subscribe((action) => {
      if (action && action.OrdenesPagoByDoc) {
        this.ordenesPagoByDoc = action.OrdenesPagoByDoc;
        action.OrdenesPagoByDoc = null;
        this.ordenesPagoByDoc.forEach(ordenPago => {
          const op = {
            vigencia: ordenPago.Vigencia,
            consecutivo: ordenPago.Consecutivo,
            disponibilidad: ordenPago.ImputacionPresupuestal[0].Disponibilidad,
            registro: ordenPago.ImputacionPresupuestal[0].Registro,
            documento: ordenPago.DocumentoBeneficiario,
            nombreBeneficiario: ordenPago.NombreBeneficiario,
            total: ordenPago.ValorOP,
            selected: false
          };
          this.datosConsultaOP.push(op);
        });
      }
    });
    this.subscription = this.store.select(getAddSelected).subscribe((accion) => {
      if (accion && accion.fila) {
        const aux = accion.fila;
        if (aux.selected === true) {
          this.ordenesPagoSeleccionadas.push(aux);
        } else if (aux.selected === false) {
          this.ordenesPagoSeleccionadas.splice(this.ordenesPagoSeleccionadas.findIndex((element: any) => aux.consecutivo === element.consecutivo), 1);
        }
      }
    });
  }

  // Validacion del Formulario
  get conceptoInvalid() {
    return this.consultaOPGroup.get('concepto').invalid && this.consultaOPGroup.get('concepto').touched;
  }

  elegirOP() {
    this.store.dispatch(cargarDatosOrdenesPago({data: this.ordenesPagoSeleccionadas}));
  }

  createForm() {
    this.consultaOPGroup = this.fb.group({
      codigoDisponibilidad: ['',
        [Validators.required,
        Validators.pattern('^[0-9]*$')]
      ],
      codigoRegistro: ['', Validators.required]
    });
  }

  saveForm() {
    if ( this.consultaOPGroup.invalid ) {
      return Object.values( this.consultaOPGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
