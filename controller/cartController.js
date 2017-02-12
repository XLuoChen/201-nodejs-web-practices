const async = require('async');
const Cart = require('../model/cart');
const constant = require('../config/constant');

const loadItemUri = function (items) {
  return items.map(({count, item}) => {
    return {uri: `items/${item}`, count};
  });
};
class CartController {
  getAll(req, res, next) {
    async.series({
      item: (cb) => {
        Cart.find({}, (err, doc) => {
          if (err) {
            return next(err);
          }
          const data = doc.map(item => {
            const cart = item.toJSON();
            cart.items = loadItemUri(cart.items);
            return cart;
          });
          cb(null, data);
        })
      },
      totalCount: (cb) => {
        Cart.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findById(cartId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      const data = doc.toJSON();
      data.items = loadItemUri(doc.items);
      return res.status(constant.httpCode.OK).send(data);
    });
  }

  create(req, res, next) {
    new Cart(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `carts/${doc._id}`});
    });
  }

  delete(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndRemove({'_id': cartId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  update(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndUpdate({'_id': cartId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = CartController;