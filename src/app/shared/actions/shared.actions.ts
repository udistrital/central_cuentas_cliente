import { createAction, props } from '@ngrx/store';

export const loadShareds = createAction(
  '[Shared] Load Shareds'
);

// Errores

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

// Acciones Arbol

export const GetArbolRubro = createAction(
  '[Shared] Get Arbol Rubro',
  props<{ branch: any }>()
);

export const LoadArbolRubro = createAction(
  '[Shared] Load Arbol Rubro',
  props()
);

// Nodo Seleccionado

export const LoadNodoSeleccionado = createAction(
  '[Shared] Load Nodo Seleccionado',
  props()
);

export const loadSolicitudGiroSeleccionada = createAction(
  '[Shared] Load Solicitud Giro Seleccionada',
  props()
);

// Fila Seleccionado

export const LoadFilaSeleccionada = createAction(
  '[Shared] Load Fila Seleccionada',
  props()
);

// Agregar checked seleccionado

export const AddSelected = createAction(
  '[Shared] Agrega checked seleccionado',
  props()
);

// Accion General de Tabla

export const LoadAccionTabla = createAction(
  '[Shared] Load Accion Tabla',
  props()
);

// Acciones Vigencia

export const GetVigenciaActual = createAction(
  '[Shared] Get Vigencia Actual',
  props<{ offset: number }>()
);

export const LoadVigenciaActual = createAction(
  '[Shared] Load Vigencia Actual',
  props()
);

// Area Funcional

export const LoadAreaFuncional = createAction(
  '[Shared] Load Area Funcional',
  props()
);

// Conceptos Contables

export const GetConceptosContables = createAction(
  '[Shared] Get Conceptos Contables',
  props<{ id?: any }>()
);

export const LoadConceptosContables = createAction(
  '[Shared] Load Conceptos Contables',
  props()
);

// Tipos ID de terceros

export const getTiposID = createAction(
  '[Shared] Get Tipos Identificacion'
);

export const loadTiposID = createAction(
  '[Shared] Load Tipos Identificacion',
  props()
);

// Datos de ID de terceros

export const getDatosID = createAction(
  '[Shared] Get Datos Identificacion',
  props<{ clave: string, numero?: string, tipo?: number, limit?: number, fields?: string }>()
);

export const loadDatosID = createAction(
  '[Shared] Load Datos Identificacion',
  props<{ clave: string, datosId: any }>()
);

// obtener numero de documento de usuario logueado

export const loadUsuario = createAction(
  '[Shared] Load Usuario',
  props()
);

// Vigencias

export const getVigencias = createAction(
  '[Shared] Get Vigencias'
);

export const loadVigencias = createAction(
  '[Shared] Load Vigencias',
  props()
);

export const getConceptos = createAction(
  '[Shared] Obtiene conceptos del crud de parametros',
  props<{ query?: any }>()
);

export const loadConceptos = createAction(
  '[Shared] Carga los conceptos al store',
  props()
);

export const subirDocumentos = createAction(
  '[Shared] Subir documentos a nuxeo',
  props<{ element: any }>()
);

export const cargarDocumentos = createAction(
  '[Shared] Cargar documentos al store',
  props()
);

export const descargarDocumentos = createAction(
  '[Shared] Descargar documentos al store',
  props()
);

export const getDocumentos = createAction(
  '[Shared] Obtiene documentos del gestor documental',
  props<{uid: string }>()
);

export const getSolicitudesById = createAction(
  '[Shared] Obtiene las solicitudes de giro por id del crud',
  props<{id: string}>()
);

export const cargarSolicitudesById = createAction(
  '[Shared] Carga las solicitudes por id al store',
  props()
);

export const obtenerRubro = createAction(
  '[Shared] Obtener rubro por codigo desde el crud de plan cuentas',
  props<{codRubro: any}>()
);

export const cargarRubro = createAction(
  '[Shared] Cargar rubro al store',
  props()
);

export const getTiposDocumentos = createAction(
  '[Shared] Obtiene tipos de documentos para cargar soportes del crud de parametros',
  props<{ query?: any }>()
);

