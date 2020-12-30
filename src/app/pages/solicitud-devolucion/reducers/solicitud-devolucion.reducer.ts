import { Action, createReducer, on } from '@ngrx/store';
import * as SolicitudDevolucionActions from '../actions/solicitud-devolucion.actions';

export const solicitudDevolucionFeatureKey = 'solicitudDevolucion';

export interface State {
  TipoDevolucion: any;
}

export const initialState: State = {
  TipoDevolucion: null
};

const solicitudDevolucionReducer = createReducer(
  initialState,

  on(SolicitudDevolucionActions.loadSolicitudDevolucions, state => state),
  on(SolicitudDevolucionActions.seleccionarTipoDevolucion, (state, action) => ({
    ...state, ConceptosContables: state.TipoDevolucion = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudDevolucionReducer(state, action);
}
