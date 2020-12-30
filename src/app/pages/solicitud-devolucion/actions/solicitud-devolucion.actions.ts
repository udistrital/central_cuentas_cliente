import { createAction, props } from '@ngrx/store';

export const loadSolicitudDevolucions = createAction(
  '[SolicitudDevolucion] Load SolicitudDevolucions'
);

export const seleccionarTipoDevolucion = createAction(
  '[TipoDevolucion] Seleccionar TipoDevolucion',
  props()
);


