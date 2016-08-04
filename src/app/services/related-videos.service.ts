import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RelatedVideosService {
	private searchUrl = 'https://www.googleapis.com/youtube/v3/search';
	private data = new Subject<string>();

	data$ = this.data.asObservable();

	constructor(private http: Http) {}

	getRelatedVideos(videoId) {
		var options: URLSearchParams = new URLSearchParams();
		options.set('part', 'snippet');
		options.set('maxResults', '50');
		options.set('type', 'video');
		options.set('relatedToVideoId', videoId);
		options.set('access_token', localStorage.getItem('access_token'));

		return this.http.get(this.searchUrl, { search: options }).toPromise()
			.then(response => {
				return response;
			});
	}

	loadRelatedVideos(videoId) {
		this.getRelatedVideos(videoId).then(response => {
			this.data.next(response.json());
		});
	}
}