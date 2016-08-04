import { Component, Input } from '@angular/core';

import { PostComponent } from '../post/post.component';

import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';

import { YoutubePlayerService } from '../../../../../../services/youtube-player.service';
import { SubredditsService } from '../../services/subreddits.service';
import { RelatedVideosService } from '../../../../../../services/related-videos.service';


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

	constructor(public subredditsService: SubredditsService, public youtubePlayerService: YoutubePlayerService, public relatedVideosService: RelatedVideosService) { }

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
		var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/;
		var id = regex.exec(url);
		this.youtubePlayerService.loadVideoId(id[1]);
		this.relatedVideosService.loadRelatedVideos(id[1]);
	}
}