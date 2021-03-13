import { TestBed } from '@angular/core/testing';

import { RentalDtoService } from './rentalDto.service';

describe('RentalService', () => {
  let service: RentalDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
