import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrdenesDevolucionEffects } from './ordenesdevolucion.effects';

describe('SolicitudesgirosEffects', () => {
  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: OrdenesDevolucionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrdenesDevolucionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<OrdenesDevolucionEffects>(OrdenesDevolucionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
