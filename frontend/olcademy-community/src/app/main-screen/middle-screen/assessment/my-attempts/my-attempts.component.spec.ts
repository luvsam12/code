import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAttemptsComponent } from './my-attempts.component';

describe('MyAttemptsComponent', () => {
  let component: MyAttemptsComponent;
  let fixture: ComponentFixture<MyAttemptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAttemptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
