const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
	autor:{
		type: mongoose.Schema.ObjectId, 
		ref: "users",
	},
	description:{
		type: String,
		required:true,
	},
	post:{
		type: mongoose.Schema.ObjectId, 
		ref: "posts",
	},
}, { timestamps: false } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
		delete object.__v;
    }
});

const comments = mongoose.model('comments',commentSchema);
module.exports = comments;