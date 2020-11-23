import { createAction, props } from '@ngrx/store';

export const loadAprobacioness = createAction(
  '[Aprobaciones] Load Aprobacioness'
);

export const loadAprobacionessSuccess = createAction(
  '[Aprobaciones] Load Aprobacioness Success',
  props<{ data: any }>()
);

export const loadAprobacionessFailure = createAction(
  '[Aprobaciones] Load Aprobacioness Failure',
  props<{ error: any }>()
);
