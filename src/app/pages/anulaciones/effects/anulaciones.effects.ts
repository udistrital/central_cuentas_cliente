import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as AnulacionesActions from '../actions/anulaciones.actions';



@Injectable()
export class AnulacionesEffects {

  loadAnulacioness$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnulacionesActions.loadAnulacioness),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AnulacionesActions.loadAnulacionessSuccess({ data })),
          catchError(error => of(AnulacionesActions.loadAnulacionessFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
