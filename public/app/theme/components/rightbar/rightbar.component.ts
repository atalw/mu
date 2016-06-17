import { Component, Input, trigger, style, animate, state, transition, EventEmitter, Output } from '@angular/core';
import { VideoPlayerComponent } from './videoPlayer/videoPlayer.component';
import { InfoComponent } from './info/info.component';

@Component({
  moduleId: module.id,
  selector: 'mu-right-bar',
  templateUrl: 'rightbar.component.html',
  directives: [VideoPlayerComponent, InfoComponent],
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
	  ])
	]
})

export class RightbarComponent {
	@Input() open = true;
	@Output() onToggle = new EventEmitter();

	onToggleRight() {
		this.open = !this.open;
		this.onToggle.emit({
			value: this.open
		});
	}
}