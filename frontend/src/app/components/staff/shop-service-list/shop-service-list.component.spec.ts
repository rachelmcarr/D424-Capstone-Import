import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopServiceListComponent } from './shop-service-list.component';

describe('ShopServiceListComponent', () => {
  let component: ShopServiceListComponent;
  let fixture: ComponentFixture<ShopServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopServiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
