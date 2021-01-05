import { createAction, props } from '@ngrx/store';

export const loadSolicitudDevolucions = createAction(
  '[SolicitudDevolucion] Load SolicitudDevolucions'
);

export const seleccionarTipoDevolucion = createAction(
  '[SolicitudDevolucion] Seleccionar TipoDevolucion',
  props()
);


