/*
 ** Mongoose module
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
	_id: ObjectId,
	name: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model('Category', categorySchema);
