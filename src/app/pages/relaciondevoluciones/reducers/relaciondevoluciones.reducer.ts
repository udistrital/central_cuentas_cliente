import { Action, createReducer, on } from '@ngrx/store';
import * as RelacionDevolucionesActions from '../actions/relaciondevoluciones.actions';

export const relaciondevolucionesFeatureKey = 'relaciondevoluciones';

export interface State {
  OrdenesDevolucion: any;
  RelacionDevoluciones: any;
  DatosRelacion: any;
  InfoRelacionDevoluciones: any;
}

export const initialState: State = {
  OrdenesDevolucion: null,
  RelacionDevoluciones: null,
  DatosRelacion: null,
  InfoRelacionDevoluciones: null,
};

const relaciondevolucionesReducer = createReducer(
  initialState,

  on(RelacionDevolucionesActions.loadDocumentos, state => state),
  on(RelacionDevolucionesActions.cargarOrdenDevolucion, (state, action) => ({
    ...state, OrdenesDevolucion: state.OrdenesDevolucion = action
  })),
  on(RelacionDevolucionesActions.cargarRelacionDevoluciones, (state, action) => ({
    ...state, RelacionDevoluciones: state.RelacionDevoluciones = action
  })),
  on(RelacionDevolucionesActions.cargarInfoRelacionDevolcuines, (state, action) => ({
    ...state, InfoRelacionDevoluciones: state.InfoRelacionDevoluciones = action
  })),
  on(RelacionDevolucionesActions.cargarDatosRelacion, (state, action) => ({
    ...state, DatosRelacion: state.InfoRelacionDevoluciones = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return relaciondevolucionesReducer(state, action);
}
