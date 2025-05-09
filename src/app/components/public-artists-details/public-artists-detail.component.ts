import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-artists-detail',
  templateUrl: './public-artists-detail.component.html',
  styleUrls: ['./public-artists-detail.component.css']
})
export class PublicArtistsDetailComponent implements OnInit {
  artistId = '';
  artist: any;

  artists: { [key: number]: { name: string; bio: string; photo: string; portfolioURL: string } } = {
  1: {
    name: 'Jessie Steel',
    bio: 'Jessie specializes in realism and black & grey tattoos.',
    photo: 'assets/images/artists/artist1.jpg',
    portfolioURL: 'https://instagram.com/jessieink'
  },
  2: {
    name: 'Max Vane',
    bio: 'Max delivers bold linework and neo-traditional pieces.',
    photo: 'assets/images/artists/artist2.jpg',
    portfolioURL: 'https://instagram.com/maxvane'
  }
};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('id') || '';
    const id = Number(this.artistId);
    this.artist = this.artists[id];

  }
}
