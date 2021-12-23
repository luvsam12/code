import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedQuestionsComponent } from './solved-questions.component';

describe('SolvedQuestionsComponent', () => {
  let component: SolvedQuestionsComponent;
  let fixture: ComponentFixture<SolvedQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolvedQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
