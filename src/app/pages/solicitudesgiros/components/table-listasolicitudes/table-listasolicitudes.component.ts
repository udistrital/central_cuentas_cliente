import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadSolicitudgiroSeleccionado } from '../../actions/solicitudesgiros.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-listasolicitudes',
  templateUrl: './table-listasolicitudes.component.html',
  styleUrls: ['./table-listasolicitudes.component.scss']
})
export class TableListasolicitudesComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  constructor(
    private store: Store<any>,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuracion = CONFIGURACION_PRUEBA;
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadSolicitudgiroSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadSolicitudgiroSeleccionado(null));
    });
  }
}
