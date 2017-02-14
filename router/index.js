const items = require('./router/items');
const categories = require('./router/categories');
const carts = require('./router/carts');

module.exports = function (app) {
  app.use('/items', items);
  app.use('/categories', categories);
  app.use('/carts', carts);
};