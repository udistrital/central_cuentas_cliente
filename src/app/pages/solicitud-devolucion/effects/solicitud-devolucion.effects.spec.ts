import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SolicitudDevolucionEffects } from './solicitud-devolucion.effects';

describe('SolicitudDevolucionEffects', () => {
  let actions$: Observable<any>;
  let effects: SolicitudDevolucionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SolicitudDevolucionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<SolicitudDevolucionEffects>(SolicitudDevolucionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
