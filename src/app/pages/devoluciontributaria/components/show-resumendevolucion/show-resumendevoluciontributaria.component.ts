import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { crearConsecutivo, getProcesoConfiguracion } from '../../../../shared/actions/shared.actions';
import { selectProcesoConfiguracion, selectConsecutivo } from '../../../../shared/selectors/shared.selectors';
import { actualizarDevolucionTributaria, crearDevolucionTributaria } from '../../actions/devoluciontributaria.actions';
import { CONFIGURACION_CONSULTAOP, CONFIGURACION_CONTABILIZACION } from '../../interfaces/interfaces';
import { getDatosDevolucion, getDatosAlmacenadosSolicitud, getInfoDevolucionTributaria, getDatosOrdenesPago, getDatosContabilizacion, getContabilizacion } from '../../selectors/devoluciontributaria.selectors';

@Component({
  selector: 'ngx-show-resumendevoluciontributaria',
  templateUrl: './show-resumendevoluciontributaria.component.html',
  styleUrls: ['./show-resumendevoluciontributaria.component.scss']
})
export class ShowResumenDevolucionTributariaComponent implements OnInit, OnDestroy {

  comprobantepagoGroup: FormGroup;

  subscriptionDatosDevolucion$: any;
  subscriptionDatosAlmacenadosDevolucion$: any;
  datosDevolucion: any;
  datosAlmacenadosDevolucion: any;
  subscriptionInfoDevolucionTributaria$: any;
  infoDevolucionTributaria: any;
  configConsultaOP: any;
  datosConsultaOP: any;
  configContabilizacion: any;
  subscriptionDatosOP$: any;
  subscriptionDatosContabilizacion$: any;
  subscriptionContabilizacion$: any;
  datosContabilizacion: any;
  contabilizacion: any;
  subProceso$: any;
  proceso: any;
  subConsecutivo$: any;
  tituloAccion: string;

  constructor( private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.configConsultaOP = Object.assign({}, CONFIGURACION_CONSULTAOP);
    this.configContabilizacion = Object.assign({} , CONFIGURACION_CONTABILIZACION);
    this.configConsultaOP.rowActions = null;
    this.configContabilizacion.rowActions = null;
    this.configConsultaOP.checkElement = null;
    this.datosConsultaOP = [];
    this.store.dispatch(getProcesoConfiguracion({query: {Sigla: 'DT'}}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
  }

  ngOnDestroy() {
    this.subscriptionDatosDevolucion$.unsubscribe();
    this.subscriptionDatosAlmacenadosDevolucion$.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionDatosDevolucion$ = this.store.select(getDatosDevolucion).subscribe(
      data => {
        if (data) {
          this.datosDevolucion = data;
        }
      }
    );
    this.subscriptionDatosAlmacenadosDevolucion$ = this.store.select(getDatosAlmacenadosSolicitud).subscribe(
      data => {
        if (data) {
          this.datosAlmacenadosDevolucion = data;
        }
      }
    );

    this.subscriptionInfoDevolucionTributaria$ = this.store
    .select(getInfoDevolucionTributaria).subscribe((action) => {
      if (action && action.InfoDevolucionTributaria) {
        this.infoDevolucionTributaria = action.InfoDevolucionTributaria;
      }
    });

    this.subscriptionDatosOP$ = this.store
    .select(getDatosOrdenesPago).subscribe((action) => {
      if (action && action.data) {
        this.datosConsultaOP = action.data;
      }
    });

    this.subscriptionDatosContabilizacion$ = this.store
    .select(getDatosContabilizacion).subscribe((action) => {
      if (action && action.data) {
        this.datosContabilizacion = action.data;
      }
    });

    this.subscriptionContabilizacion$ = this.store
    .select(getContabilizacion).subscribe((action) => {
      if (action && action.Contabilizacion) {
        this.contabilizacion = action.Contabilizacion;
      }
    });

    this.subProceso$ = this.store.select(selectProcesoConfiguracion).subscribe((action) => {
      if (action && action.Proceso) {
        this.proceso = action.Proceso[0];
      }
    });
  }

  // Validacion de Formulario
  get observacionInvalid() {
    return this.comprobantepagoGroup.get('observacion').invalid
    && this.comprobantepagoGroup.get('observacion').touched;
  }
  get nombreAutorizaInvalid() {
    return this.comprobantepagoGroup.get('nombreAutoriza').invalid
    && this.comprobantepagoGroup.get('nombreAutoriza').touched;
  }

  guardar(revisar: string) {
    const consecOP = [];
    this.datosConsultaOP.forEach(element => {
      const aux = {
        Consecutivo: element.consecutivo
      };
      consecOP.push(aux);
    });
    const elemento = {
      Activo: true,
      AreaFuncional: this.infoDevolucionTributaria.areaFuncional.Id,
      Consecutivo: this.contabilizacion.consecutivo,
      NumeroRequerimiento: this.infoDevolucionTributaria.requerimiento,
      FechaSolicitud: this.infoDevolucionTributaria.fechaSolicitud,
      DocumentoBeneficiario: this.infoDevolucionTributaria.numeroId,
      NombreBeneficiario: this.infoDevolucionTributaria.nombreBeneficiario,
      Concepto: this.infoDevolucionTributaria.conceptoContable.Codigo,
      RazonDevolucion: this.infoDevolucionTributaria.razonDevolucion,
      TipoComprobante: this.contabilizacion.tipoComprobante,
      NumeroComprobante: this.contabilizacion.numeroComprobante,
      ValorDevolucion: 1000,
      Estado: 'Elaborado',
      OrdenesPago: consecOP,
      MovimientoContable: this.datosContabilizacion
    };
    if (this.tituloAccion === 'editar') {
      this.store.dispatch(actualizarDevolucionTributaria({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
    } else {
      const consecutivo = {
        ContextoId: this.proceso.Id,
        Year: new Date().getFullYear(),
        Descripcion: 'Devolucion Tributaria'
      };
      this.store.dispatch(crearConsecutivo({element: consecutivo}));
      this.subConsecutivo$ = this.store.select(selectConsecutivo).subscribe((accion) => {
        if (accion && accion.Consecutivos) {
          elemento.Consecutivo = accion.Consecutivos.Consecutivo;
          this.store.dispatch(crearDevolucionTributaria({element: elemento}));
        }
      });
    }
  }

  saveForm() {
    if ( this.comprobantepagoGroup.invalid ) {
      return Object.values( this.comprobantepagoGroup.controls )
      .forEach( control => { control.markAsTouched(); });
    }
  }

}
