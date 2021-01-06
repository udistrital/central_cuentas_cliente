import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SharedActions from '../actions/shared.actions';
import { SharedService } from '../services/shared.service';
import { Store } from '@ngrx/store';
import { selectDatosIDMap, selectTiposID } from '../selectors/shared.selectors';


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

  getTiposID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SharedActions.getTiposID),
      withLatestFrom(this.store.select(selectTiposID)),
      mergeMap((action) => {
        if (!action || !action[1])
        return this.sharedService.getTiposID()
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
        this.sharedService.getDatosID( params.numero, params.tipo, params.limit, params.fields )
          .pipe(
            map(data => SharedActions.loadDatosID([data])),
            catchError(data => of(SharedActions.CatchError(data))))
      )
    );
  });
}
