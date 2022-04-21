import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CONFIGURACION_MOVIMIENTO_CONTABLE, DATOS_MOVIMIENTO_CONTABLE
} from '../../interfaces/interfaces';
import { ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFilaSeleccionada, getConceptosContables, getNodoSeleccionadoCuentaContable, selectInfoCuentaContable, selectInfoCuentaContableDebito, selectOrdenesPagoById,
          selectBeneficiarioEndoso, selectInfoCuentaContableEndoso } from '../../../../shared/selectors/shared.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getBeneficiarioEndoso, GetConceptosContables, getInfoCuentaContable, getInfoCuentaContableDebito, getInfoCuentaContableEndoso, LoadFilaSeleccionada,
          SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { cargarDatosMovimientoContable, cargarMovimientoContable } from '../../actions/ordenespago.actions';
import { getDatosImpuestosYRetenciones, getDatosImputacionPresupuestal, getImpYRet } from '../../selectors/ordenespago.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-set-movimientocontable',
  templateUrl: './set-movimientocontable.component.html',
  styleUrls: ['./set-movimientocontable.component.scss']
})
export class SetMovimientocontableComponent implements OnInit, OnDestroy {
  @ViewChild('eliminarModal', { static: false }) eliminarModal: ElementRef;
  movimientoContable: FormGroup;
  agregarMovimientoContable: FormGroup;
  configTableMovimientoContable: any;
  datosTableMovimientoContable: any;
  conceptosContables: any;
  subscription: any;
  subscriptionConceptos: any;
  endoso: boolean;
  subGetNodoSeleccionadoCuenta$: any;
  cuentaContableSeleccionada: any;
  cuentaContableSeleccionada1: any;
  conceptoCuenta: boolean;
  subscriptionDatosImpuestosYRetenciones$: any;
  datosImpYReten: any;
  subscriptionDatosImputacionPresupuestal$: any;
  datosImputacionPresupuestal: any;
  subImpYRet$: any;
  impYRet: any;
  subInfoCuentaCredito$: any;
  cuentaCredito: any;
  subInfoCuentaDebito$: any;
  cuentaDebito: any;
  subInfoCuentaEndoso$: any;
  cuentaEndoso: any;
  cuentasContablesConcepto: Array<any> = [];
  opcionesAreaFuncional: Array<any> = [];
  valorDescuento: any;
  valorImputacion: any;
  valorNeto: any;
  cuentaConceptoFull: boolean;
  subscriptionCambios$: any;
  tituloAccion: string;
  subOrdenesPago$: any;
  ordenPago: any;
  editable: boolean = true;
  subscriptionfilter$: any;
  subBenefEndoso$: any;
  datosBenefEndoso: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    ) {
    this.configTableMovimientoContable = CONFIGURACION_MOVIMIENTO_CONTABLE;
    this.datosTableMovimientoContable = [];
    this.store.dispatch(GetConceptosContables({ id: '' }));
    this.tituloAccion = this.activatedRoute.snapshot.url[0].path;
    if (this.tituloAccion === 'ver') {
      this.editable = false;
      this.configTableMovimientoContable.rowActions.actions[0].ngIf = false;
    }
  }

  async ngOnInit() {
    // Form
    this.movimientoContable = this.fb.group({
      cuentaContable: [''],
      endoso: [false],
      cuentaContableMovCont: [''],
      cuentaContableMovCont1: [''],
      cuentaConcepto: [false],
      nombreMovimientoContable: ['Valor Bruto'],
      valorMovimientoContable: [''],
      cuentaCredito: [''],
      identificacionEndoso: [''],
      beneficiarioEndoso: [''],
      bancoEndoso: [''],
      tipoCuentaEndoso: [''],
      numeroCuentaEndoso: [''],
      valorEndoso: [''],
      cuentaContableEndoso: ['']
    });
    // Conceptos contables
    this.subscriptionConceptos = this.store.select(getConceptosContables).subscribe((conceptos) => {
      this.conceptosContables = conceptos[0];
    });
    // Fila seleccionada
    this.subscription = this.store.select(getFilaSeleccionada).subscribe((accion) => {
      if (accion && accion.accion) {
        if (accion.accion.idStep === 4 && accion.accion.name === 'modificar') {
          this.modalEliminar(accion.fila);
        }
      }
    });

    this.subscriptionDatosImpuestosYRetenciones$ = this.store.select(getDatosImpuestosYRetenciones).subscribe((action) => {
      if (action && action.data) {
        this.valorDescuento = 0;
        this.datosImpYReten = action.data;
        action = null;
        this.datosImpYReten.forEach(retencion => {
          this.valorDescuento += retencion.Valor;
        });
        this.valorNeto = this.valorImputacion - this.valorDescuento;
        this.movimientoContable.patchValue({
          valorMovimientoContable: this.valorImputacion
        });
      }
    });

    this.subscriptionDatosImputacionPresupuestal$ = this.store.select(getDatosImputacionPresupuestal).subscribe((action) => {
      if (action && action.data) {
        this.valorImputacion = 0;
        this.datosImputacionPresupuestal = action.data;
        action = null;
        this.datosImputacionPresupuestal.forEach(imputacion => {
          this.valorImputacion += imputacion.Valor;
        });
      }
    });

    this.subImpYRet$ = this.store.select(getImpYRet).subscribe((action) => {
      this.cuentasContablesConcepto = [];
      if (action && action.ImpYRet) {
        this.impYRet = action.ImpYRet;
        this.cuentaConceptoFull = false;
        if (this.impYRet.conceptoContable !== '') {
          const total = this.impYRet.CuentasDebito.length + this.impYRet.CuentasCredito.length;
          this.impYRet.CuentasDebito.forEach(CuentaDebito => {
            this.store.dispatch(getInfoCuentaContableDebito({codigo: CuentaDebito}));
            this.subInfoCuentaDebito$ = this.store.select(selectInfoCuentaContableDebito).subscribe((accion1) => {
              if (accion1 && accion1.InfoCuentaContableDebito) {
                this.cuentaDebito = accion1.InfoCuentaContableDebito;
                accion1.InfoCuentaContableDebito = null;
                this.cuentasContablesConcepto.push({cuenta: this.cuentaDebito});
                if (this.cuentasContablesConcepto.length === total) {
                  this.cuentaConceptoFull = true;
                  if (this.tituloAccion === 'ver') {
                    this.movimientoContable.patchValue({
                      cuentaCredito: (this.cuentasContablesConcepto.find((e: any) => e.cuenta.Codigo === this.ordenPago.CuentaValorNeto)),
                    });
                  }
                }
              }
            });
          });
          this.impYRet.CuentasCredito.forEach(CuentaCredito => {
            this.store.dispatch(getInfoCuentaContable({codigo: CuentaCredito}));
            this.subInfoCuentaCredito$ = this.store.select(selectInfoCuentaContable).subscribe((accion) => {
              if (accion && accion.InfoCuentaContable) {
                this.cuentaCredito = accion.InfoCuentaContable;
                accion.InfoCuentaContable = null;
                this.cuentasContablesConcepto.push({cuenta: this.cuentaCredito});
                if (this.cuentasContablesConcepto.length === total) {
                  this.cuentaConceptoFull = true;
                  if (this.tituloAccion === 'ver') {
                    this.movimientoContable.patchValue({
                      cuentaCredito: (this.cuentasContablesConcepto.find((e: any) => e.cuenta.Codigo === this.ordenPago.CuentaValorNeto)),
                    });
                  }
                }
              }
            });
          });
        }
      }
    });

    this.subOrdenesPago$ = this.store.select(selectOrdenesPagoById).subscribe((action) => {
      if (action && action.OrdenesPagoById) {
        this.ordenPago = action.OrdenesPagoById;
        this.ordenesPago();
      }
    });

    this.subscriptionfilter$ = this.movimientoContable.get('identificacionEndoso').valueChanges.subscribe((valor) => {
      if (valor) {
        this.store.dispatch(getBeneficiarioEndoso({query: {NumDocumento: valor}}));
        this.subBenefEndoso$ = this.store.select(selectBeneficiarioEndoso).subscribe((action) => {
          if (action && action.BeneficiarioEndoso) {
            this.datosBenefEndoso = action.BeneficiarioEndoso[0];
            action.BeneficiarioEndoso = null;
            this.movimientoContable.patchValue({
              beneficiarioEndoso: this.datosBenefEndoso.NomProveedor,
              bancoEndoso: this.datosBenefEndoso.IdEntidadBancaria,
              tipoCuentaEndoso: this.datosBenefEndoso.TipoCuentaBancaria,
              numeroCuentaEndoso: this.datosBenefEndoso.NumCuentaBancaria
            });
          }
        });
      }
    });
  }


  conceptoCuentaContable() {
    this.conceptoCuenta = this.movimientoContable.value.cuentaConcepto;
  }

  cambioEndoso() {
    this.endoso = this.movimientoContable.value.endoso;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionConceptos.unsubscribe();
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  modalEliminar(fila: any) {
    this.modalService.open(this.eliminarModal).result.then((result) => {
      if (`${result}`) {
        this.datosTableMovimientoContable.splice(this.datosTableMovimientoContable.findIndex(
          (element: any) => element.codigo === fila.codigo
            && element.descuento === fila.descuento
            && element.base === fila.base
            && element.valor === fila.valor
        ), 1);
      }
    });
  }

  agregar() {
    // TODO
    const elemento = Object.assign({}, DATOS_MOVIMIENTO_CONTABLE[0]);
    elemento.Nombre = this.movimientoContable.get('nombreMovimientoContable').value;
    if (this.movimientoContable.value.cuentaConcepto) {
      elemento.Codigo = this.movimientoContable.value.cuentaContableMovCont1.cuenta.Codigo + ' - '
      + this.movimientoContable.value.cuentaContableMovCont1.cuenta.Nombre;
    } else {
      elemento.Codigo = this.movimientoContable.value.cuentaContableMovCont;
    }
    elemento.Valor = this.movimientoContable.get('valorMovimientoContable').value;
    this.datosTableMovimientoContable.push(elemento);
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
            nodoCuenta = null;
            this.movimientoContable.patchValue({
              cuentaContableMovCont: this.cuentaContableSeleccionada.data.Codigo + ' - ' + this.cuentaContableSeleccionada.data.Nombre
            });
          }
        }
      }
    });
    this.subGetNodoSeleccionadoCuenta$.unsubscribe();
  }

  agregarCuentaContable1() {
    this.subGetNodoSeleccionadoCuenta$ = this.store.select(getNodoSeleccionadoCuentaContable).subscribe((nodoCuenta: any) => {
      if (nodoCuenta) {
        if (Object.keys(nodoCuenta)[0] !== 'type') {
          if (nodoCuenta && !nodoCuenta.children) {
            this.SeleccionarCuentaContable(nodoCuenta);
            this.cuentaContableSeleccionada1 = nodoCuenta.data;
            nodoCuenta = null;
            this.movimientoContable.patchValue({
              cuentaContableEndoso: this.cuentaContableSeleccionada1
            });
          }
        }
      }
    });
    this.subGetNodoSeleccionadoCuenta$.unsubscribe();
  }

  cargarMovimiento() {
    this.store.dispatch(cargarDatosMovimientoContable({data: this.datosTableMovimientoContable}));
    this.store.dispatch(cargarMovimientoContable({ MovimientoContable: this.movimientoContable.value }));
  }

  isInvalid(nombre: string) {
    const input = this.movimientoContable.get(nombre);
    if (input)
      return input.invalid && (input.touched || input.dirty);
    else
      return true;
  }

  get valorTotal() {
    return this.datosTableMovimientoContable.reduce((a: any, b: { valor: number; }) => a + b.valor, 0);
  }

  ordenesPago() {
    this.datosTableMovimientoContable = this.ordenPago.MovimientoContable;
    this.endoso = this.ordenPago.Endoso;
    this.store.dispatch(getInfoCuentaContableEndoso({codigo: this.ordenPago.CuentaEndoso}));
    this.subInfoCuentaEndoso$ = this.store.select(selectInfoCuentaContableEndoso).subscribe((action) => {
      if (action && action.InfoCuentaContableEndoso) {
        this.cuentaEndoso = action.InfoCuentaContableEndoso;
        action.InfoCuentaContableEndoso = null;
        this.cuentaContableSeleccionada1 = this.cuentaEndoso;
        this.movimientoContable.patchValue({
          endoso: this.ordenPago.Endoso,
          identificacionEndoso: this.ordenPago.BeneficiarioEndoso,
          valorEndoso: this.ordenPago.ValorEndoso,
          cuentaContableEndoso: this.cuentaContableSeleccionada1
        });
      }
    });
  }
}
