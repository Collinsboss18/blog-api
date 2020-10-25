const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
	try {
		let user;
		req.body.email
			? (user = await User.findOne({ email: req.body.email }).exec())
			: res.status(401).json({ message: 'Provide an email address' });

		if (user && Object.keys(user).length >= 1) {
			return res.status(409).json({ message: 'A User with the Email Already Exist.' });
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({ error: err.message });
				} else {
					const newUser = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						password: hash,
					});
					newUser.save();
					console.log(newUser);
					res.status(201).json(newUser);
				}
			});
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.login = async (req, res, next) => {
	try {
		let user;
		req.body.email || req.body.email
			? (user = await User.find({ email: req.body.email }).exec())
			: res.status(400).json({ message: 'Provide necessary credentials' });

		if (Object.keys(user).length < 1) {
			return res.status(401).json({ message: 'Auth Failed' });
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if (err) return res.status(401).json({ message: 'Auth Failed' });

			if (result) {
				const token = jwt.sign(
					{ email: user[0].email, userId: user[0]._id, },
					process.env.JWT_KEY, { expiresIn: '1h' }
				);
				return res.status(200).json({
					message: 'Auth Successful',
					token: token,
				});
			}
			res.status(401).json({ message: 'Auth Failed' });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
};

exports.deleteUser = (req, res, next) => {
	try {
		User.remove({ _id: req.params.userId }).exec();
		res.status(200).json({ message: 'User deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
