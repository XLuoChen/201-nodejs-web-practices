const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
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
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  delete(req, res, next) {
    const category = req.params.category;

    async.waterfall([
      (done) => {
        Item.findOne({category}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findOneAndRemove({'_id': category}, (err, doc) => {
            if (!doc) {
              return done(false, null);
            }
            done(err, doc);
          });
        }
      }
    ], (err) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `categories/${doc._id}`});
    });
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