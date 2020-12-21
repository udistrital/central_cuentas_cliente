import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { DATOS_TABLAREGISTROS, CONFIGURACION_TABLAREGISTROS } from '../../interfaces/interfaces';
import { getFilaSeleccionada, getAccionTabla } from '../../../../shared/selectors/shared.selectors';
import { loadDevoluciontributariaSeleccionado } from '../../../devoluciontributaria/actions/devoluciontributaria.actions';

@Component({
  selector: 'ngx-table-devoluciontributaria',
  templateUrl: './table-devoluciontributaria.component.html',
  styleUrls: ['./table-devoluciontributaria.component.scss']
})
export class TableDevoluciontributariaComponent implements OnInit {

  configuracion: any;
  datosTabla: any;
  subscription$: any;

  @Output() selectedAction: EventEmitter<any>;
  stringBusqueda: string;

  constructor (
    private store: Store<any>
  ) {
    this.datosTabla = DATOS_TABLAREGISTROS;
    this.configuracion = CONFIGURACION_TABLAREGISTROS;

    this.stringBusqueda = '';
    this.selectedAction = new EventEmitter<any>();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadDevoluciontributariaSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadDevoluciontributariaSeleccionado(null));
    });
  }
}
