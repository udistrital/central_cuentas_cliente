import { Action, createReducer, on } from '@ngrx/store';
import * as AnulacionesActions from '../actions/anulaciones.actions';

export const anulacionesFeatureKey = 'anulaciones';

export interface State {

}

export const initialState: State = {

};

const anulacionesReducer = createReducer(
  initialState,

  on(AnulacionesActions.loadAnulacioness, state => state),
  on(AnulacionesActions.loadAnulacionessSuccess, (state, action) => state),
  on(AnulacionesActions.loadAnulacionessFailure, (state, action) => state),

);

export function reducer(state: State | undefined, action: Action) {
  return anulacionesReducer(state, action);
}
