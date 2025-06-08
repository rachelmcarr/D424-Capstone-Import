import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeFormComponent } from './client-intake-form.component';

describe('IntakeFormComponent', () => {
  let component: IntakeFormComponent;
  let fixture: ComponentFixture<IntakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntakeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
