import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SeleccionarCuentaContable } from '../../../../shared/actions/shared.actions';
import { getNodoSeleccionadoCuentaContable } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_CONTABILIZACION } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-contabilizacion',
  templateUrl: './set-contabilizacion.component.html',
  styleUrls: ['./set-contabilizacion.component.scss']
})
export class SetContabilizacionComponent implements OnInit {
  contabilizacionGroup: FormGroup;
  datosContabilizacion: any;
  configContabilizacion: any;
  conceptoCuenta: boolean;
  subGetNodoSeleccionadoCuenta$: any;
  cuentaContableSeleccionada: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.datosContabilizacion = [];
    this.configContabilizacion = CONFIGURACION_CONTABILIZACION;
   }

  ngOnInit() {
    this.createForm();
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
}