export const loadTiposDocumentos = createAction(
  '[Shared] Carga los tipos de documentos para cargar soportes al store',
  props()
);

export const getProcesoConfiguracion = createAction(
  '[Shared] Obtiene los procesos del crud de configuracion',
  props<{ query?: any}>()
);

export const loadProcesoConfiguracion = createAction(
  '[Shared] Carga los procesos al store',
  props()
);

export const crearConsecutivo = createAction(
  '[Shared] Crea el consecutivo',
  props<{ element: any}> ()
);

export const loadConsecutivo = createAction(
  '[Shared] Carga el consecutivo al store',
  props()
);

export const getSolicitudesGiro = createAction(
  '[Shared] Obtener solicitudes de giro del crud de central de cuentas',
  props<{sortby: string[], order: string[], query?: any}>(),
);

export const cargarSolicitudesGiro = createAction(
  '[Shared] Carga solicitudes de giro al store',
  props(),
);

export const getTiposCompromisos = createAction(
  '[Shared] Obtener los tipos de compromisos del crud de parametros',
  props<{query?: any}>()
);

export const cargarTiposCompromisos = createAction(
  '[Shared] Carga tipos de compromisos al store',
  props(),
);

export const getConvenios = createAction(
  '[Shared] Obtener los convenios del crud',
  props<{codigo?: any}>()
);

export const cargarConvenios = createAction(
  '[Shared] Carga convenios al store',
  props(),
);

export const getTiposOrdenesPago = createAction(
  '[Shared] Obtiene los tipos de ordenes de pago del crud de parametros',
  props<{query?: any}>(),
);

export const cargarTiposOrdenesPago = createAction(
  '[Shared] Carga los tipos de ordenes de pago al store',
  props(),
);

export const getRPExpedido = createAction(
  '[Shared] Obtiene los rp expedidos del crud plan cuentas',
  props<{vigencia: any, centroGestor: any, query: any}>()
);

export const cargarRPExpedido = createAction(
  '[Shared] Carga los rp expedidos al store',
  props()
);

export const getRPParcialComprometido = createAction(
  '[Shared] Obtiene los rp parcialmente comprometidos del crud plan cuentas',
  props<{vigencia: any, centroGestor: any, query: any}>()
);

export const cargarRPParcialComprometido = createAction(
  '[Shared] Carga los rp parcialmente comprometidos al store',
  props()
);

export const getRPBeneficiario = createAction(
  '[Shared] Obtiene los rp del crud de plan cuentas segun el beneficiario',
  props<{query: any}>()
);

export const cargarRPBeneficiario = createAction(
  '[Shared] Carga los rp del beneficiario al store',
  props()
);

export const getRubrosCrp = createAction(
  '[Shared] Obtiene los rubros del crp seleccionado del crud',
  props<{vigencia: any, centroGestor: any, crp: any}>()
);

export const cargarRubrosCrp = createAction(
  '[Shared] Carga los rubros del crp seleccionado al store',
  props()
);

export const getHistorialOP = createAction(
  '[Shared] Obtiene las ordenes de pago con el mismo crp',
  props<{query: any}>()
);

export const cargarHistorialOP = createAction(
  '[Shared] Carga los rubros del crp seleccionado al store',
  props()
);

export const getBeneficiarioOP = createAction(
  '[Shared] Obtiene el beneficiario de la OP del crud admin_amazon',
  props<{query: any}>()
);
export const cargarBeneficiarioOP = createAction(
  '[Shared] Carga el beneficiario de la OP al store',
  props()
);

export const getBeneficiarioEndoso = createAction(
  '[Shared] Obtiene el beneficiario del endoso del crud admin_amazon',
  props<{query: any}>()
);

export const cargarBeneficiarioEndoso = createAction(
  '[Shared] Carga el beneficiario del endoso al store',
  props()
);


export const getEntradaAlmacen = createAction(
  '[Shared] Obtiene la entrada de almacen del crud de movimientos_arka',
  props<{query: any}>()
);

export const cargarEntradaAlmacen = createAction(
  '[Shared] Carga la entrada de almacen al store',
  props()
);

