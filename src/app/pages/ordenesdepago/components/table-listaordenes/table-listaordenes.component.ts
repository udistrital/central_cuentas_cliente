import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadFilaSeleccionada } from '../../../../shared/actions/shared.actions';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadOrdenPagoSeleccionado } from '../../actions/ordenespago.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-listaordenes',
  templateUrl: './table-listaordenes.component.html',
  styleUrls: ['./table-listaordenes.component.scss']
})
export class TableListaordenesComponent implements OnInit, OnDestroy {

  configuracion: any;
  datosPrueba: any;
  subscription$: any;
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.datosPrueba = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;
    this.store.dispatch(LoadFilaSeleccionada(null));
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {
      if (fila && fila.fila) {
        this.store.dispatch(loadOrdenPagoSeleccionado(fila.fila));
        this.router.navigate(['pages/ordenespago/editar']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
