import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as OrdenespagoActions from '../actions/ordenespago.actions';


@Injectable()
export class OrdenespagoEffects {


  loadOrdenespago$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(OrdenespagoActions.loadOrdenesdepago),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) { }

}
