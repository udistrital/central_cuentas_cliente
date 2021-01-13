import { createAction, props } from '@ngrx/store';

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


