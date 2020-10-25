/*
 ** Mongoose module
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
	_id: ObjectId,
	name: { type: String, required: true },
	body: { type: String, required: true },
	postImage: { type: String, required: true },
	category: { type: ObjectId, ref: 'Category', required: true },
});
postSchema.set('timestamps', true);
module.exports = mongoose.model('Post', postSchema);