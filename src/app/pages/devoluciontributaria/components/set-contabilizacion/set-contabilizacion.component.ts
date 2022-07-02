import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CONFIGURACION_CONTABILIZACION, DATOS_CONTABILIZACION } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada, getNodoSeleccionadoCuentaContable, selectComprobantes, selectDevolucionTributariaById, selectInfoCuentaContable,
        selectInfoCuentaContableDebito, selectTiposComprobante} from '../../../../shared/selectors/shared.selectors';
import { getComprobante, getInfoCuentaContable, getInfoCuentaContableDebito, getTipoComprobante, SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { getConcepto, getInfoDevolucionTributaria } from '../../selectors/devoluciontributaria.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cargarContabilizacion, cargarDatosContabilizacion } from '../../actions/devoluciontributaria.actions';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-set-contabilizacion',
  templateUrl: './set-contabilizacion.component.html',
  styleUrls: ['./set-contabilizacion.component.scss']
})
export class SetContabilizacionComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  configContabilizacion: any;
  datosContabilizacion: any;
  contabilizacionGroup: FormGroup;
  Subtotal: any;
  totalGasto: number;
  conceptoCuenta: boolean;
  subscription: any;
  subGetNodoSeleccionadoCuenta$: any;
  cuentaContableSeleccionada: any;
  subConcepto$: any;
  cuentasContablesConcepto: any;
  total: number = 0;
  concepto: any;
  cuentaConceptoFull: boolean;
  subInfoCuentaDebito$: any;
  cuentaDebito: any;
  flagCuentaVN: boolean = true;
  subInfoCuentaCredito$: any;
  cuentaCredito: any;
  sumaCredito: number;
  sumaDebito: number;
  subscriptionInfoDevolucionTributaria$: any;
  infoDevolucionTributaria: any;
  secuencia: number;
  tituloAccion: any;
  subDevolucionTributaria$: any;
  devolucionesTributaria: any;
  subTiposComprobante$: any;
  tiposComprobante: any;
  subComprobantes$: any;
  comprobantes: any;
  comprobantesAux: any;
  flagDT: boolean;
  editable: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private modalService: NgbModal,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
  ) {
      // Datos de ejemplo q se muestran en la tabla
      this.editable = true;
      this.flagDT = true;
      this.secuencia = 1;
      this.datosContabilizacion = [];
      this.configContabilizacion = CONFIGURACION_CONTABILIZACION;
      this.createForm();
      this.totalGasto = 0.00;
      this.sumaCredito = 0;
      this.sumaDebito = 0;
      this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
      if (this.mostrar(this.tituloAccion)) {
        if (this.edit(this.tituloAccion)) {
          this.editable = false;
          this.configContabilizacion.rowActions = null;
        }
      }
      for (let i = 0; i < this.configContabilizacion.dataConfig.length; i++) {
        this.configContabilizacion.dataConfig[i].title.name = this.translate
        .instant('DEVOL_TRIBUTARIA.' + this.configContabilizacion.dataConfig[i].title.label_i18n);
      }
      this.store.dispatch(getTipoComprobante({}));
      this.store.dispatch(getComprobante({}));
    }

  private mostrar(action: string): boolean {
    const ACCIONES: string[] = ['ver', 'editar', 'revisar'];
    return ACCIONES.some(acc => acc === action);
  }

  private edit(action: string): boolean {
    const ACCIONES_EDICION: string[] = ['ver', 'revisar'];
    return ACCIONES_EDICION.some(acc => acc === action);
  }

  ngOnDestroy(): void {
    this.subConcepto$.unsubscribe();
    if (this.subInfoCuentaCredito$) this.subInfoCuentaCredito$.unsubscribe();
    if (this.subInfoCuentaDebito$)this.subInfoCuentaDebito$.unsubscribe();
    this.cuentasContablesConcepto = [];
    this.cuentaConceptoFull = true;
    this.subscription.unsubscribe();
    this.subTiposComprobante$.unsubscribe();
    this.subComprobantes$.unsubscribe();
  }

  ngOnInit() {
    if (this.configContabilizacion.endSubtotal) {
      if (!this.configContabilizacion.endSubtotal.last.name) {
        const arraySubtotal: any[] = [];
        this.datosContabilizacion.forEach((element: any) => {
          arraySubtotal.push(parseFloat(element[this.datosContabilizacion.endSubtotal.property]));
        });
        this.Subtotal = arraySubtotal.reduce((accumulator, currentValue) => accumulator + currentValue);
      }
    }
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion && accion.accion.idStep === 3 && accion.accion.name === 'eliminar') {
        this.modalEliminar(accion.fila);
      }
    });

    this.subTiposComprobante$ = this.store.select(selectTiposComprobante).subscribe(action => {
      if (action && action.TiposComprobante) {
        this.tiposComprobante = action.TiposComprobante;
      }
    });
    this.subComprobantes$ = this.store.select(selectComprobantes).subscribe(action => {
      if (action && action.Comprobantes) {
        this.comprobantes = action.Comprobantes;
      }
    });

    this.subConcepto$ = this.store.select(getConcepto).subscribe((action) => {
      this.cuentasContablesConcepto = [];
      this.total = 0;
      if (action && action.Concepto) {
        this.concepto = action.Concepto;
        this.cuentaConceptoFull = false;
        if (this.concepto.conceptoContable !== '') {
          this.total = this.concepto.CuentasDebito.length + this.concepto.CuentasCredito.length;
          this.concepto.CuentasDebito.forEach(CuentaDebito => {
            this.store.dispatch(getInfoCuentaContableDebito({codigo: CuentaDebito}));
            this.subInfoCuentaDebito$ = this.store.select(selectInfoCuentaContableDebito).subscribe((accion1) => {
              if (accion1 && accion1.InfoCuentaContableDebito) {
                this.cuentaDebito = accion1.InfoCuentaContableDebito;
                accion1.InfoCuentaContableDebito = null;
                if (this.cuentasContablesConcepto.length < this.total) {
                  this.cuentasContablesConcepto.push({cuenta: this.cuentaDebito});
                  if (this.cuentasContablesConcepto.length === this.total) this.cuentaConceptoFull = true;
                  this.flagCuentaVN = false;
                }
              }
            });
          });
          this.concepto.CuentasCredito.forEach(CuentaCredito => {
            this.store.dispatch(getInfoCuentaContable({codigo: CuentaCredito}));
            this.subInfoCuentaCredito$ = this.store.select(selectInfoCuentaContable).subscribe((accion) => {
              if (accion && accion.InfoCuentaContable) {
                this.cuentaCredito = accion.InfoCuentaContable;
                accion.InfoCuentaContable = null;
                if (this.cuentasContablesConcepto.length < this.total) {
                  this.cuentasContablesConcepto.push({cuenta: this.cuentaCredito});
                  if (this.cuentasContablesConcepto.length === this.total) this.cuentaConceptoFull = true;
                  this.flagCuentaVN = false;
                }
              }
            });
          });
        }
      }
    });

    this.subscriptionInfoDevolucionTributaria$ = this.store
    .select(getInfoDevolucionTributaria).subscribe((action) => {
      if (action && action.InfoDevolucionTributaria) {
        this.infoDevolucionTributaria = action.InfoDevolucionTributaria;
      }
    });

    this.subDevolucionTributaria$ = this.store.select(selectDevolucionTributariaById).subscribe((action) => {
      if (this.flagDT && action && action.DevolucionTributariaById) {
        this.devolucionesTributaria = action.DevolucionTributariaById;
        this.flagDT = false;
        this.devolucionTributaria();
      }
    });
  }

  numerosComprobante() {
    this.comprobantesAux = [];
    this.comprobantes.forEach(element => {
      if (element.TipoComprobante.TipoDocumento === this.contabilizacionGroup.value.tipoComprobante.TipoDocumento) {
        this.comprobantesAux.push(element);
      }
    });
  }

  // Validacion del Formulario
  get bancoInvalid() {
    return this.contabilizacionGroup.get('banco').invalid && this.contabilizacionGroup.get('banco').touched;
  }
  get valorInvalid() {
    return this.contabilizacionGroup.get('valor').invalid && this.contabilizacionGroup.get('valor').touched;
  }
  get sumasIgualesInvalid() {
    return this.contabilizacionGroup.get('cuentas').invalid && this.contabilizacionGroup.get('cuentas').touched;
  }

  createForm() {
    this.contabilizacionGroup = this.fb.group({
      tipoComprobante: ['', Validators.required],
      numeroComprobante: ['', Validators.required],
      consecutivo: [''],
      cuentaConcepto: [false],
      codigoContable: [''],
      cuentaContableMovCont: [''],
      cuentaContableMovCont1: [''],
      porcentajeRetencion: [''],
      baseRetencion: [''],
      sumaDebito: [0],
      sumaCredito: [0],
      cuentas: ['', Validators.required],
    });
  }

  agregarContabilizacion() {
    const contabilizacion = Object.assign({}, DATOS_CONTABILIZACION[0]);
    if (this.contabilizacionGroup.value.cuentaConcepto) {
      contabilizacion.Codigo = this.contabilizacionGroup.value.cuentaContableMovCont1.cuenta.Codigo + ' - '
      + this.contabilizacionGroup.value.cuentaContableMovCont1.cuenta.Nombre;
      contabilizacion.Naturaleza = this.contabilizacionGroup.value.cuentaContableMovCont1.cuenta.NaturalezaCuentaID;
    } else {
      contabilizacion.Codigo = this.contabilizacionGroup.value.cuentaContableMovCont;
      contabilizacion.Naturaleza = this.cuentaContableSeleccionada.data.NaturalezaCuentaID;
    }
    contabilizacion.PorcentajeRetencion = this.contabilizacionGroup.value.porcentajeRetencion;
    contabilizacion.BaseRetencion = this.contabilizacionGroup.value.baseRetencion;
    contabilizacion.Tercero = this.infoDevolucionTributaria.numeroId;
    contabilizacion.Secuencia = this.secuencia;
    const total = (this.contabilizacionGroup.value.baseRetencion * Number(this.contabilizacionGroup.value.porcentajeRetencion)) / 100;
    if (contabilizacion.Naturaleza === 'credito') {
      contabilizacion.Credito = total;
      this.sumaCredito += contabilizacion.Credito;
    } else {
      contabilizacion.Debito = total;
      this.sumaDebito += contabilizacion.Debito;
    }
    this.sumasIguales();
    this.datosContabilizacion.push(contabilizacion);
    this.secuencia += 1;
  }

  sumasIguales() {
    if (this.sumaCredito === this.sumaDebito && this.sumaCredito > 0) {
      this.contabilizacionGroup.patchValue({
        cuentas: 'a'
      });
    } else {
      this.contabilizacionGroup.patchValue({
        cuentas: ''
      });
    }
  }

  conceptoCuentaContable() {
    this.conceptoCuenta = this.contabilizacionGroup.value.cuentaConcepto;
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

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosContabilizacion.splice(this.datosContabilizacion.findIndex(
          (element: any) => element.Codigo === fila.Codigo
            && element.PorcentajeRetencion === fila.PorcentajeRetencion
            && element.BaseRetencion === fila.BaseRetencion
            && element.Naturaleza === fila.Naturaleza
        ), 1);
        this.sumaCredito = 0;
        this.sumaDebito = 0;
        this.datosContabilizacion.forEach(element => {
          if (element.Naturaleza === 'debito') this.sumaDebito += element.Debito;
          else this.sumaCredito += element.Credito;
          this.sumasIguales();
        });
      }
    });
  }

  devolucionTributaria() {
    if (this.mostrar(this.tituloAccion) && this.contabilizacionGroup) {
      this.contabilizacionGroup.patchValue({
        tipoComprobante: this.devolucionesTributaria.TipoComprobante,
        numeroComprobante: this.devolucionesTributaria.NumeroComprobante,
        consecutivo: this.devolucionesTributaria.Consecutivo,
      });
    }
    this.datosContabilizacion = this.devolucionesTributaria.MovimientoContable;
    this.datosContabilizacion.forEach(element => {
      this.sumaCredito += element.Credito;
      this.sumaDebito += element.Debito;
    });
  }

  get tipoComprobanteInvalid() {
    return this.contabilizacionGroup.get('tipoComprobante').invalid && this.contabilizacionGroup.get('tipoComprobante').touched;
  }
  get numeroComprobanteInvalid() {
    return this.contabilizacionGroup.get('numeroComprobante').invalid && this.contabilizacionGroup.get('numeroComprobante').touched;
  }

}
