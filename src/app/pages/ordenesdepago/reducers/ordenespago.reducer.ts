import { Action, createReducer, on } from '@ngrx/store';
import * as OrdenespagoActions from '../actions/ordenespago.actions';

export const ordenespagoFeatureKey = 'ordenespago';

export interface State {
  OrdenpagoSeleccionado: any;
  DatosBeneficiario: any;
  DatosAlmacenadosBeneficiario: any;
  DatosCompromiso: any;
  DatosAlmacenadosCompromiso: any;
  AreaFuncional: any;
  DatosMovimientoContable: any;
  MovimientoContable: any;
  DatosImpuestosYRetenciones: any;
  DatosImputacionPresupuestal: any;
  ImpYRet: any;
  InfoDatosBeneficiario: any;
  RP: any;
  OrdenPago: any;
  OrdenesPago: any;
}

export const initialState: State = {
  OrdenpagoSeleccionado: null,
  DatosBeneficiario: null,
  DatosAlmacenadosBeneficiario: null,
  DatosCompromiso: null,
  DatosAlmacenadosCompromiso: null,
  AreaFuncional: null,
  DatosMovimientoContable: null,
  MovimientoContable: null,
  DatosImpuestosYRetenciones: null,
  ImpYRet: null,
  DatosImputacionPresupuestal: null,
  InfoDatosBeneficiario: null,
  RP: null,
  OrdenPago: null,
  OrdenesPago: null,
};

const ordenespagoReducer = createReducer(
  initialState,

  on(OrdenespagoActions.loadOrdenesdepago, state => state),
  on(OrdenespagoActions.loadOrdenPagoSeleccionado, (state, action) => ({
    ...state, OrdenpagoSeleccionado: state.OrdenpagoSeleccionado = action
  })),
  on(OrdenespagoActions.cargarDatosBeneficiario, (state, action) => ({
    ...state, DatosBeneficiario: state.DatosBeneficiario = action
  })),
  on(OrdenespagoActions.cargarDatosAlmacenadosBeneficiario, (state, action) => ({
    ...state, DatosAlmacenadosBeneficiario: state.DatosAlmacenadosBeneficiario = action
  })),
  on(OrdenespagoActions.cargarDatosCompromiso, (state, action) => ({
    ...state, DatosCompromiso: state.DatosCompromiso = action
  })),
  on(OrdenespagoActions.cargarDatosAlmacenadosCompromiso, (state, action) => ({
    ...state, DatosAlmacenadosCompromiso: state.DatosAlmacenadosCompromiso = action
  })),
  on(OrdenespagoActions.seleccionarAreaFuncional, (state, action) => ({
    ...state, AreaFuncional: state.AreaFuncional = action
  })),
  on(OrdenespagoActions.cargarDatosImputacionPresupuestal, (state, action) => ({
    ...state, DatosImputacionPresupuestal: state.DatosImputacionPresupuestal = action
  })),
  on(OrdenespagoActions.cargarDatosMovimientoContable, (state, action) => ({
    ...state, DatosMovimientoContable: state.DatosMovimientoContable = action
  })),
  on(OrdenespagoActions.cargarMovimientoContable, (state, action) => ({
    ...state, MovimientoContable: state.MovimientoContable = action
  })),
  on(OrdenespagoActions.cargarDatosImpuestosYRetenciones, (state, action) => ({
    ...state, DatosImpuestosYRetenciones: state.DatosImpuestosYRetenciones = action
  })),
  on(OrdenespagoActions.cargarImpYRet, (state, action) => ({
    ...state, ImpYRet: state.ImpYRet = action
  })),
  on(OrdenespagoActions.loadInfoDatosBeneficiario, (state, action) => ({
    ...state, InfoDatosBeneficiario: state.InfoDatosBeneficiario = action
  })),
  on(OrdenespagoActions.loadRP, (state, action) => ({
    ...state, RP: state.RP = action
  })),
  on(OrdenespagoActions.cargarOrdenPago, (state, action) => ({
    ...state, OrdenPago: state.OrdenPago = action
  })),
  on(OrdenespagoActions.cargarOrdenesPago, (state, action) => ({
    ...state, OrdenesPago: state.OrdenesPago = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return ordenespagoReducer(state, action);
}
