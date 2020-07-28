import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurePanelComponent } from './treasure-panel.component';

describe('TreasurePanelComponent', () => {
  let component: TreasurePanelComponent;
  let fixture: ComponentFixture<TreasurePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasurePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
