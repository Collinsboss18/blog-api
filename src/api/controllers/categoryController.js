const mongoose = require('mongoose');
const Category = require('../models/category');

exports.getAllCategories = async (req, res, next) => {
	try {
		const categories = await Category.find().select('_id, name, date').sort({ date: -1 }).exec();
		if (!categories.length > 0) {
			res.status(404).json({ message: 'No Order Available' });
		} else {
			const queryResult = {
				count: categories.length,
				categories: categories.map((category) => {
					return {
						date: category.quantity,
						name: category.product,
						_id: category._id,
					};
				}),
			};
			return res.status(200).json(queryResult);
		}
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.createCategory = (req, res, next) => {
	try {
		if (!name) return res.status(404).json({ message: 'Product Not Found' });

		const newCategory = new Category({ _id: mongoose.Types.ObjectId(), name });
		newCategory.save();
		res.status(201).json({
			message: 'Category created',
			categoryCreated: {
				_id: result._id,
				name: result.name,
				date: result.date,
			},
			request: {
				type: 'POST',
				url: 'http://localhost:4000/api/category/',
			},
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.getCategory = async (req, res, next) => {
	const categoryID = req.params.categoryID;
	try {
		const category = await Category.findById(categoryID).select('_id name date').exec();
		if (!category) res.status(404).json({ message: 'Category not Found' });
		res.status(200).json({
			category: category,
			request: {
				type: 'GET',
				description: 'GET_CATEGORY',
				url: `http://localhost:4000/api/categories/${category._id}`,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.updateCategory = async (req, res, next) => {
	const categoryID = req.params.categoryID;
	try {
		const category = Category.findByIdAndUpdate(categoryID, req.body);
		res.status(200).json({
			category: category,
			request: {
				type: 'PATCH',
				description: 'UPDATE_CATEGORY',
				url: `http://localhost:4000/api/${category._id}`,
			},
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.deleteOrder = (req, res, next) => {
	const categoryID = req.params.categoryID;
	try {
		Category.remove({ _id: categoryID });
		res.status(200).json({
			message: 'Category deleted',
			request: {
				type: 'DELETE',
				description: 'Category Deleted',
				url: 'http://localhost:4000/api/categories',
				body: { _id: 'ID', name: 'String' },
			},
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
