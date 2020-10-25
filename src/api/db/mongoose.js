const { connect } = require('mongoose');
(async () => {
	try {
		await connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log("Connected " + process.env.MONGODB_URL)
	} catch (err) {
		console.log('Error', err);
	}
})();
