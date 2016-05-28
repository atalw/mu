'use strict'

var google = require('something');
var client = require('currentclient');

var youtube = google.youtube({
	version: 'v3',
	auth: client.oAuth2Client
});

function run() {
	getPlaylistData(function (err, data, response) {
		if (err)
			console.log(err);
		console.log(response.status);
	});
}

function getPlaylistData(callback) {
	youtube.playlists.list({
		part: 'id,snippet',
		id: 'somePlaylistID',
	}, function (err, data, response) {
		if (err)
			console.log(err);
		if (data)
			console.log(data);
		if (response)
			console.log(response.statusCode);
		callback(err, data, response);
	});
}

var scopes = [
	'https://www.googleapis.com/auth/youtube'
];

client.exectue(scopes, run);
