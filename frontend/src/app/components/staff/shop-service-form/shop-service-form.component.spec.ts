import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopServiceFormComponent } from './shop-service-form.component';

describe('ShopServiceFormComponent', () => {
  let component: ShopServiceFormComponent;
  let fixture: ComponentFixture<ShopServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopServiceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
