import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as OrdenesDevolucionActions from '../actions/ordenesdevolucion.actions';
import { OrdenesDevolucionService } from '../services/ordenesdevolucion.service';
import { PopUpManager } from '../../../@core/managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable()
export class OrdenesDevolucionEffects {

  constructor(
    private actions$: Actions,
    private servicio: OrdenesDevolucionService,
    private popupManager: PopUpManager,
    private translate: TranslateService,
    private router: Router
    ) { }
}
