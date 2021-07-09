import { Action, createReducer, on } from '@ngrx/store';
import * as SolicitudesgirosActions from '../actions/solicitudesgiros.actions';
import { getDocumentosgiro } from '../selectors/solicitudesgiros.selectors';

export const solicitudesgirosFeatureKey = 'solicitudesgiros';

export interface State {
  SolicitudgiroSeleccionado: any;
  InfoSolicitudgiro: any;
  Autorizaciongiro: any;
  Documentosgiro: any;
}

export const initialState: State = {
  SolicitudgiroSeleccionado: null,
  InfoSolicitudgiro: null,
  Autorizaciongiro: null,
  Documentosgiro: null
};

const solicitudesgirosReducer = createReducer(
  initialState,

  on(SolicitudesgirosActions.loadSolicitudesgiros, state => state),
  on(SolicitudesgirosActions.loadSolicitudgiroSeleccionado, (state, action) => ({
    ...state, SolicitudgiroSeleccionado: state.SolicitudgiroSeleccionado = action
  })),
  on(SolicitudesgirosActions.loadInfosolicitudgiro, (state, action) => ({
    ...state, InfoSolicitudgiro: state.InfoSolicitudgiro = action
  })),
  on(SolicitudesgirosActions.loadAutorizaciongiro, (state, action) => ({
    ...state, Autorizaciongiro: state.Autorizaciongiro = action
  })),
  on(SolicitudesgirosActions.loadDocumentos, (state, action) => ({
    ...state, Documentosgiro: state.Documentosgiro = action
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return solicitudesgirosReducer(state, action);
}
