import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrdenesdevolucion from '../reducers/ordenesdevolucion.reducer';

export const selectOrdenesdevolucionState = createFeatureSelector<fromOrdenesdevolucion.State>(
  fromOrdenesdevolucion.ordenesdevolucionFeatureKey
);

export const selectDatosSolicitante = createSelector(
  selectOrdenesdevolucionState,
  (state: fromOrdenesdevolucion.State) => state.DatosSolicitante
);

export const selectDatosBeneficiario = createSelector(
  selectOrdenesdevolucionState,
  (state: fromOrdenesdevolucion.State) => state.DatosBeneficiario
);

export const selectDocumentosBeneficiario = createSelector(
  selectOrdenesdevolucionState,
  (state: fromOrdenesdevolucion.State) => state.DocumentosBeneficiario
);

export const selectDatosContabilizacion = createSelector(
  selectOrdenesdevolucionState,
  (state: fromOrdenesdevolucion.State) => state.DatosContabilizacion
);

export const selectContabilizacion = createSelector(
  selectOrdenesdevolucionState,
  (state: fromOrdenesdevolucion.State) => state.Contabilizacion
);

export const selectOrdenesDevolucion = createSelector(
  selectOrdenesdevolucionState,
  (state: fromOrdenesdevolucion.State) => state.OrdenesDevolucion
);
