import { TestBed } from '@angular/core/testing';

import { ParentalConsentService } from './parental-consent.service';

describe('ParentalConsentService', () => {
  let service: ParentalConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentalConsentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
