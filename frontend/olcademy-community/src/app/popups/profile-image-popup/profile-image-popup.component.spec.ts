import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImagePopupComponent } from './profile-image-popup.component';

describe('ProfileImagePopupComponent', () => {
  let component: ProfileImagePopupComponent;
  let fixture: ComponentFixture<ProfileImagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileImagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
