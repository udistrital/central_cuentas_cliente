import { Action, createReducer, on } from '@ngrx/store';
import * as DevoluciontributariaActions from '../actions/devoluciontributaria.actions';
import { cargarDatosAlmacenadosSolicitud } from '../actions/devoluciontributaria.actions';

export const devoluciontributariaFeatureKey = 'solicitudesgiros';

export interface State {
  DevoluciontributariaSeleccionado: any;
  DatosDevolucion: any;
  DatosAlmacenadosSolicitud: any;
}

export const initialState: State = {
  DevoluciontributariaSeleccionado: null,
  DatosDevolucion: null,
  DatosAlmacenadosSolicitud: null,
};

const solicitudesgirosReducer = createReducer(
  initialState,

  on(DevoluciontributariaActions.loadDevoluciontributaria, state => state),
  on(DevoluciontributariaActions.loadDevoluciontributariaSeleccionado, (state, action) => ({
    ...state, DevoluciontributariaSeleccionado: state.DevoluciontributariaSeleccionado = action
  })),
  on(DevoluciontributariaActions.cargarDatosSolicitud, (state, action) => ({
    ...state, DatosDevolucion: state.DatosDevolucion = action
  })),
  on(DevoluciontributariaActions.cargarDatosAlmacenadosSolicitud, (state, action) => ({
    ...state, DatosAlmacenadosSolicitud: state.DatosAlmacenadosSolicitud = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
