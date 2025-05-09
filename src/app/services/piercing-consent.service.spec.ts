import { TestBed } from '@angular/core/testing';

import { PiercingConsentService } from './piercing-consent.service';

describe('PiercingConsentService', () => {
  let service: PiercingConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiercingConsentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
