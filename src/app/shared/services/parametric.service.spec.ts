import { TestBed } from '@angular/core/testing';

import { ParametricService } from './parametric.service';

describe('ParametricService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametricService = TestBed.get(ParametricService);
    expect(service).toBeTruthy();
  });
});
