import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as DevoluciontributariaActions from '../actions/devoluciontributaria.actions';
import { DevolucionTributariaService } from '../services/devoluciontributaria.service';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable()
export class DevoluciontributariaEffects {


  loadDevoluciontributaria$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DevoluciontributariaActions.loadDevoluciontributaria),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  crearDevolucionTributaria$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DevoluciontributariaActions.crearDevolucionTributaria),
      mergeMap((accion) =>
      this.servicio.crearDevolucionTributaria(accion.element).
      pipe(map(data => {
        this.popupManager
        .showSuccessAlert(this.translate.instant('ORDEN_PAGO.guardado_exitoso',
        {CONSECUTIVO: accion.element.Consecutivo}))
        .then((result) => {
          this.router.navigateByUrl('pages/devoluciontributaria/lista');
        });
        return DevoluciontributariaActions.cargarDevolucionTributaria({OrdenPago: data});
      }), catchError(data => of(DevoluciontributariaActions.CatchError(data)))))
    );
  });

  getDevolucionesTributarias$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DevoluciontributariaActions.getDevolucionesTributarias),
      mergeMap((accion) => {
        return this.servicio.getDevolucionesTributarias(accion.sortby, accion.order)
        .pipe(map(data => DevoluciontributariaActions.cargarDevolucionTributaria({DevolucionTributaria: data})),
            catchError(data => of(DevoluciontributariaActions.CatchError(data))));
      })
    );
  });


  constructor(
    private actions$: Actions,
    private servicio: DevolucionTributariaService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
    private router: Router
    ) { }

}
