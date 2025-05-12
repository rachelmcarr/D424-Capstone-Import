import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLookupComponent } from './customer-lookup.component';

describe('CustomerLookupComponent', () => {
  let component: CustomerLookupComponent;
  let fixture: ComponentFixture<CustomerLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
