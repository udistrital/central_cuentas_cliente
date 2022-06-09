import { createAction, props } from '@ngrx/store';

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

export const loadDocumentos = createAction(
  '[RelacionDevoluciones] Load Documentos',
  props<{DocumentosOrden: any}>(),
);

export const getOrdenesDevolucion = createAction(
  '[RelacionDevoluciones] Obtener ordenes de devolucion del crud de central de cuentas',
  props<{sortby: string[], order: string[]}>(),
);

export const getRelacionDevoluciones = createAction(
  '[RelacionDevoluciones] Obtener relacion de devoluciones del crud de central de cuentas',
  props<{sortby: string[], order: string[]}>(),
);

export const cargarOrdenDevolucion = createAction(
  '[RelacionDevoluciones] carga la orden de devolución al store',
  props(),
);

export const cargarRelacionDevoluciones = createAction(
  '[RelacionDevoluciones] Cargar relacion de devoluciones',
  props(),
);

export const cargarRelacionDevolucion = createAction(
  '[RelacionDevoluciones] Cargar relacion de devolucion',
  props(),
);

export const cargarInfoRelacionDevolcuines = createAction(
  '[RelacionDevoluciones] Cargar info de la relación de devoluciones',
  props(),
);

export const cargarDatosRelacion = createAction(
  '[RelacionDevoluciones] Cargar datos de la relación de devoluciones',
  props(),
);

export const crearRelacionDevoluciones = createAction(
  '[RelacionDevoluciones] Crear relacion de devoluciones en el crud de central de cuentas',
  props<{element: any}>(),
);

export const actualizarRelacionDevoluciones = createAction(
  '[RelacionDevoluciones] Actualiza la relacion de devoluciones en el crud de central cuentas',
  props<{id: any, element: any, path?: string}>(),
);
