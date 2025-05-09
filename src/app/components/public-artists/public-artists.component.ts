import { Component } from '@angular/core';

@Component({
  selector: 'app-public-artists',
  templateUrl: './public-artists.component.html',
  styleUrls: ['./public-artists.component.css']
})
export class PublicArtistsComponent {
  artists = [
    {
      id: 1,
      name: 'Jessie Steel',
      bio: 'Realism and black & grey specialist',
      photo: 'assets/images/artists/artist1.jpg'
    },
    {
      id: 2,
      name: 'Max Vane',
      bio: 'Neo-traditional and bold linework artist',
      photo: 'assets/images/artists/artist2.jpg'
    }
  ];
}
