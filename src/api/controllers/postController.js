const mongoose = require('mongoose');
const Post = require('../models/post');

exports.getAllPosts = async (req, res, next) => {
	//Getting all the post
	try {
		const post = await Post.find().select('_id, name, body, postImage, timestamp').sort({ timestamp: -1 }).exec();
		if (!post.length > 0) {
			res.status(404).json({ message: 'No Post Available' });
		} else {
			const queryResult = {
				count: post.length,
				products: post.map((post) => {
					return {
						_id: post._id,
						name: post.name,
						body: post.body,
						postImage: post.postImage,
						timestamp,
						request: {
							type: 'GET',
							url: `http://localhost:4000/post/${post._id}`
						}
					};
				})
			}
			return res.status(200).json(queryResult);
		}
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.createPost = (req, res, next) => {
	try {
		console.log('FILE', req.file);
		//create a new Post
		const newPost = new Post({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			body: req.body.body,
			postImage: req.file.path
		});
		newPost.save();
		res.status(201).json({
			message: 'Product Created Successfully',
			productCreated: {
				_id: result._id,
				name: result.name,
				body: result.body,
				postImage: result.postImage,
				request: {
					type: 'POST',
					url: 'http://localhost:4000/products/'
				}
			}
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}

};

exports.getPost = (req, res, next) => {
	const id = req.params.postID;
	try {
		//Get a single product
		const post = Post.findById(id).select('_id, name, body, postImage, timestamp').exec();

		if (!post) res.status(404).json({ message: 'Post not Found' });
		res.status(200).json({
			post: post,
			request: {
				type: 'GET',
				description: 'VIEW_ALL_POST',
				url: `http://localhost:4000/api/categories/${post._id}`,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.updatePost = (req, res, next) => {
	const postID = req.params.postID;
	try {
		const post = Post.findByIdAndUpdate(postID, req.body);
		console.log(post);
		res.status(200).json({
			category: post,
			message: 'Post Updated Successfully',
			request: {
				type: 'PATCH',
				description: 'UPDATE_POST',
				url: `http://localhost:4000/api/${post._id}`,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.deletePost = (req, res, next) => {
	const postID = req.params.postID;
	//Delete a single product
	try {
		Category.remove({ _id: postID });
		res.status(200).json({
			message: 'Deleted Successfully',
			request: {
				type: 'DELETE',
				description: 'DELETED_POST',
				url: 'http://localhost:4000/products',
				body: { name: 'String', price: 'Number' }
			}
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
