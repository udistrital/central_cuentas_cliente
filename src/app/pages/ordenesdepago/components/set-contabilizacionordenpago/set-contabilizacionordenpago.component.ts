import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectOrdenesPagoById, selectVigenciasNoFuturas } from '../../../../shared/selectors/shared.selectors';
import { getDatosCompromiso, getDatosAlmacenadosCompromiso, getDatosImputacionPresupuestal, getDatosMovimientoContable, getInfoDatosBeneficiario,
  getDatosImpuestosYRetenciones, getImpYRet, getMovimientoContable, getAreaFuncional } from '../../selectors/ordenespago.selectors';
  import { getConvenios, getEntradaAlmacen, getOrdenesPagoById, getTiposCompromisos, getTiposOrdenesPago, getVigencias } from '../../../../shared/actions/shared.actions';
import { ShowResumenordenpagoComponent } from '../show-resumenordenpago/show-resumenordenpago.component';
import { FormBuilder } from '@angular/forms';
import { SetDatosbeneficiarioComponent } from '../set-datosbeneficiario/set-datosbeneficiario.component';
import { CONFIGURACION_CONTABILIZACION } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-set-contabilizacionordenpago',
  templateUrl: './set-contabilizacionordenpago.component.html',
  styleUrls: ['./set-contabilizacionordenpago.component.scss']
})
export class SetContabilizacionordenpagoComponent implements OnInit {

  susVigencias$: any;
  vigenciaActual: any;
  vigencias: any;
  subOrdenesPago$: any;
  ordenPago: any = {};
  configTableMovimientoContable: any;
  datosTableMovimientoContable = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
  ) {
    this.store.dispatch(getVigencias());
    this.store.dispatch(getOrdenesPagoById({id: this.activatedRoute.snapshot.url[1].path}));
    this.configTableMovimientoContable = {...CONFIGURACION_CONTABILIZACION, rowActions: null};
  }

  gOnDestroy () {
    this.subOrdenesPago$.unsubscribe();
  }

  ngOnInit() {
    this.subOrdenesPago$ = this.store.select(selectOrdenesPagoById).subscribe((action) => {
      if (action && action.OrdenesPagoById) {
        this.ordenPago = action.OrdenesPagoById;
        this.datosTableMovimientoContable = this.ordenPago.MovimientoContable;
      }
    });
  }

  contabilizar() {
    // console.log(this.ordenPago);
  }

}
