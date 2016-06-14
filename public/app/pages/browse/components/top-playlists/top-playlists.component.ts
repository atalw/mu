import { Component } from '@angular/core';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

@Component({
  moduleId: module.id,
  selector: 'mu-top-playlists',
  templateUrl: 'top-playlists.component.html',
  directives: [PlaylistCardComponent]
})
export class TopPlaylistsComponent {}