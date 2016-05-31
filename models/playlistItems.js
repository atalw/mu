'use strict';

var mongoose = require('mongoose');

var Schema = mongooose.Schema;

var playlistItemsSchema = new Schema({
	playlistId: {
		type: String,
		required: true
	},
	items: [{
		videoId: {
			type: String
		},
		title: {
			type: String
		}
	}]
});

module.exports = mongoose.model('playlistItems', playlistItemsSchema);

