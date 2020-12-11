import { createAction, props } from '@ngrx/store';

export const loadAnulacioness = createAction(
  '[Anulaciones] Load Anulacioness'
);

export const loadAnulacionesSeleccionado = createAction(
  '[Anulaciones] Cargar Anulaciones Seleccionado',
  props(),
);
