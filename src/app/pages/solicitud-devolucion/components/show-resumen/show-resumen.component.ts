import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CONFIGURACION_TABLA_ANEXOS, CONFIGURACION_TABLA_IMPUESTOS } from '../../interfaces/interfaces';
import { getDatosSolicitante, getDatosSolicitud, getDatosTablaAnexos, getDatosTablaImpuestos, getTipoDevolucion, getTotalSolicitado } from '../../selectors/solicitud-devolucion.selectors';

@Component({
  selector: 'ngx-show-resumen',
  templateUrl: './show-resumen.component.html',
  styleUrls: ['./show-resumen.component.scss']
})
export class ShowResumenComponent implements OnInit, OnDestroy {
  susTipoDevolucion$: any;
  tipoDevolucion: string;
  configTablaAnexos: any;
  datosTablaAnexos: any;
  configTablaImpuestos: any;
  datosTablaImpuestos: any;
  susDatosSolicitud$: any;
  datosSolicitud: any;
  susDatosSolicitante$: any;
  datosSolicitante: any;
  susDatosTablaImpuestos$: any;
  susDatosTablaAnexos$: any;
  susTotalSolicitado$: any;
  totalSolicitado: number;

  constructor(private store: Store<any>) {
    this.configTablaAnexos = Object.assign({}, CONFIGURACION_TABLA_ANEXOS);
    this.configTablaImpuestos = Object.assign({}, CONFIGURACION_TABLA_IMPUESTOS);
    this.configTablaAnexos.rowActions = null;
    this.configTablaImpuestos.rowActions = null;
    this.datosTablaAnexos = [];
    this.datosTablaImpuestos = [];
  }

  ngOnInit() {
    this.susTipoDevolucion$ = this.store.select(getTipoDevolucion).subscribe((valor) => {
      if (valor && valor.tipoDevolucion) { this.tipoDevolucion = valor.tipoDevolucion; }
    });
    this.susDatosSolicitud$ = this.store.select(getDatosSolicitud).subscribe((valor) => {
      if (valor && valor.datosSolicitud) { this.datosSolicitud = valor.datosSolicitud; }
    });
    this.susDatosSolicitante$ = this.store.select(getDatosSolicitante).subscribe((valor) => {
      if (valor && valor.datosSolicitante) { this.datosSolicitante = valor.datosSolicitante; }
    });
    this.susDatosTablaImpuestos$ = this.store.select(getDatosTablaImpuestos).subscribe((valor) => {
      if (valor && valor.datosTablaImpuestos) { this.datosTablaImpuestos = valor.datosTablaImpuestos; }
    });
    this.susDatosTablaAnexos$ = this.store.select(getDatosTablaAnexos).subscribe((valor) => {
      if (valor && valor.datosTablaAnexos) { this.datosTablaAnexos = valor.datosTablaAnexos; }
    });
    this.susTotalSolicitado$ = this.store.select(getTotalSolicitado).subscribe((valor) => {
      if (valor && valor.totalSolicitado) { this.totalSolicitado = valor.totalSolicitado; }
    });
  }

  ngOnDestroy() {
    this.susTipoDevolucion$.unsubscribe();
    this.susDatosSolicitud$.unsubscribe();
    this.susDatosSolicitante$.unsubscribe();
    this.susDatosTablaImpuestos$.unsubscribe();
    this.susDatosTablaAnexos$.unsubscribe();
    this.susTotalSolicitado$.unsubscribe();
  }

}
