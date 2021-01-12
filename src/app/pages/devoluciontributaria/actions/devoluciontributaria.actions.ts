import { createAction, props } from '@ngrx/store';

export const loadDevoluciontributaria = createAction(
  '[Devoluciontributaria] Load Devoluciontributaria'
);

export const loadDevoluciontributariaSeleccionado = createAction(
  '[Devoluciontributaria] Load Devoluciontributaria Seleccionado',
  props(),
);

export const cargarDatosSolicitud = createAction(
  '[Devoluciontributaria] Cargar DatosSolicitud',
  props(),
);



