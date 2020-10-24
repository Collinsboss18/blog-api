const express = require('express');
const router = express.Router();

const authCheck = require('../middleware/authCheck');
const categoryController = require('../controllers/categoryController');

router.get('/', authCheck, categoryController.getAllCategories);
router.post('/', authCheck, categoryController.createCategory);
router.get('/:categoryID', authCheck, categoryController.getCategory);
router.patch('/:categoryID', authCheck, categoryController.updateCategory);
router.delete('/:categoryID', authCheck, categoryController.deleteCategory);

module.exports = router;
