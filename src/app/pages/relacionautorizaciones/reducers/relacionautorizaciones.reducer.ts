import { Action, createReducer, on } from '@ngrx/store';
import * as RelacionautorizacionesActions from '../actions/relacionautorizaciones.actions';
import { loadRelacionautorizaciones } from '../actions/relacionautorizaciones.actions';

export const relacionautorizacionesFeatureKey = 'relacionautorizaciones';

export interface State {
  RelacionautorizacionesSeleccionado: any;
}

export const initialState: State = {
  RelacionautorizacionesSeleccionado: null,
};

const relacionautorizacionesReducer = createReducer(
  initialState,

  on(RelacionautorizacionesActions.loadRelacionautorizaciones, state => state),
  on(RelacionautorizacionesActions.loadRelacionautorizaciones, (state, action) => ({
    ...state, RelacionautorizacionesSeleccionado: state.RelacionautorizacionesSeleccionado = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return relacionautorizacionesReducer(state, action);
}
