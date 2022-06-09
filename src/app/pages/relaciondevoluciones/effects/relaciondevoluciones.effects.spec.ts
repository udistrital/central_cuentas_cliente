import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RelacionDevolucionesEffects } from './relaciondevoluciones.effects';

describe('SolicitudesgirosEffects', () => {
  const actions$: Observable<any> = new Observable();
  let effects: RelacionDevolucionesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RelacionDevolucionesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<RelacionDevolucionesEffects>(RelacionDevolucionesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
