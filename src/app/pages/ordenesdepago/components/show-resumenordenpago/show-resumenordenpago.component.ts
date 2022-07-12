import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_CONTABILIZACION, CONFIGURACION_IMPUNTUACION, CONFIGURACION_IMPUESTOS_RETENCIONES,
} from '../../interfaces/interfaces';
import { getDatosCompromiso, getDatosAlmacenadosCompromiso, getDatosImputacionPresupuestal, getDatosMovimientoContable, getInfoDatosBeneficiario,
  getDatosImpuestosYRetenciones, getImpYRet, getMovimientoContable } from '../../selectors/ordenespago.selectors';
import { Store } from '@ngrx/store';
import { selectVigenciasNoFuturas } from '../../../../shared/selectors/shared.selectors';
import { getAreaFuncional } from '../../selectors/ordenespago.selectors';
import { combineLatest } from 'rxjs';
import { actualizarOrdenPago, subirOrdenPago } from '../../actions/ordenespago.actions';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
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
  flagConvenio: boolean;
  vigencias: any;
  endoso: boolean;
  tituloAccion: string;

  constructor(private fb: FormBuilder,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    ) {
      this.flagConvenio = true;
      this.configTableImpuntuacion = Object.assign({}, CONFIGURACION_IMPUNTUACION);
      this.configTableMovimientoContable = Object.assign({}, CONFIGURACION_CONTABILIZACION);
      this.configTableImpuntuacion.rowActions = null;
      this.configTableMovimientoContable.rowActions = null;
      this.datosTableImputacion = [];
      this.datosTableMovimientoContable = [];
      this.datosTableImpuestosRetenciones = [];
      this.configTableImpuestosRetenciones = Object.assign({}, CONFIGURACION_IMPUESTOS_RETENCIONES);
      this.configTableImpuestosRetenciones.rowActions = null;
      this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
  }

  ngOnDestroy () {
    this.subscriptionDatosBeneficiario$.unsubscribe();
    this.subscriptionDatosAlmacenadosCompromiso$.unsubscribe();
    this.subscriptionDatosCompromiso$.unsubscribe();
    this.subscriptionDatosImputacion$.unsubscribe();
    this.subscriptionDatosMovimiento$.unsubscribe();
    this.susVigencias$.unsubscribe();
    this.subImpYRet$.unsubscribe();
  }

  ngOnInit() {
    this.resumen = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.subscriptionDatosBeneficiario$ = this.store.select(getInfoDatosBeneficiario).subscribe((action) => {
      if (action && action.InfoDatosBeneficiario) {
        this.datosBeneficiario = action.InfoDatosBeneficiario;
        if (this.datosBeneficiario.areaFuncional.Id === 2) this.flagConvenio = true;
        else this.flagConvenio = false;
      }
    });
    this.subscriptionDatosCompromiso$ = this.store.select(getDatosCompromiso).subscribe((action) => {
      if (action && action.DatosCompromiso) {
        this.datosCompromiso = action.DatosCompromiso;
      }
    });
    this.subscriptionDatosAlmacenadosCompromiso$ = this.store.select(getDatosAlmacenadosCompromiso).subscribe(
      data => {
        if (data) {
          this.datosAlmacenadosCompromiso = data;
        }
      }
    );
    this.subscriptionDatosImputacion$ = this.store.select(getDatosImputacionPresupuestal).subscribe(
      data => {
        if (data) {
          this.datosTableImputacion = [];
          data.data.forEach(datos => {
            this.datosTableImputacion.push(datos);
          });
        }
      }
    );
    this.subscriptionDatosMovimiento$ = this.store.select(getDatosMovimientoContable).subscribe(
      data => {
        if (data) {
          this.datosTableMovimientoContable = [];
          data.data.forEach(datos => {
            this.datosTableMovimientoContable.push(datos);
          });
        }
      }
    );
    this.subscriptionMovimientoContable$ = this.store.select(getMovimientoContable).subscribe(
      data => {
        if (data && data.MovimientoContable) {
          this.movimientoContable = data.MovimientoContable;
          this.endoso = this.movimientoContable.endoso;
        }
      }
    );
    this.subscriptionDatosImpuestos$ = this.store.select(getDatosImpuestosYRetenciones).subscribe(
      data => {
        if (data) {
          this.datosTableImpuestosRetenciones = [];
          data.data.forEach(datos => {
            this.datosTableImpuestosRetenciones.push(datos);
          });
        }
      }
    );

    this.subImpYRet$ = this.store.select(getImpYRet).subscribe((action) => {
      if (action) {
        this.impYRet = action.ImpYRet;
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

  guardar(revisar: string) {
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
      TipoConvenio: '',
      Convenio: '',
      TipoOrdenPago: this.datosCompromiso.tipoOrdenPago.Id,
      ImputacionPresupuestal: this.datosTableImputacion,
      Concepto: this.impYRet.Codigo,
      ImpuestosRetenciones: this.datosTableImpuestosRetenciones,
      CuentaValorNeto: this.movimientoContable.cuentaCredito.cuenta.Codigo,
      CuentaValorNetoId: this.movimientoContable.cuentaCredito.cuenta.Id,
      MovimientoContable: this.datosTableMovimientoContable,
      Endoso: this.movimientoContable.endoso,
      BeneficiarioEndoso: String(this.movimientoContable.identificacionEndoso),
      ValorEndoso: this.movimientoContable.valorEndoso,
      CuentaEndoso: this.movimientoContable.cuentaContableEndoso.Codigo,
      CuentaEndosoId: this.movimientoContable.cuentaContableEndoso.Id,
      Estado: this.datosBeneficiario.estado,
      ValorOP: this.totalNeto()
    };
    if (this.datosCompromiso.tipoConvenio) {
      elemento.TipoConvenio = this.datosCompromiso.tipoConvenio.tipo_convenio;
      elemento.Convenio = this.datosCompromiso.conv.Codigo;
    }
    if (this.tituloAccion === 'editar') {
      elemento.Estado = Aprobacion.elaborado;
      this.store.dispatch(actualizarOrdenPago({id: this.activatedRoute.snapshot.url[1].path,
                                              element: elemento, path: this.activatedRoute.snapshot.url[0].path}));
    } else if (this.tituloAccion === 'revisar') {
      if (revisar === 'aprobar') this.aprobar(elemento);
      else if (revisar === 'rechazar') this.rechazar(elemento);
    } else {
      elemento.Estado = Aprobacion.elaborado;
      this.store.dispatch(subirOrdenPago({element: elemento}));
    }
  }

  totalGasto() {
    return this.gasto = this.datosTableImputacion.reduce((a: any, b: { Valor: number; }) => a + b.Valor, 0);
  }

  aprobar(elemento: any) {
    Swal.fire({
      title: this.translate.instant('GLOBAL.aprobar'),
      text: this.translate.instant('ORDEN_PAGO.seguro_aprobacion'),
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d00000',
      confirmButtonColor: 'rgb(243, 161, 9)',
      confirmButtonText: this.translate.instant('GLOBAL.si_aprobar')
    }).then((result) => {
      if (result.value === true) {
        switch (elemento.Estado) {
          case Aprobacion.revCont: {
            elemento.Estado = Aprobacion.revPres;
            break;
          }
          case Aprobacion.revPres: {
            elemento.Estado = Aprobacion.revTes;
            break;
          }
          case Aprobacion.revTes: {
            elemento.Estado = Aprobacion.aprobado;
            break;
          }
          case Aprobacion.aprobado: {
            elemento.Estado = Aprobacion.firmado;
            break;
          }
        }
        this.store.dispatch(actualizarOrdenPago({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
  }

  rechazar(elemento: any) {
    Swal.fire({
      title: this.translate.instant('GLOBAL.rechazar'),
      text: this.translate.instant('ORDEN_PAGO.seguro_rechazo'),
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d00000',
      confirmButtonColor: 'rgb(243, 161, 9)',
      confirmButtonText: this.translate.instant('GLOBAL.si_rechazar')
    }).then((result) => {
      if (result.value === true) {
        elemento.Estado = Aprobacion.rechazado;
        this.store.dispatch(actualizarOrdenPago({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
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

enum Aprobacion {
  elaborado = 'Elaborado',
  revCont = 'Por revisar contabilidad',
  revPres = 'Por revisar presupuesto',
  revTes = 'Por revisar tesorería',
  aprobado = 'Aprobado',
  firmado = 'Firmado',
  rechazado = 'Rechazado'
}
