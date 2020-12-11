import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { RelacionautorizacionesEffects } from './relacionautorizaciones.effects';

describe('RelacionautorizacionesEffects', () => {
  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: RelacionautorizacionesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RelacionautorizacionesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<RelacionautorizacionesEffects>(RelacionautorizacionesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
