import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrdenesdevolucion from '../reducers/ordenesdevolucion.reducer';

export const selectOrdenesdevolucionState = createFeatureSelector<fromOrdenesdevolucion.State>(
  fromOrdenesdevolucion.ordenesdevolucionFeatureKey
);
