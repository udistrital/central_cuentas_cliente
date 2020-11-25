import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadAprobacionesSeleccionado} from '../../actions/aprobaciones.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from "../../interfaces/interfaces";
@Component({
  selector: 'ngx-list-approbations',
  templateUrl: './list-approbations.component.html',
  styleUrls: ['./list-approbations.component.scss']
})
export class ListApprobationsComponent implements OnInit {

  configuration: any;
  datosPrueba: any;
  subscription$: any;

  constructor(
    private store: Store<any>,
  ) { 
    this.datosPrueba = DATOS_PRUEBA;
    this.configuration = CONFIGURACION_PRUEBA;
   }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadAprobacionesSeleccionado(fila.fila));
      }
    });
    this.subscription$ = this.store.select(getAccionTabla).subscribe((accion: any) => {

      this.store.dispatch(loadAprobacionesSeleccionado(null));
    });
  }

}
