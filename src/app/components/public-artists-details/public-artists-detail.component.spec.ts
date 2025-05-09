import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicArtistsDetailComponent } from './public-artists-detail.component';

describe('PublicArtistDetailComponent', () => {
  let component: PublicArtistsDetailComponent;
  let fixture: ComponentFixture<PublicArtistsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicArtistsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicArtistsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
