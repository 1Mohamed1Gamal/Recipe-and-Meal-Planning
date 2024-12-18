import { TestBed } from '@angular/core/testing';

import { CommentFirebaseService } from './comment-firebase.service';

describe('CommentFirebaseService', () => {
  let service: CommentFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
