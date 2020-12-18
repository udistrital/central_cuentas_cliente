import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadOrdenPagoSeleccionado } from '../../actions/ordenespago.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-listaordenes',
  templateUrl: './table-listaordenes.component.html',
  styleUrls: ['./table-listaordenes.component.scss']
})
export class TableListaordenesComponent implements OnInit {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  constructor(
    private store: Store<any>,
  ) {
    this.datosPrueba = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadOrdenPagoSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadOrdenPagoSeleccionado(null));
    });
  }
}
