import { Component } from '@angular/core';
import { TopPlaylistsComponent } from './components/top-playlists/top-playlists.component';
import { MoodComponent } from './components/mood/mood.component';


@Component({
  moduleId: module.id,
  selector: 'browse',
  templateUrl: 'browse.component.html',
  directives: [TopPlaylistsComponent, MoodComponent]
})
export class BrowseComponent {}