import { Action, createReducer, on } from '@ngrx/store';
import * as DevoluciontributariaActions from '../actions/devoluciontributaria.actions';

export const devoluciontributariaFeatureKey = 'solicitudesgiros';

export interface State {
  DevoluciontributariaSeleccionado: any;
}

export const initialState: State = {
  DevoluciontributariaSeleccionado: null,
};

const solicitudesgirosReducer = createReducer(
  initialState,

  on(DevoluciontributariaActions.loadDevoluciontributaria, state => state),
  on(DevoluciontributariaActions.loadDevoluciontributariaSeleccionado, (state, action) => ({
    ...state, DevoluciontributariaSeleccionado: state.DevoluciontributariaSeleccionado = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
