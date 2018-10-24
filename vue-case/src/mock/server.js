let http = require('http');
let fs = require('fs');
let url = require('url');

//获取轮播图 /sliders
let slide = require('./sliders'); //获取sliders.js
http.createServer((req, res) => {
  //解决跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") return res.end();

  let {
    pathname,
    query
  } = url.parse(req.url);
  //轮播图
  if (pathname === '/sliders') {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(slide)); //将内容的返回前端
  }
  // 热门图书；首页
  if (pathname === '/hot') {
    fs.readFile('./book.json', 'utf8', function (err, data) {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      data = JSON.parse(data).reverse().slice(0, 4)
      return res.end(JSON.stringify(data))
    })
  }   
}).listen(4000)
