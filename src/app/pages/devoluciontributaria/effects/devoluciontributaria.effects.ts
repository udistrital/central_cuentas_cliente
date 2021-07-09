import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as DevoluciontributariaActions from '../actions/devoluciontributaria.actions';


@Injectable()
export class DevoluciontributariaEffects {


  loadDevoluciontributaria$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DevoluciontributariaActions.loadDevoluciontributaria),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) { }

}
