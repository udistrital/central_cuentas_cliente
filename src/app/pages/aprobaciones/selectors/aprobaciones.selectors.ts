import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAprobaciones from '../reducers/aprobaciones.reducer';

export const selectAprobacionesState = createFeatureSelector<fromAprobaciones.State>(
  fromAprobaciones.aprobacionesFeatureKey
);
