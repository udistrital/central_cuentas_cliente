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
  DatosImputacionPresupuestal: any;
}

export const initialState: State = {
  OrdenpagoSeleccionado: null,
  DatosBeneficiario: null,
  DatosAlmacenadosBeneficiario: null,
  DatosCompromiso: null,
  DatosAlmacenadosCompromiso: null,
  AreaFuncional: null,
  DatosMovimientoContable: null,
  DatosImputacionPresupuestal: null,
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

);

export function reducer(state: State | undefined, action: Action) {
  return ordenespagoReducer(state, action);
}
