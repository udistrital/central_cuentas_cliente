import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as RelacionDevolucionesActions from '../actions/relaciondevoluciones.actions';
import { RelacionDevolucionesService } from '../services/relaciondevoluciones.service';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable()
export class RelacionDevolucionesEffects {

  loadDocumentos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RelacionDevolucionesActions.loadDocumentos),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  getOrdenesDevolucion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RelacionDevolucionesActions.getOrdenesDevolucion),
      mergeMap((accion) => {
        return this.servicio.getOrdenesDevolucion(accion.sortby, accion.order)
        .pipe(map(data => RelacionDevolucionesActions.cargarOrdenDevolucion({OrdenesDevolucion: data})),
            catchError(data => of(RelacionDevolucionesActions.CatchError(data))));
      })
    );
  });

  getRelacionDevoluciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RelacionDevolucionesActions.getRelacionDevoluciones),
      mergeMap((accion) => {
        return this.servicio.getRelacionDevoluciones(accion.sortby, accion.order)
        .pipe(map(data => RelacionDevolucionesActions.cargarRelacionDevoluciones({RelacionDevoluciones: data})),
            catchError(data => of(RelacionDevolucionesActions.CatchError(data))));
      })
    );
  });

  crearRelacionDevoluciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RelacionDevolucionesActions.crearRelacionDevoluciones),
      mergeMap((accion) => this.servicio
      .crearRelacionDevoluciones(accion.element)
      .pipe(map(data => {
        this.popupManager
        .showSuccessAlert(this.translate.instant('RELACION_DEVOLUCIONES.guardado_exitoso',
        {CONSECUTIVO: accion.element.Consecutivo}))
        .then((result) => {
          this.router.navigateByUrl('pages/relaciondevoluciones/lista');
        });
        return RelacionDevolucionesActions.cargarRelacionDevolucion({RelacionDevoluciones: data});
      }), catchError(data => of(RelacionDevolucionesActions.CatchError(data)))))
    );
  });

  actualizarRelacionDevoluciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RelacionDevolucionesActions.actualizarRelacionDevoluciones),
      mergeMap((accion) => this.servicio
      .actualizarRelacionDevoluciones(accion.id, accion.element)
      .pipe(map(data => {
        this.popupManager
        .showSuccessAlert(this.translate.instant('RELACION_DEVOLUCIONES.actualizacion_exitosa',
        {CONSECUTIVO: accion.element.Consecutivo}))
        .then((result) => {
          if (accion.path === 'lista') window.location.reload();
          else this.router.navigateByUrl('pages/relaciondevoluciones/lista');
        });
        return RelacionDevolucionesActions.cargarRelacionDevolucion({RelacionDevoluciones: data});
      }), catchError(data => of(RelacionDevolucionesActions.CatchError(data)))))
    );
  });

  constructor(
    private actions$: Actions,
    private servicio: RelacionDevolucionesService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
    private router: Router
    ) { }
}
