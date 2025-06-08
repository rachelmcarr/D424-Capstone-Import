import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentalConsentComponent } from './parental-consent.component';

describe('ParentalConsentComponent', () => {
  let component: ParentalConsentComponent;
  let fixture: ComponentFixture<ParentalConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentalConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentalConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
