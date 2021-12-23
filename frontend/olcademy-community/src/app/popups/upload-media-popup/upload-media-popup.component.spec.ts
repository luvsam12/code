import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMediaPopupComponent } from './upload-media-popup.component';

describe('UploadMediaPopupComponent', () => {
  let component: UploadMediaPopupComponent;
  let fixture: ComponentFixture<UploadMediaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMediaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMediaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
