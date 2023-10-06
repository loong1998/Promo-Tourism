import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTourismProductComponent } from './manage-tourism-product.component';

describe('ManageTourismProductComponent', () => {
  let component: ManageTourismProductComponent;
  let fixture: ComponentFixture<ManageTourismProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTourismProductComponent]
    });
    fixture = TestBed.createComponent(ManageTourismProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
