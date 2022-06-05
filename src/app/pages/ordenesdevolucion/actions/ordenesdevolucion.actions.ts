import { createAction, props } from '@ngrx/store';

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

export const loadDocumentos = createAction(
  '[OrdenesDevolucion] Load Documentos',
  props<{DocumentosOrden: any}>(),
);

export const cargarDatosSolicitante = createAction(
  '[OrdenesDevolucion] Cargar Datos Solicitante',
  props(),
);

export const cargarDatosBeneficiario = createAction(
  '[OrdenesDevolucion] Cargar Datos Beneficiario',
  props(),
);

export const cargarDocumentosBeneficiario = createAction(
  '[OrdenesDevolucion] Cargar Documentos del Beneficiario',
  props(),
);

export const cargarDatosContabilizacion = createAction(
  '[OrdenesDevolucion] Cargar Datos de contabilizacion',
  props(),
);

export const cargarContabilizacion = createAction(
  '[OrdenesDevolucion] Cargar contabilizacion',
  props(),
);

export const crearOrdenDevolucion = createAction(
  '[OrdenesDevolucion] Crear Orden de devolucion en el crud de central de cuentas',
  props<{element: any}>(),
);

export const actualizarOrdenDevolucion = createAction(
  '[OrdenesDevolucion] Actualizar Orden de devolucion en el crud de central de cuentas',
  props<{id: any, element: any}>(),
);

export const cargarOrdenDevolucion = createAction(
  '[OrdenesDevolucion] carga la orden de devolución al store',
  props(),
);

export const getOrdenesDevolucion = createAction(
  '[OrdenesDevolucion] Obtener ordenes de devolucion del crud de central de cuentas',
  props<{sortby: string[], order: string[]}>(),
);
