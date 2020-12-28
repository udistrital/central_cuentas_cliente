import { Action, createReducer, on } from '@ngrx/store';
import * as BorradoActions from '../actions/borrado.actions';

export const borradoFeatureKey = 'borrado';

export interface State {

}

export const initialState: State = {

};

const borradoReducer = createReducer(
  initialState,

  on(BorradoActions.loadBorrados, state => state),

);

export function reducer(state: State | undefined, action: Action) {
  return borradoReducer(state, action);
}
