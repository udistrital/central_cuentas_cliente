import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as BorradoActions from '../actions/borrado.actions';


@Injectable()
export class BorradoEffects {


  loadBorrados$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(BorradoActions.loadBorrados),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  constructor(private actions$: Actions) {}

}
