import { createAction, props } from '@ngrx/store';

export const loadShareds = createAction(
  '[Shared] Load Shareds'
);

// Errores

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

// Acciones Arbol

export const GetArbolRubro = createAction(
  '[Shared] Get Arbol Rubro',
  props<{ branch: any }>()
);

export const LoadArbolRubro = createAction(
  '[Shared] Load Arbol Rubro',
  props()
);

// Nodo Seleccionado

export const LoadNodoSeleccionado = createAction(
  '[Shared] Load Nodo Seleccionado',
  props()
);

// Fila Seleccionado

export const LoadFilaSeleccionada = createAction(
  '[Shared] Load Fila Seleccionada',
  props()
);

// Accion General de Tabla

export const LoadAccionTabla = createAction(
  '[Shared] Load Accion Tabla',
  props()
);

// Acciones Vigencia

export const GetVigenciaActual = createAction(
  '[Shared] Get Vigencia Actual',
  props<{ offset: number }>()
);

export const LoadVigenciaActual = createAction(
  '[Shared] Load Vigencia Actual',
  props()
);

// Area Funcional

export const LoadAreaFuncional = createAction(
  '[Shared] Load Area Funcional',
  props()
);

// Conceptos Contables

export const GetConceptosContables = createAction(
  '[Shared] Get Conceptos Contables',
  props<{ id?: any }>()
);

export const LoadConceptosContables = createAction(
  '[Shared] Load Conceptos Contables',
  props()
);

// Vigencias

export const getVigencias = createAction(
  '[Shared] Get Vigencias'
);

export const loadVigencias = createAction(
  '[Shared] Load Vigencias',
  props()
);
