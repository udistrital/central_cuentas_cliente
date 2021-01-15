import { Action, createReducer, on } from '@ngrx/store';
import * as SolicitudDevolucionActions from '../actions/solicitud-devolucion.actions';

export const solicitudDevolucionFeatureKey = 'solicitudDevolucion';

export interface State {
  TipoDevolucion: any;
  DatosSolicitud: any;
  DatosSolicitante: any;
  DatosTablaAnexos: any;
  DatosTablaImpuestos: any;
  TotalSolicitado: any;
}

export const initialState: State = {
  TipoDevolucion: null,
  DatosSolicitud: null,
  DatosSolicitante: null,
  DatosTablaAnexos: [],
  DatosTablaImpuestos: [],
  TotalSolicitado: 0
};

const solicitudDevolucionReducer = createReducer(
  initialState,

  on(SolicitudDevolucionActions.loadSolicitudDevolucions, state => state),
  on(SolicitudDevolucionActions.seleccionarTipoDevolucion, (state, action) => ({
    ...state, TipoDevolucion: state.TipoDevolucion = action
  })),
  on(SolicitudDevolucionActions.seleccionarDatosSolicitud, (state, action) => ({
    ...state, DatosSolicitud: state.DatosSolicitud = action
  })),
  on(SolicitudDevolucionActions.seleccionarDatosSolicitante, (state, action) => ({
    ...state, DatosSolicitante: state.DatosSolicitante = action
  })),
  on(SolicitudDevolucionActions.seleccionarDatosTablaAnexos, (state, action) => ({
    ...state, DatosTablaAnexos: state.DatosTablaAnexos = action
  })),
  on(SolicitudDevolucionActions.seleccionarDatosTablaImpuestos, (state, action) => ({
    ...state, DatosTablaImpuestos: state.DatosTablaImpuestos = action
  })),
  on(SolicitudDevolucionActions.cambiarTotalSolicitado, (state, action) => ({
    ...state, TotalSolicitado: state.TotalSolicitado = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return solicitudDevolucionReducer(state, action);
}
