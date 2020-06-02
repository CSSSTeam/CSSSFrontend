import {TestBed} from '@angular/core/testing';

import {EventsSystemService} from './events-system.service';

describe('EventsSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsSystemService = TestBed.get(EventsSystemService);
    expect(service).toBeTruthy();
  });
});
