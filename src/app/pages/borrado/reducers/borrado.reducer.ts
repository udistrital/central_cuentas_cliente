import { Action, createReducer, on } from '@ngrx/store';
import * as BorradoActions from '../actions/borrado.actions';

export const borradoFeatureKey = 'borrado';

export interface State {
  DatosCuenta: any,
  DatosEligidos: any,
  DatosJustificacion: any,
}

export const initialState: State = {
  DatosCuenta: null,
  DatosEligidos: null,
  DatosJustificacion: null,
};

const borradoReducer = createReducer(
  initialState,

  on(BorradoActions.loadBorrados, state => state),
  on(BorradoActions.cargarDatosCuenta, (state, action) => ({
    ...state, DatosCuenta: state.DatosCuenta = action
  })),
  on(BorradoActions.cargarDatosElegidos, (state, action) => ({
    ...state, DatosElegidos: state.DatosEligidos = action
  })),
  on(BorradoActions.cargarDatosJustificacion, (state, action) => ({
    ...state, DatosJustificacion: state.DatosJustificacion = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return borradoReducer(state, action);
}
