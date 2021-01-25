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
export const getDatosMovimientoContable = createSelector(
  selectOrdenespagoState,
  (state: fromOrdenespago.State) => state.DatosMovimientoContable
);
