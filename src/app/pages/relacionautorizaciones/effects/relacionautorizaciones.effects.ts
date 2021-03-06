import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as RelacionautorizacionesActions from '../actions/relacionautorizaciones.actions';
import { RelacionautorizacionesService } from '../services/relacionautorizaciones.service';


@Injectable()
export class RelacionautorizacionesEffects {

  constructor(private actions$: Actions, private relacionService: RelacionautorizacionesService) {}

  loadRelacionautorizaciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RelacionautorizacionesActions.loadRelacionautorizaciones),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });

  getInfoRelacionautorizacion$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(RelacionautorizacionesActions.loadRelacionautorizaciones),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


}
