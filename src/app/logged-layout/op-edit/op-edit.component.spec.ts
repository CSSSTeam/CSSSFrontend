import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpEditComponent } from './op-edit.component';

describe('OpEditComponent', () => {
  let component: OpEditComponent;
  let fixture: ComponentFixture<OpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
