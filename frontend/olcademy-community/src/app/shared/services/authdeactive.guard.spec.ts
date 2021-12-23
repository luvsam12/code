import { TestBed } from '@angular/core/testing';

import { AuthdeactiveGuard } from './authdeactive.guard';

describe('AuthdeactiveGuard', () => {
  let guard: AuthdeactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthdeactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
