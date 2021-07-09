import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SolicitudesgirosEffects } from './solicitudesgiros.effects';

describe('SolicitudesgirosEffects', () => {
  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: SolicitudesgirosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SolicitudesgirosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<SolicitudesgirosEffects>(SolicitudesgirosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
