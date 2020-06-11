import { TestBed } from '@angular/core/testing';

import { BranchmanagerService } from './branchmanager.service';

describe('BranchmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchmanagerService = TestBed.get(BranchmanagerService);
    expect(service).toBeTruthy();
  });
});
