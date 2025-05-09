import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicArtistsComponent } from './public-artists.component';

describe('PublicArtistComponent', () => {
  let component: PublicArtistsComponent;
  let fixture: ComponentFixture<PublicArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicArtistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
