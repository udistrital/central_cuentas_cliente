import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AprobacionesEffects } from './aprobaciones.effects';

describe('AprobacionesEffects', () => {
  const actions$: Observable<any> = new Observable ();
  let effects: AprobacionesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AprobacionesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<AprobacionesEffects>(AprobacionesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
