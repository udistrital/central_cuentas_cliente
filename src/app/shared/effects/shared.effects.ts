import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SharedActions from '../actions/shared.actions';
import { SharedService } from '../services/shared.service';
import { Store } from '@ngrx/store';
import { selectConceptos, selectDatosID, selectTiposID } from '../selectors/shared.selectors';
import { selectVigencias } from '../selectors/shared.selectors';
import { PopUpManager } from '../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class SharedEffects {

  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private store: Store<any>,
    private popupManager: PopUpManager,
    private translate: TranslateService
  ) { }


  loadShareds$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SharedActions.loadShareds),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  GetArbolRubro$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetArbolRubro),
      mergeMap((branch) =>
        this.sharedService.getArbol(branch.branch)
          .pipe(
            map(data => SharedActions.LoadArbolRubro(data)),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });

  GetConceptosContables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.GetConceptosContables),
      mergeMap((id) =>
        this.sharedService.getConceptos(id ? id.id : id)
          .pipe(
            map(data => SharedActions.LoadConceptosContables([data])),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });

  getTiposID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getTiposID),
      withLatestFrom(this.store.select(selectTiposID)),
      mergeMap((action) => {
        if (!action || !action[1])
          return this.sharedService.getTiposID(true)
            .pipe(
              map(data => SharedActions.loadTiposID([data])),
              catchError(data => of(SharedActions.CatchError(data))));
        else
          return of(SharedActions.loadTiposID(action[1]));
      }
      )
    );
  });

  getDatosID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getDatosID),
      mergeMap((params) =>
        this.sharedService.getDatosID(params.numero, params.tipo, params.limit, params.fields)
          .pipe(
            map((data: any[]) => {
              return SharedActions.loadDatosID({ clave: params.clave, datosId: data });
            }),
            catchError(data => of(SharedActions.CatchError(data))))
      ) );
    });

  getVigencias$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getVigencias),
      withLatestFrom(this.store.select(selectVigencias)),
      mergeMap((accion) => {
        if (!accion || !accion[1])
          return this.sharedService.getVigencias()
            .pipe(map(data => SharedActions.loadVigencias([data])),
              catchError(data => of(SharedActions.CatchError(data))));
        else
          return of(SharedActions.loadVigencias(accion[1]));
      })
    );
  });

  getConceptos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getConceptos),
      mergeMap((accion) => this.sharedService.getConceptosCentralCuentas(accion && accion.query ? accion.query : null)
      .pipe(map(data => SharedActions.loadConceptos(
        {Conceptos: ((data && data.Data) ? data.Data : data)})),
        catchError(data => of(SharedActions.CatchError(data)))))
    );
  });

  cargarDocumentos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.cargarDocumentos),
      mergeMap((accion) => {
        return this.sharedService.cargarDocumentos(accion.element)
        .pipe(map(data => {
          this.popupManager.showSuccessAlert(this.translate.instant('CUENTA_BANCARIA.guardado_exitoso'));
          return null;
        }), catchError(data => of(SharedActions.CatchError(data))));
      })
    );
  });
}
