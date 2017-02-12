const {Router} = require('express');
const router = Router();

const CartController = require('../../controller/cartController');
const cartCtrl = new CartController();

router.get('/',cartCtrl.getAll);
router.get('/:cartId', cartCtrl.getOne);
router.delete('/:cartId', cartCtrl.delete);
router.put('/:cartId', cartCtrl.update);
router.post('/', cartCtrl.create);

module.exports = router;
