import { TestBed } from '@angular/core/testing';

import { TattooConsentService } from './tattoo-consent.service';

describe('TattooConsentService', () => {
  let service: TattooConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TattooConsentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
