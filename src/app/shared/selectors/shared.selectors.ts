import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from '../reducers/shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);

export const getArbolRubro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ArbolRubro
);

export const getNodoSeleccionado = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.NodoSeleccionado
);

export const getSolicitudGiroSeleccionada = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.SolicitudGiroSeleccionada
);

export const getFilaSeleccionada = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.FilaSeleccionada
);

export const getAddSelected = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.AddSelected
);

export const getAccionTabla = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.AccionTabla
);

export const getConceptosContables = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ConceptosContables
);

export const selectTiposID = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.TiposID
);

export const selectDatosID = createSelector(
  selectSharedState,
  (state: fromShared.State, clave: string) => state.DatosID[clave]
);

export const getUsuario = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Usuario
);
export const selectVigencias = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Vigencias
);

export const selectConceptos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Conceptos
);

export const selectDocumentos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.DocumentosCarga
);

export const selectDocumentosDescarga = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.DocumentosDescarga
);

export const selectSolicitudesGiro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.SolicitudesGiro
);

export const selectVigenciasNoFuturas = createSelector(
  selectSharedState,
  (state: fromShared.State) => {
    if (state.Vigencias && state.Vigencias[0])
      state.Vigencias[0] = state.Vigencias[0].filter(
        vigencia => vigencia.estado !== 'Futura');
    return state.Vigencias;
  }
);

export const getRubro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Rubro
);

export const selectTiposDocumentos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.TiposDocumentos
);

export const selectProcesoConfiguracion = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Proceso
);

export const selectConsecutivo = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Consecutivo
);

export const selectSolicitudesGiroShared = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.SolicitudesGiroShared
);

export const selectTiposCompromisos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.TiposCompromisos
);

export const selectConvenios = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Convenios
);

export const selectTiposOrdenesPago = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.TiposOrdenesPago
);

export const selectRPExpedido = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.RPExpedido
);

export const selectRPParcialComprometido = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.RPParcialComprometido
);

export const selectRPBeneficiario = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.RPBeneficiario
);

export const selectRubrosCrp = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.RubrosCrp
);

export const selectBeneficiarioOP = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.BeneficiarioOP
);

export const selectBeneficiarioEndoso = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.BeneficiarioEndoso
);

export const selectHistorialOP = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.HistorialOP
);


export const selectEntradaAlmacen = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.EntradaAlmacen
);

export const selectInfoRubro = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.InfoRubro
);

export const selectInfoNecesidad = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.InfoNecesidad
);

export const selectMetaNecesidad = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.MetaNecesidad
);

export const selectActividadNecesidad = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ActividadNecesidad
);

export const selectRetenciones = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Retenciones
);

export const getArbolCuentaContable = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ArbolCuentaContable
);

export const getNodoSeleccionadoCuentaContable = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.NodoSeleccionadoCuentaContable
);

export const getNodoSeleccionadoConcepto = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.NodoSeleccionadoConcepto
);

export const seleccionarConceptos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.ConceptosContables
);

export const seleccionarConcepto = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Concepto
);

export const selectInfoCuentaContable = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.InfoCuentaContable
);

export const selectInfoCuentaContableDebito = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.InfoCuentaContableDebito
);

export const selectInfoCuentaContableEndoso = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.InfoCuentaContableEndoso
);

export const selectSupervisor = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Supervisor
);

export const selectOrdenesPagoById = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.OrdenesPagoById
);

export const selectOrdenesPagoByDoc = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.OrdenesPagoByDoc
);

export const selectDevolucionTributariaById = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.DevolucionTributariaById
);

export const selectOrdenDEvolucionById = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.OrdenDevolucionById
);

export const selectRelacionDevolucionesById = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.RelacionDevolucionesById
);

export const selectBancos = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Bancos
);

export const selectParametros = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Parametros
);

export const selectRazonesDevolucion = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.RazonesDevolucion
);

export const selectFormasPago = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.FormasPago
);

export const selectTiposComprobante = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.TiposComprobante
);

export const selectComprobantes = createSelector(
  selectSharedState,
  (state: fromShared.State) => state.Comprobantes
);
