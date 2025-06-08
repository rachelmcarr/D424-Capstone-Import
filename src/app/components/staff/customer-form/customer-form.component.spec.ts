import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CustomerFormComponent } from './customer-form.component';
import { CustomerService } from '../../services/customer.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFormComponent],
      imports: [FormsModule],
      providers: [
        CustomerService,
        provideHttpClientTesting() // ✅ Angular 18 replacement
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
