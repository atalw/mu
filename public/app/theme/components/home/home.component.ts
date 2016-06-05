import { Component } from '@angular/core';
import { PlaylistsComponent } from './playlists/playlists.component';


@Component({
  selector: 'mu-home',
  templateUrl: 'app/theme/components/home/home.component.html',
  directives: [PlaylistsComponent]
})

export class HomeComponent {}