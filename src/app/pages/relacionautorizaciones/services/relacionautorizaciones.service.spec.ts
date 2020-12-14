import { TestBed } from '@angular/core/testing';

import { RelacionautorizacionesService } from '../services/relacionautorizaciones.service';

describe('RelacionautorizacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelacionautorizacionesService = TestBed.get(RelacionautorizacionesService);
    expect(service).toBeTruthy();
  });
});
