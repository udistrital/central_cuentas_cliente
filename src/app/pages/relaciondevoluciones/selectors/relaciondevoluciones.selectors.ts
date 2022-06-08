import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRelacionDevoluciones from '../reducers/relaciondevoluciones.reducer';

export const selectRelacionDevolucionesState = createFeatureSelector<fromRelacionDevoluciones.State>(
    fromRelacionDevoluciones.relaciondevolucionesFeatureKey
);

export const selectOrdenesDevolucion = createSelector(
    selectRelacionDevolucionesState,
  (state: fromRelacionDevoluciones.State) => state.OrdenesDevolucion
);

export const selectRelacionDevoluciones = createSelector(
  selectRelacionDevolucionesState,
  (state: fromRelacionDevoluciones.State) => state.RelacionDevoluciones
);

export const selectDatosRelacion = createSelector(
  selectRelacionDevolucionesState,
  (state: fromRelacionDevoluciones.State) => state.DatosRelacion
);

export const selectInfoRelacionDevoluciones = createSelector(
  selectRelacionDevolucionesState,
  (state: fromRelacionDevoluciones.State) => state.InfoRelacionDevoluciones
);
