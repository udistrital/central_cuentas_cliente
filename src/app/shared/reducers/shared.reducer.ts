import { Action, createReducer, on } from '@ngrx/store';
import * as SharedActions from '../actions/shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  ArbolRubro: any;
  NodoSeleccionado: any;
  FilaSeleccionada: any;
  AccionTabla: any;
  VigenciaActual: any;
  AreaFuncional: any;
  CentroGestor: any;
  ConceptosContables: any;
  TiposID: any;
  DatosID: any;
  Usuario: any;
  Vigencias: any;
}

export const initialState: State = {
  ArbolRubro: [],
  NodoSeleccionado: null,
  FilaSeleccionada: null,
  AccionTabla: null,
  VigenciaActual: null,
  AreaFuncional: null,
  CentroGestor: null,
  ConceptosContables: [],
  TiposID: null,
  DatosID: {},
  Usuario: null,
  Vigencias: null
};

const sharedReducer = createReducer(
  initialState,

  on(SharedActions.loadShareds, state => state),
  on(SharedActions.LoadArbolRubro, (state, action) => ({
    ...state, ArbolRubro: state.ArbolRubro = action
  })),
  on(SharedActions.LoadNodoSeleccionado, (state, action) => ({
    ...state, NodoSeleccionado: state.NodoSeleccionado = action
  })),
  on(SharedActions.LoadFilaSeleccionada, (state, action) => ({
    ...state, FilaSeleccionada: state.FilaSeleccionada = action
  })),
  on(SharedActions.LoadAccionTabla, (state, action) => ({
    ...state, AccionTabla: state.AccionTabla = action
  })),
  on(SharedActions.LoadVigenciaActual, (state, action) => ({
    ...state, VigenciaActual: state.VigenciaActual = action
  })),
  on(SharedActions.LoadAreaFuncional, (state, action) => ({
    ...state, AreaFuncional: state.AreaFuncional = action
  })),
  on(SharedActions.LoadConceptosContables, (state, action) => ({
    ...state, ConceptosContables: state.ConceptosContables = action
  })),
  on(SharedActions.loadTiposID, (state, action) => ({
    ...state, TiposID: state.TiposID = action
  })),
  on(SharedActions.loadDatosID, (state, action) => {
    state.DatosID[action.clave] = action;
    return ({
      ...state, DatosID: state.DatosID = Object.assign({}, state.DatosID)
    });
  }),
  on(SharedActions.loadUsuario, (state, action) => ({
    ...state, Usuario: state.Usuario = action
  })),
  on(SharedActions.loadVigencias, (state, action) => ({
    ...state, Vigencias: state.Vigencias = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return sharedReducer(state, action);
}
