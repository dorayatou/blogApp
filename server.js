var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');

var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, "public")));

app.listen(port);

console.log("server start on port " + port);

//index page
app.get('/', function (req, res) {
  res.render('index', {
    title: "imooc 首页",
    movies: [{
      "_id": 1,
      "title": "dd",
      "poster": "http://images.china.cn/attachement/jpg/site1000/20140903/c03fd54abb761570fec535.jpg"
    }]
  });
});

//detail page
app.get('/movie/:id', function (req, res) {
  res.render('detail', {
    title: "imooc 详情页",
    movie: {
      "_id": 1,
      "title": "dd",
      "doctor": "月岛雯",
      "poster": "http://images.china.cn/attachement/jpg/site1000/20140903/c03fd54abb761570fec535.jpg",
      "flash": "",
      "country": "中国",
      "year": "2016",
      "language": "中文",
      "summary": "月岛雯 登峰造极之作"
    }
  });
});

//list page
app.get('/admin/list', function (req, res) {
  res.render('list', {
    title: "imooc 后台列表页"
  });
});

//movie page
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: "imooc 后台录入页页",
    movie: {
      "title": "",
      "doctor": "",
      "poster": "",
      "flash": "",
      "country": "",
      "year": "",
      "language": "",
      "summary": ""
    }
  });
});