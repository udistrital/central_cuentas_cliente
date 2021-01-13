import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SharedActions from '../actions/shared.actions';
import { SharedService } from '../services/shared.service';
import { selectVigencias } from '../selectors/shared.selectors';
import { Store } from '@ngrx/store';


@Injectable()
export class SharedEffects {

  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private store: Store<any>
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
        this.sharedService.getConceptos(id.id)
          .pipe(
            map(data => SharedActions.LoadConceptosContables([data])),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
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
}
