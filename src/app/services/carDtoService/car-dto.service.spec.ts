import { TestBed } from '@angular/core/testing';

import { CarDtoService } from './car-dto.service';

describe('CarDtoService', () => {
  let service: CarDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
