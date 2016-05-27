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
	name: {
		familyName: {
			type: String,
		},
		givenName: {
			type: String,
			default: "user"
		}
	}
});

module.exports = mongoose.model('User', userSchema);
