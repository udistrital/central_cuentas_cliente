import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { crearConsecutivo, getProcesoConfiguracion } from '../../../../shared/actions/shared.actions';
import { selectConsecutivo, selectProcesoConfiguracion } from '../../../../shared/selectors/shared.selectors';
import { actualizarOrdenDevolucion, crearOrdenDevolucion } from '../../actions/ordenesdevolucion.actions';
import { CONFIGURACION_CONTABILIZACION, CONFIGURACION_DOCUMENTOS } from '../../interfaces/interfaces';
import { selectContabilizacion, selectDatosBeneficiario, selectDatosContabilizacion, selectDatosSolicitante, selectDocumentosBeneficiario } from '../../selectors/ordenesdevolucion.selectors';

@Component({
  selector: 'ngx-show-resumenordendevolucion',
  templateUrl: './show-resumenordendevolucion.component.html',
  styleUrls: ['./show-resumenordendevolucion.component.scss']
})
export class ShowResumenordendevolucionComponent implements OnInit, OnDestroy {

  subDatosSolicitante$: any;
  datosSolicitante: any;
  subDatosBeneficiario$: any;
  datosBeneficiario: any;
  subDocumentosBeneficiario$: any;
  documentosBeneficiario: any;
  configDocumentos: any;
  subContabilizacion$: any;
  contabilizacion: any;
  subDatosContablizacion$: any;
  configContabilizacion: any;
  datosCont: any;
  tituloAccion: string;
  subProceso$: any;
  proceso: any;
  subConsecutivo$: any;

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.configDocumentos = Object.assign({}, CONFIGURACION_DOCUMENTOS);
    this.configContabilizacion = Object.assign({}, CONFIGURACION_CONTABILIZACION);
    this.configContabilizacion.rowActions = null;
    this.documentosBeneficiario = [];
    this.datosCont = [];
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.store.dispatch(getProcesoConfiguracion({query: {Sigla: 'OD'}}));
   }
  ngOnDestroy() {
    if (this.subDatosSolicitante$) this.subDatosSolicitante$.unsubscribe();
    if (this.subDatosBeneficiario$) this.subDatosBeneficiario$.unsubscribe();
    if (this.subDocumentosBeneficiario$) this.subDocumentosBeneficiario$.unsubscribe();
  }

  ngOnInit() {

    this.subDatosSolicitante$ = this.store.select(selectDatosSolicitante).subscribe(action => {
      if (action) {
        this.datosSolicitante = action;
      }
    });

    this.subDatosBeneficiario$ = this.store.select(selectDatosBeneficiario).subscribe(action => {
      if (action) {
        this.datosBeneficiario = action;
      }
    });

    this.subDocumentosBeneficiario$ = this.store.select(selectDocumentosBeneficiario).subscribe(action => {
      if (action && action.data) {
          this.documentosBeneficiario = action.data;
          this.configDocumentos.rowActions.actions[0].ngIf = false;
      }
    });

    this.subContabilizacion$ = this.store.select(selectContabilizacion).subscribe(action => {
      if (action && action.Contabilizacion) {
        this.contabilizacion = action.Contabilizacion;
      }
    });

    this.subDatosContablizacion$ = this.store.select(selectDatosContabilizacion).subscribe(action => {
      if (action && action.data) {
        this.datosCont = action.data;
      }
    });

    this.subProceso$ = this.store.select(selectProcesoConfiguracion).subscribe((action) => {
      if (action && action.Proceso) {
        this.proceso = action.Proceso[0];
      }
    });
  }

  guardar(revisar: string) {
    const elemento = {
      Activo: true,
      AreaFuncional: this.datosSolicitante.areaFuncional.Id,
      Consecutivo: this.contabilizacion.consecutivo,
      TipoDocumentoSolicitante: this.datosSolicitante.tipoDocumento.Id,
      NumeroDocumentoSolicitante: this.datosSolicitante.numeroDocumento,
      FechaRequerimiento: this.datosSolicitante.fechaRequerimiento,
      NombreSolicitante: this.datosSolicitante.nombre,
      Cargo: this.datosSolicitante.cargo,
      NumeroRequerimiento: this.datosSolicitante.numeroRequerimiento,
      Concepto: this.contabilizacion.concepto.Codigo,
      RazonDevolucion: this.datosSolicitante.razonDevolucion.Id,
      ValorDevolucion: this.datosSolicitante.valorDevolucion,
      TipoDocumentoBeneficiario: this.datosBeneficiario.tipoDocumento.Id,
      NumeroDocumentoBeneficiario: this.datosBeneficiario.numeroDocumento,
      NombreBeneficiario: this.datosBeneficiario.nombreBeneficiario,
      Banco: this.datosBeneficiario.banco.Id,
      TipoCuenta: this.datosBeneficiario.tipoCuenta.Id,
      NumeroCuenta: this.datosBeneficiario.numeroCuenta,
      FormaPago: this.datosBeneficiario.formaPago.Id,
      DocumentosBeneficiario: this.documentosBeneficiario,
      TipoComprobante: this.contabilizacion.tipoComprobante,
      NumeroComprobante: this.contabilizacion.numeroComprobante,
      MovimientoContable: this.datosCont,
      Estado: this.datosSolicitante.estado,
    };
    if (this.tituloAccion === 'editar') {
      elemento.Estado = Aprobacion.elaborado;
      this.store.dispatch(actualizarOrdenDevolucion({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
    } else if (this.tituloAccion === 'revisar') {
      if (revisar === 'aprobar') this.aprobar(elemento);
      else if (revisar === 'rechazar') this.rechazar(elemento);
    } else {
      const consecutivo = {
        ContextoId: this.proceso.Id,
        Year: new Date().getFullYear(),
        Descripcion: 'Orden Devolucion'
      };
      this.store.dispatch(crearConsecutivo({element: consecutivo}));
      this.subConsecutivo$ = this.store.select(selectConsecutivo).subscribe((accion) => {
        if (accion && accion.Consecutivos) {
          elemento.Consecutivo = accion.Consecutivos.Consecutivo;
          elemento.Estado = Aprobacion.elaborado;
          this.store.dispatch(crearOrdenDevolucion({element: elemento}));
        }
      });
    }
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
            elemento.Estado = Aprobacion.aprobado;
            break;
          }
          case Aprobacion.aprobado: {
            elemento.Estado = Aprobacion.firmado;
            break;
          }
        }
        this.store.dispatch(actualizarOrdenDevolucion({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
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
        this.store.dispatch(actualizarOrdenDevolucion({id: this.activatedRoute.snapshot.url[1].path, element: elemento}));
      }
    });
  }
}

enum Aprobacion {
  elaborado = 'Elaborado',
  revCont = 'Por revisar contabilidad',
  revPres = 'Por revisar presupuesto',
  aprobado = 'Aprobado',
  firmado = 'Firmado',
  rechazado = 'Rechazado'
}
