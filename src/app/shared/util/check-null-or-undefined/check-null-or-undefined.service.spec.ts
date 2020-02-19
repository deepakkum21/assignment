import { TestBed } from '@angular/core/testing';

import { CheckNullOrUndefinedService } from './check-null-or-undefined.service';

describe('CheckNullOrUndefinedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckNullOrUndefinedService = TestBed.get(CheckNullOrUndefinedService);
    expect(service).toBeTruthy();
  });
});
