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
	private subreddits = [];
	public inSearch;

	constructor(public subredditsService: SubredditsService) {}

	ngOnInit() {
		this.inSearch = false;
		this.subredditsService.getSubreddits().then(response => {
			this.data = response;
			// console.log(this.data[0].subreddits[0].class);
			// this.data[0].subreddits[0];
		});

	}

	subredditEvent(event) {
		this.selectedSubreddit = event.title;
	}

	search(term: string) {
		if (term == '') {
			this.inSearch = false;
		}
		else {
			this.inSearch = true;
		}
		this.subreddits = [];
		for (var genre of this.data) {
			for (var subreddit of genre.subreddits) {
				if (subreddit.title.toLowerCase().indexOf(term.toLowerCase()) > -1) {
					this.subreddits.push(subreddit);
				}
			}
		}
	}

}