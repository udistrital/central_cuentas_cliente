import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAnulaciones from '../reducers/anulaciones.reducer';

export const selectAnulacionesState = createFeatureSelector<fromAnulaciones.State>(
  fromAnulaciones.anulacionesFeatureKey
);
