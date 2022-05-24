import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDevoluciontributaria from '../reducers/devoluciontributaria.reducer';

export const selectDevoluciontributariaState = createFeatureSelector<fromDevoluciontributaria.State>(
  fromDevoluciontributaria.devoluciontributariaFeatureKey
);

export const getDevoluciontributariaSeleccionado = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.DevoluciontributariaSeleccionado
);

export const getDatosDevolucion = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.DatosDevolucion
);

export const getDatosAlmacenadosSolicitud = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.DatosAlmacenadosSolicitud
);

export const getConcepto = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.Concepto
);

export const getInfoDevolucionTributaria = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.InfoDevolucionTributaria
);

export const getDatosOrdenesPago = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.DatosOrdenesPago
);

export const getDatosContabilizacion = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.DatosContabilizacion
);

export const getContabilizacion = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.Contabilizacion
);

export const selectDevolucionTributaria = createSelector(
  selectDevoluciontributariaState,
  (state: fromDevoluciontributaria.State) => state.DevolucionTributaria
);
