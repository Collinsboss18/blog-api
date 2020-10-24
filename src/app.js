const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*
 ** imported the apis from the api>routes directory
 */
const categoryRoutes = require('./api/routes/category');
const postRoutes = require('./api/routes/posts');
const userRoutes = require('./api/routes/users');

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 ** Handling Cross Origin Resource Sharing (CORS))
 */
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

/*
 ** Routes middleware
 */
app.use('api/categories', categoryRoutes);
app.use('api/posts', postRoutes);
app.use('api/users', userRoutes);

app.use((req, res, next) => {
	const error = new Error('oops! - Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	});
});

module.exports = { app };
