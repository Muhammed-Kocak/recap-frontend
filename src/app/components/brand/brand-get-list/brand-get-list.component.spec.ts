import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandGetListComponent } from './brand-get-list.component';

describe('BrandGetListComponent', () => {
  let component: BrandGetListComponent;
  let fixture: ComponentFixture<BrandGetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandGetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
