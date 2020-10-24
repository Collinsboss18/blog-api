const express = require('express');
const router = express.Router();
const multer = require('multer');
const authCheck = require('../middleware/authCheck');
const postController = require('../controllers/postController');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
//file filter
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'png'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		//fileSize of 5MB only
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

router.get('/', postController.getAllPosts);
router.post(
	'/',
	authCheck,
	upload.single('postImage'),
	postController.createPost
);
router.get('/:postID', postController.getPost);
router.patch('/:postID', authCheck, postController.updatePost);
router.delete('/:postID', authCheck, postController.deletePost);

module.exports = router;
