const mogoose = require('mongoose');
const rawData = require('./fixture/raw-data');
const Item = require('../model/item');
const Category = require('../model/category');
const Cart = require('../model/cart');

const modelMap = {
  Item,
  Cart,
  Category
};

let docs = Object.keys(rawData);

// mogoose.connect('mongodb://localhost/supermarket');
module.exports = function refresh() {

  Object.keys(rawData).forEach((v) => {
    modelMap[v].remove(() => {
      modelMap[v].create(rawData[v], () => {
        docs = docs.filter(doc => doc !== v);
        if (docs.length === 0) {
          // console.log('refreshMongo success')
          // process.exit(0);
        }
      })
    });
  });
};