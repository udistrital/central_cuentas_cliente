import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CONFIGURACION_CONTABILIZACION, DATOS_CONTABILIZACION } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada, getNodoSeleccionadoConcepto, getNodoSeleccionadoCuentaContable, seleccionarConcepto, selectInfoCuentaContable, selectInfoCuentaContableDebito } from '../../../../shared/selectors/shared.selectors';
import { getInfoCuentaContable, getInfoCuentaContableDebito, SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { getConcepto } from '../../selectors/devoluciontributaria.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cargarContabilizacion, cargarDatosContabilizacion } from '../../actions/devoluciontributaria.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-set-contabilizacion',
  templateUrl: './set-contabilizacion.component.html',
  styleUrls: ['./set-contabilizacion.component.scss']
})
export class SetContabilizacionComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private modalService: NgbModal,
    private translate: TranslateService
     ) {
        // Datos de ejemplo q se muestran en la tabla
        this.datosContabilizacion = [];
        this.configContabilizacion = CONFIGURACION_CONTABILIZACION;
        this.createForm();
        this.totalGasto = 0.00;
        this.sumaCredito = 0;
        this.sumaDebito = 0;
        for (let i = 0; i < this.configContabilizacion.dataConfig.length; i++) {
          this.configContabilizacion.dataConfig[i].title.name = this.translate.instant('DEVOL_TRIBUTARIA.' + this.configContabilizacion.dataConfig[i].title.label_i18n);
        }
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
  }


  // Validacion del Formulario
  get bancoInvalid() {
    return this.contabilizacionGroup.get('banco').invalid && this.contabilizacionGroup.get('banco').touched;
  }
  get valorInvalid() {
    return this.contabilizacionGroup.get('valor').invalid && this.contabilizacionGroup.get('valor').touched;
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
      cuentas: []
    });
  }

  agregarContabilizacion() {
    const contabilizacion = Object.assign({}, DATOS_CONTABILIZACION[0]);
    if (this.contabilizacionGroup.value.cuentaConcepto) {
      contabilizacion.codigoContable = this.contabilizacionGroup.value.cuentaContableMovCont1.cuenta.Codigo + ' - '
      + this.contabilizacionGroup.value.cuentaContableMovCont1.cuenta.Nombre;
      contabilizacion.naturaleza = this.contabilizacionGroup.value.cuentaContableMovCont1.cuenta.NaturalezaCuentaID;
    } else {
      contabilizacion.codigoContable = this.contabilizacionGroup.value.cuentaContableMovCont;
      contabilizacion.naturaleza = this.cuentaContableSeleccionada.data.NaturalezaCuentaID;
    }
    contabilizacion.porcentaje = this.contabilizacionGroup.value.porcentajeRetencion;
    contabilizacion.baseRetencion = this.contabilizacionGroup.value.baseRetencion;
    const total = (this.contabilizacionGroup.value.baseRetencion * Number(this.contabilizacionGroup.value.porcentajeRetencion)) / 100;
    if (contabilizacion.naturaleza === 'credito') {
      contabilizacion.credito = total;
      this.sumaCredito += contabilizacion.credito;
    } else {
      contabilizacion.debito = total;
      this.sumaDebito += contabilizacion.debito;
    }
    this.datosContabilizacion.push(contabilizacion);
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
          (element: any) => element.codigoContable === fila.codigoContable
            && element.porcentaje === fila.porcentaje
            && element.baseRetencion === fila.baseRetencion
            && element.naturaleza === fila.naturaleza
        ), 1);
        this.sumaCredito = 0;
        this.sumaDebito = 0;
        this.datosContabilizacion.forEach(element => {
          if (element.naturaleza === 'debito') this.sumaDebito += element.debito;
          else this.sumaCredito += element.credito;
        });
      }
    });
  }

  get tipoComprobanteInvalid() {
    return this.contabilizacionGroup.get('tipoComprobante').invalid && this.contabilizacionGroup.get('tipoComprobante').touched;
  }
  get numeroComprobanteInvalid() {
    return this.contabilizacionGroup.get('numeroComprobante').invalid && this.contabilizacionGroup.get('numeroComprobante').touched;
  }

}
