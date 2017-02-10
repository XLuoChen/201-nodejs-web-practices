const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  price: Number,
  categoryId: {
    type: Schema.ObjectId,
    ref: 'Category'
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;