import { Action, createReducer, on } from '@ngrx/store';
import * as OrdenesDevolucionActions from '../actions/ordenesdevolucion.actions';

export const ordenesdevolucionFeatureKey = 'ordenesdevolucion';

export interface State {
  DocumentosOrden: any;
  DatosSolicitante: any;
  DatosBeneficiario: any;
  DocumentosBeneficiario: any;
  DatosContabilizacion: any;
  Contabilizacion: any;
  OrdenesDevolucion: any;
}

export const initialState: State = {
  DocumentosOrden: null,
  DatosSolicitante: null,
  DatosBeneficiario: null,
  DocumentosBeneficiario: null,
  DatosContabilizacion: null,
  Contabilizacion: null,
  OrdenesDevolucion: null,
};

const solicitudesgirosReducer = createReducer(
  initialState,

  on(OrdenesDevolucionActions.loadDocumentos, state => state),
  on(OrdenesDevolucionActions.cargarDatosSolicitante, (state, action) => ({
    ...state, DatosSolicitante: state.DatosSolicitante = action
  })),
  on(OrdenesDevolucionActions.cargarDatosBeneficiario, (state, action) => ({
    ...state, DatosBeneficiario: state.DatosBeneficiario = action
  })),
  on(OrdenesDevolucionActions.cargarDocumentosBeneficiario, (state, action) => ({
    ...state, DocumentosBeneficiario: state.DocumentosBeneficiario = action
  })),
  on(OrdenesDevolucionActions.cargarDatosContabilizacion, (state, action) => ({
    ...state, DatosContabilizacion: state.DatosContabilizacion = action
  })),
  on(OrdenesDevolucionActions.cargarContabilizacion, (state, action) => ({
    ...state, Contabilizacion: state.Contabilizacion = action
  })),
  on(OrdenesDevolucionActions.cargarOrdenDevolucion, (state, action) => ({
    ...state, OrdenesDevolucion: state.OrdenesDevolucion = action
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
