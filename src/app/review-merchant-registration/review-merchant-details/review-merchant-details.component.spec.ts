import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMerchantDetailsComponent } from './review-merchant-details.component';

describe('ReviewMerchantDetailsComponent', () => {
  let component: ReviewMerchantDetailsComponent;
  let fixture: ComponentFixture<ReviewMerchantDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewMerchantDetailsComponent]
    });
    fixture = TestBed.createComponent(ReviewMerchantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
