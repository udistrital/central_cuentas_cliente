import { Action, createReducer, on } from '@ngrx/store';
import * as SolicitudesgirosActions from '../actions/solicitudesgiros.actions';

export const solicitudesgirosFeatureKey = 'solicitudesgiros';

export interface State {
  SolicitudgiroSeleccionado: any;
}

export const initialState: State = {
  SolicitudgiroSeleccionado: null,
};

const solicitudesgirosReducer = createReducer(
  initialState,

  on(SolicitudesgirosActions.loadSolicitudesgiros, state => state),
  on(SolicitudesgirosActions.loadSolicitudgiroSeleccionado, (state, action) => ({
    ...state, SolicitudgiroSeleccionado: state.SolicitudgiroSeleccionado = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
