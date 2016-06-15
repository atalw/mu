import { Component } from '@angular/core';
import { TopPlaylistsComponent } from './components/top-playlists/top-playlists.component';
import { MoodComponent } from './components/mood/mood.component';
import { ArtistsComponent } from './components/artists/artists.component'
import { GenresComponent } from './components/genres/genres.component'

@Component({
  moduleId: module.id,
  selector: 'browse',
  templateUrl: 'browse.component.html',
  directives: [TopPlaylistsComponent, MoodComponent, ArtistsComponent, GenresComponent]
})
export class BrowseComponent {}