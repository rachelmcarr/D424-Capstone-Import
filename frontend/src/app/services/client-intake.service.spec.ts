import { TestBed } from '@angular/core/testing';

import { ClientIntakeService } from './client-intake.service';

describe('ClientIntakeService', () => {
  let service: ClientIntakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientIntakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
