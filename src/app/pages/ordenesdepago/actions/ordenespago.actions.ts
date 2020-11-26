import { createAction, props } from '@ngrx/store';

export const loadOrdenesdepago = createAction(
  '[Ordenes] Load Ordenes'
);

export const loadOrdenPagoSeleccionado = createAction(
  '[OrdenesPago] Load OrdenesPago Seleccionado',
  props(),
);




