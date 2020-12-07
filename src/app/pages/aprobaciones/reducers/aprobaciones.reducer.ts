import { Action, createReducer, on } from '@ngrx/store';
import * as AprobacionesActions from '../actions/aprobaciones.actions';

export const aprobacionesFeatureKey = 'aprobaciones';

export interface State {
  AprobacionesSeleccionado: any;
  DatosIniciales: any;
}

export const initialState: State = {
  AprobacionesSeleccionado: null,
  DatosIniciales: null,
};

const aprobacionesReducer = createReducer(
  initialState,

  on(AprobacionesActions.loadAprobacioness, state => state),
  on(AprobacionesActions.loadAprobacionesSeleccionado, (state, action) => ({
    ...state, AprobacionesSeleccionado: state.AprobacionesSeleccionado = action
  })),
  on(AprobacionesActions.cargarDatosIniciales, (state, action) => ({
    ...state, DatosIniciales: state.DatosIniciales = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return aprobacionesReducer(state, action);
}
