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

}