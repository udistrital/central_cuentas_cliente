import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BorradoEffects } from './borrado.effects';

describe('BorradoEffects', () => {
  const actions$: Observable<any> = new Observable();
  let effects: BorradoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BorradoEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<BorradoEffects>(BorradoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
