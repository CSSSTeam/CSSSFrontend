import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosEditComponent } from './infos-edit.component';

describe('InfosEditComponent', () => {
  let component: InfosEditComponent;
  let fixture: ComponentFixture<InfosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
