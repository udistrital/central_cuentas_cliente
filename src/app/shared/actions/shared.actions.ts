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

// Fila Seleccionado

export const LoadFilaSeleccionada = createAction(
  '[Shared] Load Fila Seleccionada',
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
