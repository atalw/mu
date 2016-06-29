import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'mu-reddit-post',
	templateUrl: 'post.component.html',
})
export class PostComponent {
	@Input() post;

	constructor() { }

}