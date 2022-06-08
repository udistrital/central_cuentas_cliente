import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { getConcepto, GetConceptosContables, getInfoCuentaContable, getInfoCuentaContableDebito,
        SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { getFilaSeleccionada, getNodoSeleccionadoConcepto, getNodoSeleccionadoCuentaContable, seleccionarConcepto,
        selectInfoCuentaContable, selectInfoCuentaContableDebito, selectOrdenDEvolucionById } from '../../../../shared/selectors/shared.selectors';
import { cargarContabilizacion, cargarDatosContabilizacion } from '../../actions/ordenesdevolucion.actions';
import { CONFIGURACION_CONTABILIZACION, DATOS_CONTABILIZACION } from '../../interfaces/interfaces';
import { selectDatosBeneficiario, selectDatosSolicitante } from '../../selectors/ordenesdevolucion.selectors';

@Component({
  selector: 'ngx-set-contabilizacion',
  templateUrl: './set-contabilizacion.component.html',
  styleUrls: ['./set-contabilizacion.component.scss']
})
export class SetContabilizacionComponent implements OnInit {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  contabilizacionGroup: FormGroup;
  datosContabilizacion: any;
  configContabilizacion: any;
  conceptoCuenta: boolean;
  subGetNodoSeleccionadoCuenta$: any;
  cuentaContableSeleccionada: any;
  cuentasContablesConcepto: any;
  subGetNodoSeleccionadoConcepto$: any;
  subConcepto$: any;
  concepto: any;
  total: number;
  cuentaConceptoFull: boolean;
  subInfoCuentaDebito$: any;
  cuentaDebito: any;
  subInfoCuentaCredito$: any;
  cuentaCredito: any;
  flagCuentaVN: boolean;
  subInfoBeneficiario$: any;
  infoBeneficiario: any;
  subInfoSolicitante$: any;
  infoSolicitante: any;
  secuencia: number;
  sumaCredito: number;
  sumaDebito: number;
  subscription: any;
  tituloAccion: string;
  subOrdenDevolucion$: any;
  ordenDevolucion: any;
  flagOD: boolean;
  editable: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.store.dispatch(GetConceptosContables({}));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    this.flagOD = true;
    this.editable = true;
    this.datosContabilizacion = [];
    this.configContabilizacion = CONFIGURACION_CONTABILIZACION;
    this.secuencia = 1;
    this.sumaCredito = 0;
    this.sumaDebito = 0;
    if (this.mostrar(this.tituloAccion)) {
      if (this.edit(this.tituloAccion)) {
        this.editable = false;
        this.configContabilizacion.rowActions = null;
      }
    }
    for (let i = 0; i < this.configContabilizacion.dataConfig.length; i++) {
      this.configContabilizacion.dataConfig[i].title.name = this.translate.instant('ORDEN_DEVOLUCION.' + this.configContabilizacion.dataConfig[i].title.label_i18n);
    }
   }

  ngOnInit() {
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion && accion.accion.idStep === 3 && accion.accion.name === 'eliminar') {
        this.modalEliminar(accion.fila);
      }
    });

    this.subInfoBeneficiario$ = this.store.select(selectDatosBeneficiario).subscribe(action => {
      if (action) {
        this.infoBeneficiario = action;
      }
    });

    this.subInfoSolicitante$ = this.store.select(selectDatosSolicitante).subscribe(action => {
      if (action) {
        this.infoSolicitante = action;
      }
    });

    this.subOrdenDevolucion$ = this.store.select(selectOrdenDEvolucionById).subscribe((action) => {
      if (this.flagOD && action && action.OrdenDevolucionById) {
        this.ordenDevolucion = action.OrdenDevolucionById;
        this.flagOD = false;
        this.ordenDevolucionId();
      }
    });
    this.createForm();
  }

  private mostrar(action: string): boolean {
    const ACCIONES: string[] = ['ver', 'editar', 'revisar'];
    return ACCIONES.some(acc => acc === action);
  }

  private edit(action: string): boolean {
    const ACCIONES_EDICION: string[] = ['ver', 'revisar'];
    return ACCIONES_EDICION.some(acc => acc === action);
  }

  createForm() {
    this.contabilizacionGroup = this.fb.group({
      tipoComprobante: [''],
      numeroComprobante: [''],
      concepto: [''],
      consecutivo: [''],
      cuentaConcepto: [false],
      codigoContable: [''],
      cuentaContableMovCont: [''],
      cuentaContableMovCont1: [''],
      porcentajeRetencion: [''],
      baseRetencion: [''],
      sumaDebito: [0],
      sumaCredito: [0],
      cuentas: []
    });
  }

  agregarConcepto() {
    if (this.subGetNodoSeleccionadoConcepto$) this.subGetNodoSeleccionadoConcepto$.unsubscribe();
    this.subGetNodoSeleccionadoConcepto$ = this.store.select(getNodoSeleccionadoConcepto).subscribe((nodoConcepto) => {
      if (nodoConcepto && Object.keys(nodoConcepto)[0] !== 'type') {
        this.store.dispatch(getConcepto ({codigo: nodoConcepto.Codigo}));
        if (this.subConcepto$) {
          this.subConcepto$.unsubscribe();
          this.concepto = null;
        }
        this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
          if (concepto && concepto.Concepto) {
            this.concepto = concepto.Concepto;
            concepto.Concepto = null;
            this.store.dispatch(getInfoCuentaContableDebito({codigo: this.concepto.CuentasDebito[0]}));
            this.store.dispatch(getInfoCuentaContable({codigo: this.concepto.CuentasCredito[0]}));
            this.contabilizacionGroup.patchValue({
              concepto: this.concepto
            });
            this.agregarContabilizacion();
          }
        });
      }
    });
  }

  agregarContabilizacion() {
    this.datosContabilizacion = [];
    const contabilizacionCredito = Object.assign({}, DATOS_CONTABILIZACION[0]);
    const contabilizacionDebito = Object.assign({}, DATOS_CONTABILIZACION[0]);

    this.subInfoCuentaDebito$ = this.store.select(selectInfoCuentaContableDebito).subscribe((accion1) => {
      if (accion1 && accion1.InfoCuentaContableDebito) {
        this.cuentaDebito = accion1.InfoCuentaContableDebito;
        accion1.InfoCuentaContableDebito = null;
        contabilizacionDebito.Tecero = this.infoBeneficiario.numeroDocumento;
        contabilizacionDebito.Codigo = this.concepto.CuentasDebito[0];
        contabilizacionDebito.Nombre = this.cuentaDebito.Nombre;
        contabilizacionDebito.Debito = this.infoSolicitante.valorDevolucion;
        contabilizacionDebito.Credito = 0;
        contabilizacionDebito.Secuencia = this.secuencia;
        this.secuencia += 1;
        this.datosContabilizacion.push(contabilizacionDebito);
        this.sumaDebito = this.infoSolicitante.valorDevolucion;
      }
    });

    this.subInfoCuentaCredito$ = this.store.select(selectInfoCuentaContable).subscribe((accion1) => {
      if (accion1 && accion1.InfoCuentaContable) {
        this.cuentaCredito = accion1.InfoCuentaContable;
        accion1.InfoCuentaContable = null;
        contabilizacionCredito.Tecero = this.infoBeneficiario.numeroDocumento;
        contabilizacionCredito.Codigo = this.concepto.CuentasCredito[0];
        contabilizacionCredito.Nombre = this.cuentaCredito.Nombre;
        contabilizacionCredito.Credito = this.infoSolicitante.valorDevolucion;
        contabilizacionCredito.Debito = 0;
        contabilizacionCredito.Secuencia = this.secuencia;
        this.secuencia += 1;
        this.datosContabilizacion.push(contabilizacionCredito);
        this.sumaCredito = this.infoSolicitante.valorDevolucion;
      }
    });
  }

  saveForm() {
    if ( this.contabilizacionGroup.invalid ) {
      return Object.values( this.contabilizacionGroup.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
    this.store.dispatch(cargarDatosContabilizacion({data: this.datosContabilizacion}));
    this.store.dispatch(cargarContabilizacion({Contabilizacion: this.contabilizacionGroup.value}));
  }

  conceptoCuentaContable() {
    this.conceptoCuenta = this.contabilizacionGroup.value.cuentaConcepto;
  }

  SeleccionarCuentaContable(cuentaContable: any) {
    this.store.dispatch(SeleccionarCuentaContable(cuentaContable));
  }

  agregarCuentaContable() {
    this.subGetNodoSeleccionadoCuenta$ = this.store.select(getNodoSeleccionadoCuentaContable).subscribe((nodoCuenta: any) => {
      if (nodoCuenta) {
        if (Object.keys(nodoCuenta)[0] !== 'type') {
          if (nodoCuenta && !nodoCuenta.children) {
            this.SeleccionarCuentaContable(nodoCuenta);
            this.cuentaContableSeleccionada = nodoCuenta;
            this.contabilizacionGroup.patchValue({
              cuentaContableMovCont: this.cuentaContableSeleccionada.data.Codigo + ' - ' + this.cuentaContableSeleccionada.data.Nombre
            });
          }
        }
      }
    });
    this.subGetNodoSeleccionadoCuenta$.unsubscribe();
  }

  ordenDevolucionId() {
    if (this.mostrar(this.tituloAccion) && this.contabilizacionGroup) {
      this.contabilizacionGroup.patchValue({
        tipoComprobante: this.ordenDevolucion.TipoComprobante,
        numeroComprobante: this.ordenDevolucion.NumeroComprobante,
        consecutivo: this.ordenDevolucion.Consecutivo,
      });
    }
    this.datosContabilizacion = this.ordenDevolucion.MovimientoContable;
    this.datosContabilizacion.forEach(element => {
      this.sumaCredito += element.Credito;
      this.sumaDebito += element.Debito;
    });
    this.store.dispatch(getConcepto({codigo: this.ordenDevolucion.Concepto}));
      this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((concepto) => {
      if (concepto && concepto.Concepto) {
        this.concepto = concepto.Concepto;
        this.contabilizacionGroup.patchValue({
          concepto: concepto.Concepto
        });
        concepto.Concepto = null;
      }
    });
  }

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosContabilizacion.splice(this.datosContabilizacion.findIndex(
          (element: any) => element.Codigo === fila.Codigo
            && element.Naturaleza === fila.Naturaleza
            && element.Debito === fila.Debito
            && element.Credito === fila.Credito
        ), 1);
        this.sumaCredito = 0;
        this.sumaDebito = 0;
        this.datosContabilizacion.forEach(element => {
          if (element.Naturaleza === 'debito') this.sumaDebito += element.Debito;
          else this.sumaCredito += element.Credito;
        });
      }
    });
  }
}
