let http = require('http');
let fs = require('fs');
let url = require('url');

//获取轮播图 /sliders
let slide = require('./sliders'); //获取sliders
http.createServer((req, res) => {
    //解决跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") return res.end();

  let {pathname, query } = url.parse(req.url);
  if (pathname === '/sliders') {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(slide));
  }
}).listen(4000)
