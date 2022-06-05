import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { getInfoCuentaContable, getInfoCuentaContableDebito, SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { getFilaSeleccionada, getNodoSeleccionadoCuentaContable, seleccionarConcepto, selectInfoCuentaContable, selectInfoCuentaContableDebito, selectOrdenDEvolucionById } from '../../../../shared/selectors/shared.selectors';
import { cargarContabilizacion, cargarDatosContabilizacion } from '../../actions/ordenesdevolucion.actions';
import { CONFIGURACION_CONTABILIZACION, DATOS_CONTABILIZACION } from '../../interfaces/interfaces';
import { selectDatosBeneficiario } from '../../selectors/ordenesdevolucion.selectors';

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
  subConcepto$: any;
  cuentasContablesConcepto: any;
  total: number;
  concepto: any;
  cuentaConceptoFull: boolean;
  subInfoCuentaDebito$: any;
  cuentaDebito: any;
  subInfoCuentaCredito$: any;
  cuentaCredito: any;
  flagCuentaVN: boolean;
  subInfoBeneficiario$: any;
  infoBeneficiario: any;
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
  ) {
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
   }

  ngOnInit() {

    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion && accion.accion.idStep === 3 && accion.accion.name === 'eliminar') {
        this.modalEliminar(accion.fila);
      }
    });

    this.subConcepto$ = this.store.select(seleccionarConcepto).subscribe((action) => {
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

    this.subInfoBeneficiario$ = this.store.select(selectDatosBeneficiario).subscribe(action => {
      if (action) {
        this.infoBeneficiario = action;
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
    contabilizacion.Tercero = this.infoBeneficiario.numeroDocumento;
    contabilizacion.Secuencia = this.secuencia;
    const total = (this.contabilizacionGroup.value.baseRetencion * Number(this.contabilizacionGroup.value.porcentajeRetencion)) / 100;
    if (contabilizacion.Naturaleza === 'credito') {
      contabilizacion.Credito = this.contabilizacionGroup.value.baseRetencion;
      contabilizacion.Debito = 0;
      this.sumaCredito += contabilizacion.Credito;
    } else {
      contabilizacion.Debito = this.contabilizacionGroup.value.baseRetencion;
      contabilizacion.Credito = 0;
      this.sumaDebito += contabilizacion.Debito;
    }
    this.datosContabilizacion.push(contabilizacion);
    this.secuencia += 1;
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
