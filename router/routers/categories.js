const {Router} = require('express');
const router = Router();

const CategoryController = require('../../controller/categoryController');
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getOne);
router.delete('/:categoryId', categoryCtrl.delete);
router.put('/:categoryId', categoryCtrl.update);
router.post('/', categoryCtrl.create);

module.exports = router;