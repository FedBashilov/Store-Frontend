import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulOrderDialogComponent } from './successful-order-dialog.component';

describe('SuccessfulOrderDialogComponent', () => {
  let component: SuccessfulOrderDialogComponent;
  let fixture: ComponentFixture<SuccessfulOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
