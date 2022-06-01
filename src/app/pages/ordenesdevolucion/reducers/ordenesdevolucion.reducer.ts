import { Action, createReducer, on } from '@ngrx/store';
import * as OrdenesDevolucionActions from '../actions/ordenesdevolucion.actions';

export const ordenesdevolucionFeatureKey = 'ordenesdevolucion';

export interface State {
  DocumentosOrden: any;
}

export const initialState: State = {
  DocumentosOrden: null,
};

const solicitudesgirosReducer = createReducer(
  initialState,

  on(OrdenesDevolucionActions.loadDocumentos, (state, action) => ({
    ...state, DocumentosOrden: state.DocumentosOrden = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
