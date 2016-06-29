import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
	moduleId: module.id,
	selector: 'mu-thread',
	templateUrl: 'thread.component.html',
	directives: [PostComponent]
})
export class ThreadComponent {
	@Input() selectedSubreddit;

	constructor() { }
	private posts = [
		{
			title: 'Shine on you crazy diamond - Pink Floyd',
			upvotes: '234',
			time: '4 hours ago',
			author: 'atalw',
			comments: '213'
		},
		{
			title: 'Can I kick it - artist',
			upvotes: '34',
			time: '5 hours ago',
			author: 'atalw',
			comments: '3'
		}
	];


}