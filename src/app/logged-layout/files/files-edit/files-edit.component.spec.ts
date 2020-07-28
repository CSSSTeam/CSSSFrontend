import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesEditComponent } from './files-edit.component';

describe('FilesEditComponent', () => {
  let component: FilesEditComponent;
  let fixture: ComponentFixture<FilesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
