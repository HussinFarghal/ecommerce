import { TestBed } from '@angular/core/testing';

import { SotrageService } from './storage.service';

describe('SotrageService', () => {
  let service: SotrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SotrageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
