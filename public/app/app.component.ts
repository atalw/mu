import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavbarComponent } from './theme/components/navbar/navbar.component';
import { ControlbarComponent } from './theme/components/controlbar/controlbar.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ControlbarComponent, RightbarComponent],
})

export class AppComponent {
	dataLoaded = true;
}