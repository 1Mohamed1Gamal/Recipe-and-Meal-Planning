import { TestBed } from '@angular/core/testing';

import { PlanFirebaseService } from './plan-firebase.service';

describe('PlanFirebaseService', () => {
  let service: PlanFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
