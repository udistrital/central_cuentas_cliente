import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as OrdenespagoActions from '../actions/ordenespago.actions';
import { OrdenesPagoService } from '../services/ordenespago.service';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable()
export class OrdenespagoEffects {

  constructor(
    private actions$: Actions,
    private servicio: OrdenesPagoService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
    private router: Router
    ) { }

  loadOrdenespago$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(OrdenespagoActions.loadOrdenesdepago),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  subirOrdenPago$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdenespagoActions.subirOrdenPago),
      mergeMap((accion) =>
      this.servicio.subirOrdenPago(accion.element).
      pipe(map(data => {
        this.popupManager
        .showSuccessAlert(this.translate.instant('ORDEN_PAGO.guardado_exitoso',
        {CONSECUTIVO: accion.element.Consecutivo}))
        .then((result) => {
          this.router.navigateByUrl('pages/ordenespago/lista');
        });
        return OrdenespagoActions.cargarOrdenPago({OrdenPago: data});
      }), catchError(data => of(OrdenespagoActions.CatchError(data)))))
    );
  });

  actualizarOrdenPago$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(OrdenespagoActions.actualizarOrdenPago),
        mergeMap((accion) => {
            return this.servicio.actualizarOrdenPago(accion.id, accion.element)
            .pipe(map(data => {
                this.popupManager.showSuccessAlert(this.translate.instant('SOLICITUD_GIRO.actualizacion_exitosa')).then((result) => {
                  if (accion.path === 'lista') window.location.reload();
                  else this.router.navigateByUrl('pages/ordenespago/lista');
                });
                return OrdenespagoActions.cargarOrdenPago({OrdenPago: data});
            }), catchError(data => of(OrdenespagoActions.CatchError(data))));
        })
    );
  });

  getOrdenesPago$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdenespagoActions.getOrdenesPago),
      mergeMap((accion) => {
        return this.servicio.getOrdenesPago(accion.sortby, accion.order)
        .pipe(map(data => OrdenespagoActions.cargarOrdenesPago({OrdenesPago: data})),
            catchError(data => of(OrdenespagoActions.CatchError(data))));
      })
    );
  });

}
