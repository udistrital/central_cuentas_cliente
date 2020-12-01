import { createAction, props } from '@ngrx/store';

export const loadAprobacioness = createAction(
  '[Aprobaciones] Load Aprobacioness'
);

export const loadAprobacionesSeleccionado= createAction(
  '[Aprobaciones] Load Aprobaciones Seleccionado',
  props(),
);

export const cargarDatosIniciales= createAction(
  '[DatosIniciales] Cargar DatosIniciales',
  props(),
);

export const cargarDatosSecundarios = createAction(
  '[DatosSecundarios] Cargar DatosSecundarios',
  props(),
);

/* export const loadAprobacionessSuccess = createAction(
  '[Aprobaciones] Load Aprobacioness Success',
  props<{ data: any }>()
);

export const loadAprobacionessFailure = createAction(
  '[Aprobaciones] Load Aprobacioness Failure',
  props<{ error: any }>()
); */