export const getInfoRubro = createAction(
  '[Shared] Obtiene la información del rubro del crud de plan cuentas',
  props<{rubro: any}>()
);

export const cargarInfoRubro = createAction(
  '[Shared] Carga la información del rubro al store',
  props()
);

export const getInfoNecesidad = createAction(
  '[Shared] Obtiene la información de la necesidad del mid de plan cuentas',
  props<{cdp: any}>()
);

export const cargarInfoNecesidad = createAction(
  '[Shared] Carga la información de la necesidad al store',
  props()
);

export const getMetaNecesidad = createAction(
  '[Shared] Obtiene la meta de la necesidad  del crud de plan de adquisiciones',
  props<{meta: any}>()
);

export const cargarMetaNecesidad = createAction(
  '[Shared] Carga la meta de la necesidad al store',
  props()
);

export const getActividadesNecesidad = createAction(
  '[Shared] Obtiene la actividad de la necesidad  del crud de plan de adquisiciones',
  props<{actividad: any}>()
);

export const cargarActividadesNecesidad = createAction(
  '[Shared] Carga la actividad de la necesidad al store',
  props()
);

export const getRetenciones = createAction(
  '[Shared] Obtiene las retenciones del crud de parametros',
  props<{query: any}>()
);

export const cargarRetenciones = createAction(
  '[Shared] Carga la retenciones al store',
  props()
);

export const LoadNodoSeleccionadoCuentaContable = createAction(
  '[Shared] Load Nodo Seleccionado Cuenta Contable ',
  props()
);

export const LoadNodoSeleccionadoConcepto = createAction(
  '[Shared] Load Nodo Seleccionado Concepto ',
  props()
);

export const GetArbolCuentaContable = createAction(
  '[Shared] Get Arbol Cuenta Contable',
  props()
);

export const LoadArbolCuentaContable = createAction(
  '[Shared] Load Arbol Cuenta Contable',
  props()
);

export const SeleccionarCuentaContable = createAction(
  '[Shared] Cargar cuentas contables al store',
  props()
);

export const getConcepto = createAction(
  '[Shared] Obtiene la info del concepto del crud de cuentas contables',
  props<{codigo: any}>()
);

export const cargarConcepto = createAction(
  '[Shared] Carga la info del concepto al store',
  props()
);

export const getInfoCuentaContable = createAction(
  '[Shared] Obtiene la info de la cuenta contable del crud de cuentas contables',
  props<{codigo: any}>()
);

export const cargarInfoCuentaContable = createAction(
  '[Shared] Carga la info de la cuenta contable al store',
  props()
);

export const getInfoCuentaContableDebito = createAction(
  '[Shared] Obtiene la info de la cuenta contable debito del crud de cuentas contables',
  props<{codigo: any}>()
);

export const cargarInfoCuentaContableDebito = createAction(
  '[Shared] Carga la info de la cuenta contable debito al store',
  props()
);

export const getInfoCuentaContableEndoso = createAction(
  '[Shared] Obtiene la info de la cuenta contable endoso del crud de cuentas contables',
  props<{codigo: any}>()
);

export const cargarInfoCuentaContableEndoso = createAction(
  '[Shared] Carga la info de la cuenta contable endoso al store',
  props()
);

export const getSupervisor = createAction(
  '[Shared] Obtiene info del supervisor del crud admin jbpm',
  props<{vigencia: any, documento: any}>()
);

export const cargarSupervisor = createAction(
  '[Shared] Carga la info del supervisor al store',
  props()
);

// ORDENES DE PAGO

export const getOrdenesPagoById = createAction(
  '[Shared] Obtiene la orden de pago por id del crud de central cuentas',
  props<{id: string}>()
);

export const cargarOrdenesPagoById = createAction(
  '[Shared] Carga la orden de pago por id al store',
  props()
);

export const getOrdenesPagoByDoc = createAction(
  '[Shared] Obtiene la orden de pago por el doc del beneficiario del crud de central cuentas',
  props<{documento: string}>()
);

export const cargarOrdenesPagoByDoc = createAction(
  '[Shared] Carga la orden de pago por doc del beneficiario al store',
  props()
);
