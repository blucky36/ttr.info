import { TestBed } from '@angular/core/testing';

import { TtrServiceService } from './ttr-service.service';

describe('TtrServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TtrServiceService = TestBed.get(TtrServiceService);
    expect(service).toBeTruthy();
  });
});
