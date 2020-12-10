import { createAction, props } from '@ngrx/store';

export const loadAnulacioness = createAction(
  '[Anulaciones] Load Anulacioness'
);

export const loadAnulacionessSuccess = createAction(
  '[Anulaciones] Load Anulacioness Success',
  props<{ data: any }>()
);

export const loadAnulacionessFailure = createAction(
  '[Anulaciones] Load Anulacioness Failure',
  props<{ error: any }>()
);
