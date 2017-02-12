const async = require('async');
const Item = require('../model/item');
const constant = require('../config/constant');

class ItemController {
  getAll(req, res, next) {
    async.series({
      item: (cb) => {
        Item.find({})
          .populate('categoryId')
          .exec(cb)
      },
      totalCount: (cb) => {
        Item.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.findById(itemId)
      .populate('categoryId')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constant.httpCode.NOT_FOUND);
        }
        return res.status(constant.httpCode.OK).send(doc);
      });
  }

  create(req, res, next) {
    new Item(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `items/${doc._id}`});
    });
  }

  delete(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndRemove({'_id': itemId}, (err, doc) => {
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
    const itemId = req.params.itemId;
    Item.findOneAndUpdate({'_id': itemId}, req.body, (err, doc) => {
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

module.exports = ItemController;