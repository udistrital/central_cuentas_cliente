import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as RelacionautorizacionesActions from '../actions/relacionautorizaciones.actions';


@Injectable()
export class RelacionautorizacionesEffects {


  loadRelacionautorizaciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RelacionautorizacionesActions.loadRelacionautorizaciones),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) { }

}
