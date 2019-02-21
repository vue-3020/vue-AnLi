# vuecase

> vue案例

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 启动node服务
用编辑器启动

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
### 需要的用的
```
npm install less less-loader axios vuex bootstrap 
```
- mock模拟数据
- api 代表的是所有的接口
- base 基础数据
- component 页面主件

### 页面名字
- 首页 Home
- 列表页 List
- 收藏页 Collrct
- 添加页 Add
- 删除 Detail

### 轮播图
```
下载
npm install vue-awesome-swiper --save

全局安装
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
import  'swiper/dist/css/swiper.css';
```
### node解决跨域问题
````
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") return res.end();
````
### vuex的应用
```
//拦截器
axios.interceptors.response.use(function (res) {
    return  res.data; //拦截返回的结果，给前端的就是data的值
});
```
