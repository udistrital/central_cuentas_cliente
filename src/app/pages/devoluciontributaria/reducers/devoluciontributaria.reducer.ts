import { Action, createReducer, on } from '@ngrx/store';
import * as DevoluciontributariaActions from '../actions/devoluciontributaria.actions';
import { cargarDatosAlmacenadosSolicitud } from '../actions/devoluciontributaria.actions';

export const devoluciontributariaFeatureKey = 'solicitudesgiros';

export interface State {
  DevoluciontributariaSeleccionado: any;
  DatosDevolucion: any;
  DatosAlmacenadosSolicitud: any;
  Concepto: any;
  InfoDevolucionTributaria: any;
  DatosOrdenesPago: any;
  DatosContabilizacion: any;
  Contabilizacion: any;
  DevolucionTributaria: any;
}

export const initialState: State = {
  DevoluciontributariaSeleccionado: null,
  DatosDevolucion: null,
  DatosAlmacenadosSolicitud: null,
  Concepto: null,
  InfoDevolucionTributaria: null,
  DatosOrdenesPago: null,
  DatosContabilizacion: null,
  Contabilizacion: null,
  DevolucionTributaria: null,
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
  on(DevoluciontributariaActions.cargarConcepto, (state, action) => ({
    ...state, Concepto: state.Concepto = action
  })),
  on(DevoluciontributariaActions.loadInfoDevolucionTributaria, (state, action) => ({
    ...state, InfoDevolucionTributaria: state.InfoDevolucionTributaria = action
  })),
  on(DevoluciontributariaActions.cargarDatosOrdenesPago, (state, action) => ({
    ...state, DatosOrdenesPago: state.DatosOrdenesPago = action
  })),
  on(DevoluciontributariaActions.cargarDatosContabilizacion, (state, action) => ({
    ...state, DatosContabilizacion: state.DatosContabilizacion = action
  })),
  on(DevoluciontributariaActions.cargarContabilizacion, (state, action) => ({
    ...state, Contabilizacion: state.Contabilizacion = action
  })),
  on(DevoluciontributariaActions.cargarDevolucionTributaria, (state, action) => ({
    ...state, DevolucionTributaria: state.DevolucionTributaria = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
