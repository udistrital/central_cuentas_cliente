import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBorrado from '../reducers/borrado.reducer';

export const selectBorradoState = createFeatureSelector<fromBorrado.State>(
  fromBorrado.borradoFeatureKey
);

export const getDatosCuenta = createSelector (
  selectBorradoState,
  (state: fromBorrado.State) => state.DatosCuenta);

export const getDatosElegidos = createSelector (
  selectBorradoState,
  (state: fromBorrado.State) => state.DatosEligidos);

export const getDatosJustificacion = createSelector (
  selectBorradoState,
  (state: fromBorrado.State) => state.DatosJustificacion);
