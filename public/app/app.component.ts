import { Component, Input, trigger, style, animate, state, transition, EventEmitter, Output } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavbarComponent } from './theme/components/navbar/navbar.component';
import { ControlbarComponent } from './theme/components/controlbar/controlbar.component';
import { RightbarComponent } from './theme/components/rightbar/rightbar.component';


@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ControlbarComponent, RightbarComponent],
  animations: [
	  trigger('active', [
		  state('void', style({ transform: 'translateX(0)' })),
		  state('closed', style({
			  transform: 'translateX(70%)',
		  })),
		  state('open', style({ transform: 'translateX(0)' })),
		  transition('void => closed', [animate(0)]),
		  transition('closed => open', [animate('500ms ease-out')]),
		  transition('open => closed', [animate('500ms ease-out')])
	  ]),
	  trigger('routerEnlarge', [
		  state('void', style({ transform: 'translateX(0)' })),
		  state('closed', style({
			  transform: 'translate(10%)',
		  })),
		  state('open', style({ transform: 'translateX(0)' })),
		  transition('void => closed', [animate(0)]),
		  transition('closed => open', [animate('500ms ease-out')]),
		  transition('open => closed', [animate('500ms ease-out')])
	  ])
  ],
})

export class AppComponent {

	@Input() open = true;

	onToggleRight() {
		this.open = !this.open;
		let mainDiv = document.getElementById('main');
		let rightDiv = document.getElementById('rightitis');
		if (this.open === true) {
			// mainDiv.className = "col-sm-8 padding-0";
			// rightDiv.className = "col-sm-3 padding-0"
		}
		else {
			// mainDiv.className = "col-sm-10 padding-0";
			// rightDiv.className = "col-sm-1 padding-0"
		}
	}
}