import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarGetListComponent } from './car-get-list.component';

describe('CarGetListComponent', () => {
  let component: CarGetListComponent;
  let fixture: ComponentFixture<CarGetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarGetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
