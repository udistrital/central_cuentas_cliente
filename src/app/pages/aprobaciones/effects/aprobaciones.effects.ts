import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as AprobacionesActions from '../actions/aprobaciones.actions';



@Injectable()
export class AprobacionesEffects {

  loadAprobacioness$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AprobacionesActions.loadAprobacioness),
      concatMap(() => EMPTY)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
    );
  });



  constructor(private actions$: Actions) {}

}
