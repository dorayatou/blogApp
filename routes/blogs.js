var express = require("express");
var blog_router = express.Router();
var http = require('http');
var _ = require('underscore');
var Blog = require('./../model/blog');

blog_router.get('/', function (req, res, next) {
  var lists = Blog.get_blog_list();
  lists.pop();
  res.render('blogs/index', {
    blogs: lists
  });
});

blog_router.get('/new', function (req, res, next) {
  res.render('blogs/new');
});

blog_router.post('/create', function (req, res, next) {
  Blog.create(req.body.title, req.body.content, req.body.img_url);
  res.redirect("http://web.blog.com/blogs");
});

blog_router.get('/:id', function (req, res, next) {
  var blog = Blog.get_blog_show(req.params.id);
  res.render('blogs/show', {
    blog: blog
  });
});

blog_router.get('/:id/delete', function (req, res, next) {
  Blog.delete(req.params.id);
  res.redirect("http://web.blog.com/blogs");
});

blog_router.get('/test', function (req, res, next) {
  res.render('blogs/test');
});

module.exports = blog_router;