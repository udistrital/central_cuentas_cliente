import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as OrdenesDevolucionActions from '../actions/ordenesdevolucion.actions';
import { OrdenesDevolucionService } from '../services/ordenesdevolucion.service';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable()
export class OrdenesDevolucionEffects {

  loadDocumentos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdenesDevolucionActions.loadDocumentos),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  crearOrdenDevolucion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdenesDevolucionActions.crearOrdenDevolucion),
      mergeMap((accion) => this.servicio
      .crearOrdenDevolucion(accion.element)
      .pipe(map(data => {
        this.popupManager
        .showSuccessAlert(this.translate.instant('ORDEN_DEVOLUCION.guardado_exitoso',
        {CONSECUTIVO: accion.element.Consecutivo}))
        .then((result) => {
          this.router.navigateByUrl('pages/ordenesdevolucion/lista');
        });
        return OrdenesDevolucionActions.cargarOrdenDevolucion({OrdenDevolucion: data});
      }), catchError(data => of(OrdenesDevolucionActions.CatchError(data)))))
    );
  });

  actualizarOrdenDevolucion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdenesDevolucionActions.actualizarOrdenDevolucion),
      mergeMap((accion) => this.servicio
      .actualizarOrdenDevolucion(accion.id, accion.element)
      .pipe(map(data => {
        this.popupManager
        .showSuccessAlert(this.translate.instant('ORDEN_DEVOLUCION.actualizacion_exitosa',
        {CONSECUTIVO: accion.element.Consecutivo}))
        .then((result) => {
          if (accion.path === 'lista') window.location.reload();
          else this.router.navigateByUrl('pages/ordenesdevolucion/lista');
        });
        return OrdenesDevolucionActions.cargarOrdenDevolucion({OrdenDevolucion: data});
      }), catchError(data => of(OrdenesDevolucionActions.CatchError(data)))))
    );
  });

  getOrdenesDevolucion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdenesDevolucionActions.getOrdenesDevolucion),
      mergeMap((accion) => {
        return this.servicio.getOrdenesDevolucion(accion.sortby, accion.order)
        .pipe(map(data => OrdenesDevolucionActions.cargarOrdenDevolucion({OrdenesDevolucion: data})),
            catchError(data => of(OrdenesDevolucionActions.CatchError(data))));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private servicio: OrdenesDevolucionService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
    private router: Router
    ) { }
}
