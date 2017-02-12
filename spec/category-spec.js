require('should');
const supertest = require('supertest');
const express = require('express');
const app = require('../app');
const request = supertest(app);

const refresh = require('../tools/refreshMongo');
const Category = require('../model/category');

describe('CategoryController', () => {
  beforeEach(() => {
    refresh();
  });

  it('GET /categories', (done) => {
    request
      .get('/categories')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(2);
      })
      .end(done);
  });

  it('GET /categories/categoryId', (done) => {
    request
      .get('/categories/587f0f2586653d19297d40c8')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
          "_id": "587f0f2586653d19297d40c8",
          "name": "文具",
          "__v": 0
        });
      })
      .end(done);
  });

  it('POST /categories', (done) => {
    const category = {
      name: '分类一',
    };

    request
      .post('/categories')
      .send(category)
      .expect(201)
      .expect((res) => {
        Category.findOne(category, (err, doc) => {
          res.body.uri.should.equal(`categories/${doc._id}`);
        });
      })
      .end(done);
  });

  it('DELETE /categories/categoryId', (done) => {
    request
      .delete('/categories/587f0f2586653d19297d40c8')
      .expect(403)
      .end(done);
  });

  it('PUT /categories/categoryId', (done) => {
    const category = {
      name: '测试分类'
    };

    request
      .put('/categories/587f0f2586653d19297d40c9')
      .send(category)
      .expect(204)
      .end(done);
  });
});