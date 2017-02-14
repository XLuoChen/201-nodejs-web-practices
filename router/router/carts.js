const {Router} = require('express');
const CartController = require('../../controller/cartController');

const router = Router();
const cartCml = new CartController();

router.get('/', cartCml.getAll);
router.get('/:cartId', cartCml.getOne);
router.delete('/:cartId', cartCml.delete);
router.post('/', cartCml.create);
router.put('/:cartId', cartCml.update);

module.exports = router;