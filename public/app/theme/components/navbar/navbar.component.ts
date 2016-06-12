import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	selector: 'mu-navbar',
	templateUrl: 'app/theme/components/navbar/navbar.component.html',
	directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {}