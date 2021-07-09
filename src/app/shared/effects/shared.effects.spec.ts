import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SharedEffects } from './shared.effects';

describe('SharedEffects', () => {

  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: SharedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SharedEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<SharedEffects>(SharedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
