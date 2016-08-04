import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SubredditsService {

	private url = "/app/subreddits";

	constructor(private http: Http) {}

	getSubreddits() {
		return this.http.get(this.url).toPromise()
			.then(response => response.json());
	}

	getSubredditThread(selectedSubreddit, sort) {
		var url = "https://www.reddit.com" + selectedSubreddit + "/" + sort + ".json" + "?sort=top&t=all";
		var posts = {};
		return this.http.get(url).toPromise()
			.then(response => {
				var data = response.json().data;
				return posts = {
					after: data.after,
					children: data.children
				};
			});
	}

}