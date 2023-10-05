import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSuccessfulDialogComponent } from './save-successful-dialog.component';

describe('SaveSuccessfulDialogComponent', () => {
  let component: SaveSuccessfulDialogComponent;
  let fixture: ComponentFixture<SaveSuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveSuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(SaveSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
