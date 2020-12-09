import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRelacionautorizaciones from '../reducers/relacionautorizaciones.reducer';

export const selectRelacionautorizacionesState = createFeatureSelector<fromRelacionautorizaciones.State>(
  fromRelacionautorizaciones.relacionautorizacionesFeatureKey
);

export const getRelacionautorizacionesSeleccionado = createSelector(
  selectRelacionautorizacionesState,
  (state: fromRelacionautorizaciones.State) => state.RelacionautorizacionesSeleccionado
);
