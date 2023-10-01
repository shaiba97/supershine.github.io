import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deActivateGuard } from './de-activate.guard';

describe('deActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
