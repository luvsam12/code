import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOnFeedPopupComponent } from './share-on-feed-popup.component';

describe('ShareOnFeedPopupComponent', () => {
  let component: ShareOnFeedPopupComponent;
  let fixture: ComponentFixture<ShareOnFeedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOnFeedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOnFeedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
