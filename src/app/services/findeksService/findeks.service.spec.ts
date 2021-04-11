import { TestBed } from '@angular/core/testing';

import { FindeksService } from './findeks.service';

describe('FindeksServiceService', () => {
  let service: FindeksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindeksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
