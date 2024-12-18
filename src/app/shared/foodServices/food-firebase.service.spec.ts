import { TestBed } from '@angular/core/testing';

import { FoodFirebaseService } from './food-firebase.service';

describe('FoodFirebaseService', () => {
  let service: FoodFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
