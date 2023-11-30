const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		index: { unique: true, dropDups: true }
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
	avatarURL: {
		type: String,
		required: true
	},
}, { timestamps: false }).set('toJSON', {
	transform: (document, object) => {
		object.id = document.id;
		delete object._id;
		delete object.password;
		delete object.__v;
	}
});

const users = mongoose.model('users', userSchema);
module.exports = users;