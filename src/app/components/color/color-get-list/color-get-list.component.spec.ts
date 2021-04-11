import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGetListComponent } from './color-get-list.component';

describe('ColorGetListComponent', () => {
  let component: ColorGetListComponent;
  let fixture: ComponentFixture<ColorGetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorGetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
