import { Component,
		 trigger,
  		 state,
  		 style,
  	     transition,
  		 animate,
  		 Input,
  		 Output,
  		 EventEmitter } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'mu-subreddit',
	templateUrl: 'subreddit.component.html',
	animations: [
		trigger('state', [
			state('inactive', style({
				backgroundColor: '#fff',
			})),
			state('active', style({
				backgroundColor: '#cfd8dc',
			})),
			transition('inactive => active', animate('100ms ease-in')),
			transition('active => inactive', animate('100ms ease-out'))
		])
	],
})
export class SubredditComponent {
	@Input() genre;
	@Output() subredditEvent = new EventEmitter();;
	private selectedSubreddit;

	constructor() { }

	ngOnInit() {}

	select(subreddit) {
		this.selectedSubreddit = subreddit;
		this.subredditEvent.emit(subreddit);
	}

}