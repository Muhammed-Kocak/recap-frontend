import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDtoComponent } from './car-dto.component';

describe('CarDtoComponent', () => {
  let component: CarDtoComponent;
  let fixture: ComponentFixture<CarDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
