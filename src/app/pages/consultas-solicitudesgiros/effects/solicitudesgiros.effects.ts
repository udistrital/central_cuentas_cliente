import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as SolicitudesgirosActions from '../actions/solicitudesgiros.actions';


@Injectable()
export class SolicitudesgirosEffects {


  loadSolicitudesgiros$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SolicitudesgirosActions.loadSolicitudesgiros),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) { }

}
