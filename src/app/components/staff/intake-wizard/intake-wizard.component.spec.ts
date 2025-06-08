import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeWizardComponent } from './intake-wizard.component';

describe('IntakeWizardComponent', () => {
  let component: IntakeWizardComponent;
  let fixture: ComponentFixture<IntakeWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntakeWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntakeWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
