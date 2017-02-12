const {Router} = require('express');
const router = Router();

const ItemController = require('../../controller/itemController');
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.delete('/:itemId', itemCtrl.delete);
router.put('/:itemId', itemCtrl.update);
router.post('/', itemCtrl.create);

module.exports = router;