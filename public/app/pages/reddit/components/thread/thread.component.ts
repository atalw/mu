import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { SubredditsService } from '../../services/subreddits.service';

@Component({
	moduleId: module.id,
	selector: 'mu-thread',
	templateUrl: 'thread.component.html',
	directives: [PostComponent]
})
export class ThreadComponent {
	@Input() selectedSubreddit;
	private thread;
	private posts;

	constructor(public subredditsService: SubredditsService) { }

	ngOnInit() {

	}

	ngOnChanges(changes) {
		if (this.selectedSubreddit) {
			this.subredditsService.getSubredditThread(this.selectedSubreddit)
				.then(response => {
					this.thread = response;
					this.posts = response.children;
				}).then(() => {
					console.log(this.posts);
				});
		}
	}
}