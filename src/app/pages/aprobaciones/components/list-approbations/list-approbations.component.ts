import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla, getFilaSeleccionada } from '../../../../shared/selectors/shared.selectors';
import { loadAprobacionesSeleccionado} from '../../actions/aprobaciones.actions';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { LoadAccionTabla } from '../../../../shared/actions/shared.actions';
@Component({
  selector: 'ngx-list-approbations',
  templateUrl: './list-approbations.component.html',
  styleUrls: ['./list-approbations.component.scss']
})
export class ListApprobationsComponent implements OnInit, OnDestroy {

  configuration: any;
  datosPrueba: any;
  subscription$: any;
  subscriptionTabla$: any;

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuration = CONFIGURACION_PRUEBA;
   }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscriptionTabla$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$ = this.store.select(getFilaSeleccionada).subscribe((fila: any) => {

      if (fila) {

        this.store.dispatch(loadAprobacionesSeleccionado(fila.fila));
      }
    });
    this.subscriptionTabla$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          this.router.navigate(['pages/aprobaciones/crear']);
          this.store.dispatch(LoadAccionTabla(null));
        }
      }
      this.store.dispatch(loadAprobacionesSeleccionado(null));

    });


  }

}
