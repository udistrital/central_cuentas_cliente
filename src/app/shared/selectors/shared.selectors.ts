import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from '../reducers/shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);

export const getArbolRubro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ArbolRubro
);

export const getNodoSeleccionado = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.NodoSeleccionado
);

export const getFilaSeleccionada = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.FilaSeleccionada
);

export const getAccionTabla = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.AccionTabla
);

export const getConceptosContables = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ConceptosContables
);

export const selectTiposID = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.TiposID
);

export const selectDatosID = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.DatosID
);

export const selectDatosIDMap = createSelector(
  selectSharedState,
  (state: fromShared.State) => {
    if (state.DatosID && state.DatosID[0])
    state.DatosID[0] = state.DatosID[0].map((tercero) => {
      return {
        TerceroId: {
          NombreCompleto: tercero.TerceroId.NombreCompleto,
          PrimerNombre: tercero.TerceroId.PrimerNombre,
          SegundoNombre: tercero.TerceroId.SegundoNombre,
          PrimerApellido: tercero.TerceroId.PrimerApellido,
          SegundoApellido: tercero.TerceroId.SegundoApellido,
        },
      };
    });
    return state.DatosID;
  }
);
