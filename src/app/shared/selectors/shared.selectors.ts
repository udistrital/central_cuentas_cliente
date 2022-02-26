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
  (state: fromShared.State, clave: string) => state.DatosID[clave]
);

export const getUsuario = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Usuario
);
export const selectVigencias = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Vigencias
);

export const selectConceptos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Conceptos
);

export const selectDocumentos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Documentos
);

export const selectVigenciasNoFuturas = createSelector(
  selectSharedState,
  (state: fromShared.State) => {
    if (state.Vigencias && state.Vigencias[0])
      state.Vigencias[0] = state.Vigencias[0].filter(
        vigencia => vigencia.estado !== 'Futura');
    return state.Vigencias;
  }
);
