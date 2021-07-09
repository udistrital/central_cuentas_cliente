import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAccionTabla } from '../../../../shared/selectors/shared.selectors';
import { CONFIGURACION_PRUEBA, DATOS_PRUEBA } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { LoadAccionTabla } from '../../../../shared/actions/shared.actions';


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  configuration: any;
  datosPrueba: any;
  subscriptionTabla$: any;

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    this.datosPrueba = DATOS_PRUEBA;
    this.configuration = CONFIGURACION_PRUEBA;
   }

  ngOnDestroy(): void {
    this.subscriptionTabla$.unsubscribe();
  }

  ngOnInit() {
    this.subscriptionTabla$ = this.store.select(getAccionTabla).subscribe((accion: any) => {
      if (accion) {
        if (Object.keys(accion)[0] !== 'type') {
          this.router.navigate(['pages/borrado/crear']);
          this.store.dispatch(LoadAccionTabla(null));
        }
      }
    });
  }

}
