const async = require('async');
const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      item: (cb) => {
        Category.find({}, cb);
      },
      totalCount: (cb) => {
        Category.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  create(req, res, next) {
    new Category(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `categories/${doc._id}`});
    });
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    async.waterfall([
      (done) => {
        Item.findOne({categoryId}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findOneAndRemove({'_id': categoryId}, done);
        }
      }
    ], (err) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.FORBIDDEN);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOneAndUpdate({'_id': categoryId}, req.body, (err, doc) => {
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

module.exports = CategoryController;