const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryController = new Schema({
  name: String
});

const Category = mongoose.model('Category', CategoryController);

module.exports = Category;