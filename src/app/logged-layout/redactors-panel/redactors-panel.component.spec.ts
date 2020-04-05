import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RedactorsPanelComponent} from './redactors-panel.component';

describe('RedactorsPanelComponent', () => {
  let component: RedactorsPanelComponent;
  let fixture: ComponentFixture<RedactorsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedactorsPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactorsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
