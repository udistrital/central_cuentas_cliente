import { createAction, props } from '@ngrx/store';

export const CatchError = createAction(
  '[Shared] Catch Error',
  props<{}>()
);

export const loadDocumentos = createAction(
  '[OrdenesDevolucion] Load Documentos Giro',
  props(),
);
