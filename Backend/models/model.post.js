const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
	title:{
		type: String,
		required:true,
	},
	description:{
		type: String,
		required:true,
	},
	autor:{
		type: mongoose.Schema.ObjectId, 
		ref: "users",
	},
	comments:{
		type: mongoose.Schema.ObjectId, 
		ref: "comments",
	},
	imageURL:{
		type: String,
		required:true
    },
	createdAt:{
		type: Date,
		default: Date.now
    },
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
		delete object.__v;
    }
});

const posts = mongoose.model('posts',postSchema);
module.exports = posts;