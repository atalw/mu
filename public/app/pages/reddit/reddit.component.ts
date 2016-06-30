import { Component } from '@angular/core';
import { SubredditComponent} from './components/subreddit/subreddit.component';
import { ThreadComponent } from './components/thread/thread.component';
import { SubredditsService } from './services/subreddits.service';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';


@Component({
	moduleId: module.id,
	selector: 'mu-reddit',
	templateUrl: 'reddit.component.html',
	directives: [SubredditComponent, ThreadComponent, MD_INPUT_DIRECTIVES],
	providers: [SubredditsService]
})
export class RedditComponent {
	private data;
	private selectedSubreddit;

	constructor(public subredditsService: SubredditsService) {}

	ngOnInit() {
		this.subredditsService.getSubreddits().then(response => {
			this.data = response;
			console.log(this.data[0].subreddits[0].class);
			this.data[0].subreddits[0];
		});

	}

	subredditEvent(event) {
		this.selectedSubreddit = event.title;
	}

}