import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPopupComponent } from './interest-popup.component';

describe('InterestPopupComponent', () => {
  let component: InterestPopupComponent;
  let fixture: ComponentFixture<InterestPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
