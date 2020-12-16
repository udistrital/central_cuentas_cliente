import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DevoluciontributariaEffects } from './devoluciontributaria.effects';

describe('SolicitudesgirosEffects', () => {
  // let actions$: Observable<any>;
  const actions$: Observable<any> = new Observable();
  let effects: DevoluciontributariaEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DevoluciontributariaEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<DevoluciontributariaEffects>(DevoluciontributariaEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
