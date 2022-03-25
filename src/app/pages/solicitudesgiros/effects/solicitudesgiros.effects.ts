import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SolicitudesgirosActions from '../actions/solicitudesgiros.actions';
import { SolicitudesGirosService } from '../services/solicitudesgiros.service';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable()
export class SolicitudesgirosEffects {

  constructor(
    private actions$: Actions,
    private servicio: SolicitudesGirosService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
    private router: Router
    ) { }
  loadSolicitudesgiros$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SolicitudesgirosActions.loadSolicitudesgiros),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  // subirAutorizacionGiro$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(SolicitudesgirosActions.subirAutorizacionGiro),
  //     mergeMap((accion) => {
  //       return this.servicio.subirAutorizacionGiro(accion.element)
  //       .pipe(map(data => {
  //         this.popupManager.showSuccessAlert(this.translate.instant('SOLICITUD_GIRO.guardado_exitoso', {CONSECUTIVO: accion.element.Numero_Solicitud})).then((result) => {
  //           this.router.navigateByUrl('pages/solicitudesgiros/lista');
  //         });
  //         return SolicitudesgirosActions.cargarSolicitudGiro({
  //           SolicitudGiro: ((data && data.Data) ? data.Data : data)});
  //       }), catchError(data => of(SolicitudesgirosActions.CatchError(data))));
  //     })
  //   );
  // });

  subirAutorizacionGiro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SolicitudesgirosActions.subirAutorizacionGiro),
      mergeMap((accion) =>
      this.servicio.subirAutorizacionGiro(accion.element).
      pipe(map(data =>{
        this.popupManager.showSuccessAlert(this.translate.instant('SOLICITUD_GIRO.guardado_exitoso', {CONSECUTIVO: accion.element.Numero_Solicitud})).then((result) => {
          this.router.navigateByUrl('pages/solicitudesgiros/lista');
        });
        return SolicitudesgirosActions.cargarSolicitudGiro({SolicitudGiro: data})
      }), catchError(data => of(SolicitudesgirosActions.CatchError(data)))))
    )
  })

  actualizarAutorizacionGiro$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(SolicitudesgirosActions.actualizarAutorizacionGiro),
        mergeMap((accion) => {
            return this.servicio.actualizarAutorizacionGiro(accion.id, accion.element)
            .pipe(map(data => {
                this.popupManager.showSuccessAlert(this.translate.instant('SOLICITUD_GIRO.actualizacion_exitosa')).then((result) => {
                  if (accion.path === 'lista') window.location.reload();
                  else this.router.navigateByUrl('pages/solicitudesgiros/lista');
                });
                return SolicitudesgirosActions.cargarSolicitudGiro({SolicitudGiro: data});
            }), catchError(data => of(SolicitudesgirosActions.CatchError(data))));
        })
    );
});

  getSolicitudesGiro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SolicitudesgirosActions.getSolicitudesGiro),
      mergeMap((accion) => {
        return this.servicio.getAutorizacionGiro(accion.sortby, accion.order)
        .pipe(map(data => SolicitudesgirosActions.cargarSolicitudesGiro(
            {SolicitudesGiro: data})),
            catchError(data => of(SolicitudesgirosActions.CatchError(data))));
      })
    );
  });

}
