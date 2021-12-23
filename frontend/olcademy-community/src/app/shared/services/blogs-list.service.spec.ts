import { TestBed } from '@angular/core/testing';

import { BlogsListService } from './blogs-list.service';

describe('BlogsListService', () => {
  let service: BlogsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
