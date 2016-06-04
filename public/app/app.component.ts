import { Component } from '@angular/core';
import { NavbarComponent } from './theme/components/navbar/navbar.component';
import { ControlbarComponent } from './theme/components/controlbar/controlbar.component';
import { HomeComponent } from './theme/components/home/home.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';



@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives: [NavbarComponent, RightbarComponent, ControlbarComponent, HomeComponent]
})

// @RouteConfig([
// 	{
// 		path: '/',
// 		name: 'home',
// 		component: HomeComponent
// 	}
// ])
export class AppComponent {}