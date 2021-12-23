import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsRightScreenComponent } from './tests-right-screen.component';

describe('TestsRightScreenComponent', () => {
  let component: TestsRightScreenComponent;
  let fixture: ComponentFixture<TestsRightScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsRightScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsRightScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
