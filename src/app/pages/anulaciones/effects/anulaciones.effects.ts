import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as AnulacionesActions from '../actions/anulaciones.actions';

@Injectable()
export class AnulacionesEffects {

  loadAnulacioness$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AnulacionesActions.loadAnulacioness),
      concatMap(() =>   EMPTY)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
    );
  });

  constructor(private actions$: Actions) {}

}
