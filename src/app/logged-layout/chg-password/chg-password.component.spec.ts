import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChgPasswordComponent } from './chg-password.component';

describe('ChgPasswordComponent', () => {
  let component: ChgPasswordComponent;
  let fixture: ComponentFixture<ChgPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChgPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChgPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
