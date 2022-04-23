import { createAction, props } from '@ngrx/store';

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

export const loadOrdenesdepago = createAction(
  '[Ordenes] Load Ordenes'
);

export const loadOrdenPagoSeleccionado = createAction(
  '[OrdenesPago] Load OrdenesPago Seleccionado',
  props(),
);

export const cargarDatosBeneficiario = createAction(
  '[OrdenesPago] Cargar DatosBeneficiario',
  props(),
);

export const cargarDatosAlmacenadosBeneficiario = createAction(
  '[OrdenesPago] Cargar DatosAlmacenadosBeneficiario',
  props(),
);

export const cargarDatosCompromiso = createAction(
  '[OrdenesPago] Cargar DatosCompromiso',
  props(),
);

export const cargarDatosAlmacenadosCompromiso = createAction(
  '[OrdenesPago] Cargar DatosAlmacenadosCompromiso',
  props(),
);

export const seleccionarAreaFuncional = createAction(
  '[OrdenesPago] Seleccionar area funcional',
  props(),
);

export const cargarDatosImputacionPresupuestal = createAction(
  '[OrdenesPago] Cargar DatosImputacionPresupuestal',
  props(),
);

export const cargarDatosMovimientoContable = createAction(
  '[OrdenesPago] Cargar DatosMovimientoContable',
  props(),
);

export const cargarMovimientoContable = createAction(
  '[OrdenesPago] Cargar MovimientoContable',
  props(),
);

export const cargarImpYRet = createAction(
  '[OrdenesPago] Cargar Imp y Ret',
  props(),
);

export const cargarDatosImpuestosYRetenciones = createAction(
  '[OrdenesPago] Cargar DatosImpuestosYRetenciones',
  props(),
);

export const loadInfoDatosBeneficiario = createAction(
  '[OrdenesPago] Load Informacion Datos del beneficiario',
  props(),
);

export const loadRP = createAction(
  '[OrdenesPago] Load RPS',
  props(),
);

export const subirOrdenPago = createAction(
  '[OrdenesPago] sube la orden de pago al crud de central cuentas',
  props<{element: any}>(),
);

export const cargarOrdenesPago = createAction(
  '[OrdenesPago] Carga las ordenes de pago al store',
  props(),
);

export const cargarOrdenPago = createAction(
  '[OrdenesPago] Carga la orden de pago al store',
  props(),
);

export const getOrdenesPago = createAction(
  '[OrdenesPago] Obtener ordenes de pago del crud de central de cuentas',
  props<{sortby: string[], order: string[]}>(),
);
