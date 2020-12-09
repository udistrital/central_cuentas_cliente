import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadRelacionautorizacionesSeleccionado } from '../../actions/relacionautorizaciones.actions';
import { CONFIGURACION_TABLAREGISTROS, DATOS_TABLAREGISTROS } from '../../interfaces/interfaces';

@Component({
  selector: 'ngx-table-autorizacionnomina',
  templateUrl: './table-autorizacionnomina.component.html',
  styleUrls: ['./table-autorizacionnomina.component.scss']
})
export class TableAutorizacionnominaComponent implements OnInit {

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

        this.store.dispatch(loadRelacionautorizacionesSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadRelacionautorizacionesSeleccionado(null));
    });
  }
}
