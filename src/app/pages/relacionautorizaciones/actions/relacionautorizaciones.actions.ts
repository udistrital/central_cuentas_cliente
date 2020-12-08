import { createAction, props } from '@ngrx/store';

export const loadRelacionautorizaciones = createAction(
  '[Relacionautorizaciones] Load Relaciones'
);

export const loadRelacionautorizacionesSeleccionado = createAction(
  '[Relacionautorizaciones] Load Relacionautorizaciones Seleccionado',
  props(),
);




