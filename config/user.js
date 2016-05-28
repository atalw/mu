'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	joined_at: {
		type: Date,
		default: Date.now
	},
	userId: {
		type: String,
		required: true
	},
	displayName: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	playlists: [{
		id: {
			type: String
		},
		title: {
			type: String
		},
		date: {
			type: Date
		}
	}]
});

module.exports = mongoose.model('User', userSchema);
