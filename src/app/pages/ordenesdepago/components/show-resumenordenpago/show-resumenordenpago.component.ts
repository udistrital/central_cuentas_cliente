import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE,
  CONFIGURACION_IMPUNTUACION, DATOS_IMPUNTUACION, CONFIGURACION_IMPUESTOS_RETENCIONES,
} from '../../interfaces/interfaces';
import { getDatosCompromiso, getDatosAlmacenadosCompromiso, getDatosImputacionPresupuestal, getDatosMovimientoContable, getInfoDatosBeneficiario,
  getDatosImpuestosYRetenciones, getImpYRet, getMovimientoContable } from '../../selectors/ordenespago.selectors';
import { Store } from '@ngrx/store';
import { selectVigenciasNoFuturas } from '../../../../shared/selectors/shared.selectors';
import { getAreaFuncional } from '../../selectors/ordenespago.selectors';
import { combineLatest } from 'rxjs';
import { subirOrdenPago } from '../../actions/ordenespago.actions';
@Component({
  selector: 'ngx-show-resumenordenpago',
  templateUrl: './show-resumenordenpago.component.html',
  styleUrls: ['./show-resumenordenpago.component.scss']
})
export class ShowResumenordenpagoComponent implements OnInit, OnDestroy {
  resumen: FormGroup;
  configTableImpuntuacion: any;
  datosTableImputacion: any;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;
  configTableImpuestosRetenciones: any;
  datosTableImpuestosRetenciones: any;
  datosBeneficiario: any;
  datosAlmacenadosBeneficiario: any;
  datosCompromiso: any;
  datosAlmacenadosCompromiso: any;
  subscriptionDatosBeneficiario$: any;
  subscriptionDatosAlmacenadosBeneficiario$: any;
  subscriptionDatosCompromiso$: any;
  subscriptionDatosAlmacenadosCompromiso$: any;
  subscriptionDatosImputacion$: any;
  subscriptionDatosMovimiento$: any;
  subscriptionDatosImpuestos$: any;
  subImpYRet$: any;
  impYRet: any;
  subscriptionMovimientoContable$: any;
  movimientoContable: any;
  descuento: any;
  gasto: any;
  vigenciaActual: number;
  susVigencias$: any;
  vigencias: any;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    ) {
    this.configTableImpuntuacion = Object.assign({}, CONFIGURACION_IMPUNTUACION);
    this.configTableMovimientoContable = Object.assign({}, CONFIGURACION_MOVIMIENTO_CONTABLE);
    this.configTableImpuntuacion.rowActions = null;
    this.configTableMovimientoContable.rowActions = null;
    this.datosTableImputacion = [];
    this.datosTableMovimientoContable = [];
    this.datosTableImpuestosRetenciones = [];
    this.configTableImpuestosRetenciones = Object.assign({}, CONFIGURACION_IMPUESTOS_RETENCIONES);
    this.configTableImpuestosRetenciones.rowActions = null;
  }

  ngOnDestroy () {
    this.subscriptionDatosBeneficiario$.unsubscribe();
    this.subscriptionDatosAlmacenadosCompromiso$.unsubscribe();
    this.subscriptionDatosCompromiso$.unsubscribe();
    this.subscriptionDatosImputacion$.unsubscribe();
    this.subscriptionDatosMovimiento$.unsubscribe();
    this.susVigencias$.unsubscribe();
  }

  ngOnInit() {
    this.resumen = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.subscriptionDatosBeneficiario$ = this.store.select(getInfoDatosBeneficiario).subscribe((action) => {
      if (action && action.InfoDatosBeneficiario) {
        this.datosBeneficiario = action.InfoDatosBeneficiario;
      }
    });
    this.subscriptionDatosCompromiso$ = this.store.select(getDatosCompromiso).subscribe((action) => {
      if (action && action.DatosCompromiso) {
        this.datosCompromiso = action.DatosCompromiso;
      }
    });
    this.subscriptionDatosAlmacenadosCompromiso$ = this.store.select(getDatosAlmacenadosCompromiso).subscribe(
      data => {
        if (data !== null) {
          this.datosAlmacenadosCompromiso = data;
        }
      }
    );
    this.subscriptionDatosImputacion$ = this.store.select(getDatosImputacionPresupuestal).subscribe(
      data => {
        if (data !== null) {
          let i = 0;
          while (data.data[i] !== undefined) {
            this.datosTableImputacion.push(data.data[i]);
            i++;
          }
        }
      }
    );
    this.subscriptionDatosMovimiento$ = this.store.select(getDatosMovimientoContable).subscribe(
      data => {
        if (data !== null) {
          let i = 0;
          while (data[i] !== undefined) {
            this.datosTableMovimientoContable.push(data[i]);
            i++;
          }
        }
      }
    );
    this.subscriptionMovimientoContable$ = this.store.select(getMovimientoContable).subscribe(
      data => {
        if (data && data.MovimientoContable) {
          this.movimientoContable = data.MovimientoContable.cuenta;
        }
      }
    );
    this.subscriptionDatosImpuestos$ = this.store.select(getDatosImpuestosYRetenciones).subscribe(
      data => {
        if (data !== null) {
          let i = 0;
          while (data.data[i] !== undefined) {
            this.datosTableImpuestosRetenciones.push(data.data[i]);
            i++;
          }
        }
      }
    );

    this.subImpYRet$ = this.store.select(getImpYRet).subscribe((action) => {
      if (action) {
        this.impYRet = action.ImpYRet;
        action.ImpYRet = null;
      }
    });
    this.handleVigencias();
  }

  handleVigencias() {
    this.susVigencias$ = combineLatest([
      this.store.select(selectVigenciasNoFuturas),
      this.store.select(getAreaFuncional)
    ]).subscribe(([accVigencias, accAreaFuncional]) => {
      if (accVigencias && accVigencias[0] && accAreaFuncional && accAreaFuncional.areaFuncional) {
        const vigenciaActual = accVigencias[0].find(vigencia => vigencia.estado === 'Actual');
        if (vigenciaActual)
          this.vigenciaActual = vigenciaActual.valor;
        this.vigencias = accVigencias[0]
          .filter(vigencia => vigencia.areaFuncional === String(accAreaFuncional.areaFuncional.Id));
      }
    });
  }

  guardar() {
    const elemento = {
      Activo: true,
      AreaFuncional: this.datosBeneficiario.areaFuncional.Id,
      Consecutivo: this.datosBeneficiario.consecutivo,
      SolicitudGiro: String(this.datosBeneficiario.solicitudGiro.NumeroSolicitud),
      Vigencia: this.datosBeneficiario.vigencia.valor,
      DocumentoBeneficiario: String(this.datosBeneficiario.numeroId),
      NombreBeneficiario: this.datosBeneficiario.nombreBeneficiario,
      Compromiso: this.datosCompromiso.compromiso.Id,
      NumeroCompromiso: this.datosCompromiso.numeroCompromiso,
      ActaRecibido: this.datosCompromiso.actaRecibido,
      Supervisor: this.datosCompromiso.supervisor,
      Detalle: this.datosCompromiso.detalle,
      TipoConvenio: this.datosCompromiso.tipoConvenio.tipo_convenio,
      Convenio: this.datosCompromiso.conv.Codigo,
      TipoOrdenPago: this.datosCompromiso.tipoOrdenPago.Id,
      ImputacionPresupuestal: this.datosTableImputacion,
      Concepto: this.impYRet.Codigo,
      ImpuestosRetenciones: this.datosTableImpuestosRetenciones,
      CuentaValorNeto: this.movimientoContable.Codigo,
      MovimientoContable: this.datosTableMovimientoContable,
      Estado: 'Elaborado',
    };
    this.store.dispatch(subirOrdenPago({element: elemento}));
    // if (this.tituloAccion === 'editar') {
    //   elemento.Numero_Solicitud = this.infoSolicitudgiro.numeroSolicitud;
    //   this.store.dispatch(actualizarAutorizacionGiro({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
    // } else if (this.tituloAccion === 'revisar') {
    //   elemento.Numero_Solicitud = this.infoSolicitudgiro.numeroSolicitud;
    //   if (revisar === 'rechazar') this.rechazar(elemento);
    //   else if (revisar === 'aprobar') this.aprobar(elemento);
    // } else {
    //   const consecutivo = {
    //     ContextoId: this.proceso.Id,
    //     Year: new Date().getFullYear(),
    //     Descripcion: 'Solicitud de autorización de giro'
    //   };
    //   this.store.dispatch(crearConsecutivo({element: consecutivo}));
    //   this.subConsecutivo$ = this.store.select(selectConsecutivo).subscribe((accion) => {
    //     if (accion && accion.Consecutivos) {
    //       elemento.Numero_Solicitud = accion.Consecutivos.Consecutivo;
    //       this.store.dispatch(subirAutorizacionGiro({element: elemento}));
    //     }
    //   });
    // }
  }

  totalGasto() {
    return this.gasto = this.datosTableImputacion.reduce((a: any, b: { Valor: number; }) => a + b.Valor, 0);
  }

  totalDescuento() {
    return this.descuento =  this.datosTableImpuestosRetenciones.reduce((a: any, b: { Valor: number; }) => a + b.Valor, 0);
  }

  totalNeto() {
    return this.gasto - this.descuento;
  }

  get vigenciaSeleccionada() {
    if (!!this.datosCompromiso) {
      return this.datosCompromiso.vigencia;
    }
  }
}
