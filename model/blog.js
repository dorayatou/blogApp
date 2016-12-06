var _ = require('underscore');
var fs = require('fs');
var moment = require("moment");

exports.get_blog_list = function () {
  var lists = [];
  var items = fs.readFileSync('./api/blogs.txt', 'utf8');

  items = items.split("---");
  _.each(items, function (item) {
    var entry = {};
    var lines = item.split("\n");

    _.each(lines, function (line) {
      line = line.split(": ");
      if (line[0] == "id") {
        entry.id = line[1].replace(/\s/, "");
      } else if (line[0] == "title") {
        entry.title = line[1];
      } else if (line[0] == "date") {
        entry.date = line[1];
      } else if (line[0] == "content") {
        entry.content = line[1];
      } else if (line[0] == "img_url") {
        entry.img_url = line[1];
      }
    });
    lists.push(entry);
  });

  return lists;
};

exports.get_blog_show = function (id) {
  var lists = exports.get_blog_list();
  var entry = {};

  _.each(lists, function (item) {
    if (item.id == id) {
      entry = item;
    }
  });
  return entry;
};

exports.create = function (title, content, img_url) {
  var entry = [];
  var lists = exports.get_blog_list();
  lists.length > 1 ? lists.pop() : "";
  var last_id = parseInt(_.last(lists).id, 10);
  last_id = last_id ? last_id : 0;
  entry.push("id: " + (last_id + 1));
  entry.push("date: " + moment().format("L"));
  entry.push("title: " + title);
  entry.push("img_url: " + img_url);
  entry.push("content: " + content);
  entry.push("---");
  var entry = entry.join("\n");

  fs.appendFile('./api/blogs.txt', "\n" + entry, "utf8");
};

exports.delete = function (id) {
  var lists = exports.get_blog_list();
  var new_lists = [];
  _.each(lists, function (item) {
    if (item.id == id) {
      console.log("delete ok");
    } else {
      new_lists.push(item);
    }
  });
  var id = 0;
  _.each(new_lists, function (item) {
    var entry = [];
    if (item.id) {
      entry.push("id: " + item.id);
      entry.push("date: " + item.date);
      entry.push("title: " + item.title);
      entry.push("img_url: " + item.img_url);
      entry.push("content: " + item.content);
      entry.push("---");
      var entry = entry.join("\n");
      fs.appendFile('./api/blogs.txt', "\n" + entry, "utf8");
    }
  });
};