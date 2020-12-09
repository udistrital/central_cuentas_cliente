import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrdenespago from '../reducers/ordenespago.reducer';

export const selectOrdenespagoState = createFeatureSelector<fromOrdenespago.State>(
  fromOrdenespago.ordenespagoFeatureKey
);

export const getOrdenpagoSeleccionado = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.OrdenpagoSeleccionado
);
