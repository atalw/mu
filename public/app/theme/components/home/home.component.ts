import { Component } from '@angular/core';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TabsComponent } from './tabs/tabs.component';



@Component({
  selector: 'mu-home',
  templateUrl: 'app/theme/components/home/home.component.html',
  directives: [PlaylistsComponent, TabsComponent]
})

export class HomeComponent {}