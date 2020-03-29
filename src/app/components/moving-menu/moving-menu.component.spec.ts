import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingMenuComponent } from './moving-menu.component';

describe('MovingMenuComponent', () => {
  let component: MovingMenuComponent;
  let fixture: ComponentFixture<MovingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
