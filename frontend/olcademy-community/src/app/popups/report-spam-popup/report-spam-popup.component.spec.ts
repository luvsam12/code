import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpamPopupComponent } from './report-spam-popup.component';

describe('ReportSpamPopupComponent', () => {
  let component: ReportSpamPopupComponent;
  let fixture: ComponentFixture<ReportSpamPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSpamPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSpamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
