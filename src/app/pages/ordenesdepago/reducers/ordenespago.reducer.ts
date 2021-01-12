import { Action, createReducer, on } from '@ngrx/store';
import * as OrdenespagoActions from '../actions/ordenespago.actions';

export const ordenespagoFeatureKey = 'ordenespago';

export interface State {
  OrdenpagoSeleccionado: any;
  AreaFuncional: any;
}

export const initialState: State = {
  OrdenpagoSeleccionado: null,
  AreaFuncional: null
};

const ordenespagoReducer = createReducer(
  initialState,

  on(OrdenespagoActions.loadOrdenesdepago, state => state),
  on(OrdenespagoActions.loadOrdenPagoSeleccionado, (state, action) => ({
    ...state, OrdenpagoSeleccionado: state.OrdenpagoSeleccionado = action
  })),
  on(OrdenespagoActions.seleccionarAreaFuncional, (state, action) => ({
    ...state, AreaFuncional: state.AreaFuncional = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return ordenespagoReducer(state, action);
}
