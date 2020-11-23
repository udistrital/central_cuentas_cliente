import { Action, createReducer, on } from '@ngrx/store';
import * as AprobacionesActions from '../actions/aprobaciones.actions';

export const aprobacionesFeatureKey = 'aprobaciones';

export interface State {

}

export const initialState: State = {

};

const aprobacionesReducer = createReducer(
  initialState,

  on(AprobacionesActions.loadAprobacioness, state => state),
  on(AprobacionesActions.loadAprobacionessSuccess, (state, action) => state),
  on(AprobacionesActions.loadAprobacionessFailure, (state, action) => state),

);

export function reducer(state: State | undefined, action: Action) {
  return aprobacionesReducer(state, action);
}
