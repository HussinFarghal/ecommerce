import { TestBed } from '@angular/core/testing';

import { CommonCacheService } from './common-cache.service';

describe('CommonCacheService', () => {
  let service: CommonCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
