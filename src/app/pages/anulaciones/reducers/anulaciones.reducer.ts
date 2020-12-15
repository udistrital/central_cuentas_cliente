import { Action, createReducer, on } from '@ngrx/store';
import * as AnulacionesActions from '../actions/anulaciones.actions';

export const anulacionesFeatureKey = 'anulaciones';

export interface State {
  AnulacionesSeleccionado: any;
}

export const initialState: State = {
  AnulacionesSeleccionado: null,
};

const anulacionesReducer = createReducer(
  initialState,

  on(AnulacionesActions.loadAnulacioness, state => state),
  on(AnulacionesActions.loadAnulacionesSeleccionado, (state, action) => ({
    ...state, AnulacionesSeleccionado: state.AnulacionesSeleccionado = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return anulacionesReducer(state, action);
}
