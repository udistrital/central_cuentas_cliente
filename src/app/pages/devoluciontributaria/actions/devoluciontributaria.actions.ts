import { createAction, props } from '@ngrx/store';

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

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

export const cargarDatosAlmacenadosSolicitud = createAction(
  '[Devoluciontributaria] Cargar DatosAlmacenadosSolicitud',
  props(),
);

export const cargarConcepto = createAction(
  '[Devoluciontributaria] Cargar Concepto',
  props(),
);

export const loadInfoDevolucionTributaria = createAction(
  '[Devoluciontributaria] Load Informacion Devolucion Tributaria',
  props(),
);

export const cargarDatosOrdenesPago = createAction(
  '[Devoluciontributaria] Cargar Datos Ordenes Pago',
  props(),
);

export const cargarDatosContabilizacion = createAction(
  '[Devoluciontributaria] Cargar Datos Contabilizacion',
  props(),
);

export const cargarContabilizacion = createAction(
  '[Devoluciontributaria] Cargar Contabilizacion',
  props(),
);

export const crearDevolucionTributaria = createAction(
  '[Devoluciontributaria] Crea la devolucion tributaria en el crud de central cuentas',
  props<{element: any}>(),
);

export const actualizarDevolucionTributaria = createAction(
  '[Devoluciontributaria] Actualiza la devolucion tributaria en el crud de central cuentas',
  props<{id: any, element: any, path?: string}>(),
);

export const cargarDevolucionTributaria = createAction(
  '[Devoluciontributaria] carga la devolucion tributaria al store',
  props(),
);

export const getDevolucionesTributarias = createAction(
  '[Devoluciontributaria] Obtener devoluciones tributarias del crud de central de cuentas',
  props<{sortby: string[], order: string[]}>(),
);
