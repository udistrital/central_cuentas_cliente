import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBorrado from '../reducers/borrado.reducer';

export const selectBorradoState = createFeatureSelector<fromBorrado.State>(
  fromBorrado.borradoFeatureKey
);
