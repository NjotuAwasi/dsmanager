import { TestBed } from '@angular/core/testing';

import { SchooladministratorService } from './schooladministrator.service';

describe('SchooladministratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchooladministratorService = TestBed.get(SchooladministratorService);
    expect(service).toBeTruthy();
  });
});
