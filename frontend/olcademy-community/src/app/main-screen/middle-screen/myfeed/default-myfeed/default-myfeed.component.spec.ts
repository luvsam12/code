import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultMyfeedComponent } from './default-myfeed.component';

describe('DefaultMyfeedComponent', () => {
  let component: DefaultMyfeedComponent;
  let fixture: ComponentFixture<DefaultMyfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultMyfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultMyfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
