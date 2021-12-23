import { TestBed } from '@angular/core/testing';

import { PostActionsService } from './post-actions.service';

describe('PostActionsService', () => {
  let service: PostActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
