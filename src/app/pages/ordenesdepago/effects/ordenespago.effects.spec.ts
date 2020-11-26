import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrdenespagoEffects } from './ordenespago.effects';

describe('OrdenespagoEffects', () => {
  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: OrdenespagoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrdenespagoEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<OrdenespagoEffects>(OrdenespagoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
