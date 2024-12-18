import { TestBed } from '@angular/core/testing';

import { PostsFirebaseService } from './posts-firebase.service';

describe('PostsFirebaseService', () => {
  let service: PostsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
