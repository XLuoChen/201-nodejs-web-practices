module.exports = {
  Item: [{
    '_id': '587f0f2586653d19297d40c2',
    name: '钢笔',
    price: 12,
    category: '587f0f2586653d19297d40c8'
  }, {
    '_id': '587f0f2586653d19297d40c3',
    name: '电脑',
    price: 6000,
    category: '587f0f2586653d19297d40c9'
  }, {
    '_id': '587f0f2586653d19297d40c4',
    name: '手机',
    price: 3000,
    category: '587f0f2586653d19297d40c9'
  }],
  Category: [{
    '_id': '587f0f2586653d19297d40c8',
    name: '文具'
  }, {
    '_id': '587f0f2586653d19297d40c9',
    name: '电子产品'
  }],
  Cart: [{
    '_id': '587f0f2586653d19297d40c6',
    userId: '1',
    items: [
      {
        '_id': '5899cce9d9fd8719fe673436',
        item: '587f0f2586653d19297d40c2',
        count: 1
      }, {
        '_id': '5899cce9d9fd8719fe673435',
        item: '587f0f2586653d19297d40c3',
        count: 1
      },
      {
        '_id': '5899cce9d9fd8719fe673434',
        item: '587f0f2586653d19297d40c4',
        count: 1
      }
    ]
  }]
};