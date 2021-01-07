import { createAction, props } from '@ngrx/store';

export const loadBorrados = createAction(
  '[Borrado] Load Borrados'
);

export const cargarDatosCuenta = createAction (
  '[Borrado] Cargar DatosCuenta',
  props(),
);

export const cargarDatosElegidos = createAction (
  '[Borrado] Cargar DatosElegidos',
  props(),
);

export const cargarDatosJustificacion = createAction (
  '[Borrado] Cargar DatosJustificacion',
  props(),
);



