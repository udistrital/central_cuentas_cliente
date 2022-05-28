import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DATOS_CONSULTAOP, CONFIGURACION_CONSULTAOP } from '../../interfaces/interfaces';
import { getAddSelected, getFilaSeleccionada, selectDevolucionTributariaById, selectOrdenesPagoByDoc} from '../../../../shared/selectors/shared.selectors';
import { cargarDatosOrdenesPago } from '../../actions/devoluciontributaria.actions';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

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
  subDevolucionTributaria$: any;
  devolucionesTributaria: any;
  flagDT: boolean;
  tituloAccion: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
    ) {
    // Datos de ejemplo q se muestran en la tabla
    this.flagDT = true;
    this.datosConsultaOP = [];
    this.ordenesPagoSeleccionadas = [];
    this.configConsultaOP = CONFIGURACION_CONSULTAOP;
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    for (let i = 0; i < this.configConsultaOP.dataConfig.length; i++) {
      this.configConsultaOP.dataConfig[i].title.name = this.translate.instant('DEVOL_TRIBUTARIA.' + this.configConsultaOP.dataConfig[i].title.label_i18n);
    }
    if (this.tituloAccion === 'ver') this.configConsultaOP.checkElement.pipe.disabled = true;
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
        if (this.tituloAccion === 'editar' || this.tituloAccion === 'ver') this.devolucionTributaria();
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

    this.subDevolucionTributaria$ = this.store.select(selectDevolucionTributariaById).subscribe((action) => {
      if (this.flagDT && action && action.DevolucionTributariaById) {
        this.devolucionesTributaria = action.DevolucionTributariaById;
        this.flagDT = false;
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

  devolucionTributaria() {
    if (this.datosConsultaOP.length > 0) {
      this.devolucionesTributaria.OrdenesPago.forEach(element => {
        const aux = (this.datosConsultaOP).findIndex((e: any) => e.consecutivo === element.Consecutivo);
        this.datosConsultaOP[aux].selected = true;
        this.ordenesPagoSeleccionadas.push(this.datosConsultaOP[aux]);
      });
    }
  }

}
