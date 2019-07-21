import { TestBed } from '@angular/core/testing';

import { CachingInterfaceService } from './caching-interface.service';

describe('CachingInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CachingInterfaceService = TestBed.get(CachingInterfaceService);
    expect(service).toBeTruthy();
  });
});
