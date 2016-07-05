import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { SubredditsService } from '../../services/subreddits.service';
import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { YoutubePlayerService } from '../../../../services/youtube-player.service';

@Component({
	moduleId: module.id,
	selector: 'mu-thread',
	templateUrl: 'thread.component.html',
	directives: [PostComponent, MD_TABS_DIRECTIVES],
})
export class ThreadComponent {
	@Input() selectedSubreddit;
	private thread;
	private posts;
	private selectedTabIndex = 2;

	private tabs = [
		{
			label: 'Hot',
			sort: 'hot'
		},
		{
			label: 'New',
			sort: 'new'
		},
		{
			label: 'Top',
			sort: 'top'
		},
	];

	constructor(public subredditsService: SubredditsService, public youtubePlayerService: YoutubePlayerService) { }

	ngOnInit() {
		// temporary fix since selectedIndex property not working
		// this.selectedTabIndex = 0;
	}

	ngOnChanges(changes) {
		console.log(this.selectedTabIndex);
		if (this.selectedSubreddit) {
			this.subredditsService.getSubredditThread(this.selectedSubreddit.title, this.tabs[this.selectedTabIndex].sort)
				.then(response => {
					// this.thread = response;
					this.posts = response.children;
				}).then(() => {
					console.log(this.posts);
				});
		}
	}
	show() {
		console.log('here');
	}

	selectVideo(url) {
		console.log(url);
		this.youtubePlayerService.loadVideoUrl(url);
	}
}