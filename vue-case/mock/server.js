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

  let { pathname, query } = url.parse(req.url,true);
  //轮播图 home
  if (pathname === '/sliders') {
    res.setHeader('content-type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(slide)); //将内容的返回前端
  }
  // 热门图书；首页 home
  if (pathname === '/hot') {
    fs.readFile('./book.json', 'utf8', function (err, data) {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      data = JSON.parse(data).reverse().slice(0, 4) //slice 字符串提取
      return res.end(JSON.stringify(data))
    })
  }
  // 列表页获取所有图书 list
  if(pathname === '/books'){ //列表页请求
    let addressUrl = './book.json'
    // if(query.page==='collect'){//收藏页请求
    //   addressUrl = './collect.json'
    // }
    fs.readFile(addressUrl,'utf8',function(err,data){
      res.setHeader('content-type','application/json;charset=utf-8');
      data = JSON.parse(data).reverse()
      return res.end(JSON.stringify(data))
    })
  }

  //删除书籍 list
  if(pathname==='/delete'){
    var  id = query.id;
    fs.readFile('./book.json','utf8',function (err,data) {
      res.setHeader('content-type','application/json;charset=utf-8');
      let  newData = JSON.parse(data);
      newData = newData.filter(item=>item.bookId !=id);

      fs.writeFile('./book.json',JSON.stringify(newData),function () {
        return  res.end();
      })
    })
  }
  //点击图书跳转详情，获取某一本书的详情 Detail
  if(pathname ==='/getOne'){
    var  id = query.id;
    fs.readFile('./book.json','utf8',function(err,data){
        res.setHeader('content-type','application/json;charset=utf-8');
        //JSON.parse() 方法用于将一个 JSON 字符串转换为对象
        data = JSON.parse(data).filter(item=>item.bookId ==id);
        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
        return res.end(JSON.stringify(data[0]))
    })
  }
  //详情修改 提交 Detail
  if(pathname ==='/update'){
    let str =''
    req.on('data',function (chunk) {
      str+= chunk;
    });
    req.on('end',()=>{
        let newBook = JSON.parse(str);
        let  newId = newBook.bookId;
        fs.readFile('./book.json','utf8',function(err,data){
            data = JSON.parse(data)
            data = data.map(item=>{
                if(item.bookId ===newId){  //从book.json找到我们要修改的id
                    return newBook //返回值替换原数组的某一项
                }
                return item
            })
            fs.writeFile('./book.json',JSON.stringify(data),function(){
                return res.end();
            })
        })

    })
  }
}).listen(4000);
