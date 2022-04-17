import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrdenespago from '../reducers/ordenespago.reducer';

export const selectOrdenespagoState = createFeatureSelector<fromOrdenespago.State>(
  fromOrdenespago.ordenespagoFeatureKey
);

export const getOrdenpagoSeleccionado = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.OrdenpagoSeleccionado
);

export const getDatosBeneficiario = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosBeneficiario
);

export const getDatosAlmacenadosBeneficiario = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosAlmacenadosBeneficiario
);

export const getDatosCompromiso = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosCompromiso
);

export const getDatosAlmacenadosCompromiso = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosAlmacenadosCompromiso
);
export const getAreaFuncional = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.AreaFuncional
);

export const getDatosImputacionPresupuestal = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosImputacionPresupuestal
);

export const getDatosImpuestosYRetenciones = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosImpuestosYRetenciones
);

export const getImpYRet = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.ImpYRet
);

export const getDatosMovimientoContable = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosMovimientoContable
);

export const getMovimientoContable = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.MovimientoContable
);

export const getInfoDatosBeneficiario = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.InfoDatosBeneficiario
);

export const getRP = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.RP
);

export const selectOrdenPago = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.OrdenPago
);

export const selectOrdenesPago = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.OrdenesPago
);
