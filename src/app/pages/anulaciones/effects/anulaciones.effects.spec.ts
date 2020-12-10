import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AnulacionesEffects } from './anulaciones.effects';

describe('AnulacionesEffects', () => {
  let actions$: Observable<any>;
  let effects: AnulacionesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnulacionesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<AnulacionesEffects>(AnulacionesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
