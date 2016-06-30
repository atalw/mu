export class Playlist {
	kind: string;
	etag: string;
	nextPageToken?: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	}
	items: {

		kind: string;
		etag: string;
		id: string;
		snippet: {
			publishedAt: string;
			channelId: string;
			title: string;
			description: string;
			thumbnails: {
				default: {
					url: string;
					width: number;
					height: number;
				}
				medium: {
					url: string;
					width: number;
					height: number;
				}
				high: {
					url: string;
					width: number;
					height: number;
				}
			}
			channelTitle: string;
			playlistId: string;
			position: number;
			resourceId: {
				kind: string;
				videoId: string;
			}
		}
	} []
}