import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
	moduleId: module.id,
	selector: 'mu-thread',
	templateUrl: 'thread.component.html',
	directives: [PostComponent]
})
export class ThreadComponent {

	constructor() { }
	private posts = [
		{
			title: 'post1'
		},
		{
			title: 'post2'
		}
	];

}