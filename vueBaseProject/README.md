# vue_base_project

> 初始化vue项目基础模版

## Build Setup

``` bash
# 项目搭建过程
1、安装node 版本8.x.x
2、安装nrm用来管理npm镜像源： npm intall -g nrm
3、npm install -g vue vue-cli webpack eslint
4、初始化一个项目 vue init webpack demo
5、cd demo && npm install
6、npm run dev  之后 在浏览器里打开 localhost:8080

# 项目目录及文件功能介绍
package.json 该文件定义了这个项目所需要的各种模块，以及项目的配置信息

dependencies 生成环境所需要的依赖  通过: npm install --save modelName

devDependencies 开发环境所需要的依赖

script 标签用来定义一些常用命令，方便我们通过 npm run '命令名称' 的方式来执行

bulid/ 目录和 config/ 目录 用来配置webpack打包和开发、测试所需要的环境配置，

dist/ 目录是项目打包后将打包好的文件放到该目录下

src/ 目录，该目录是开发人员代码所在位置 入口文件是main.js, 路由挂载在App.vue文件中。

static/ 放一些静态资源文件，该文件夹下的文件不会被webpack编译打包，打包的时候只会将他拷贝到dist/static/相应的路径下。

今天下午讲 vue生命周期钩子函数，过滤器filters，混入mixins, 父子组件之间传值，方法调用，涉及到的关键词有【props, $on, $emit,$refs, $children, $parent, Event bus】, 时间允许的话讲【vuex】

beforeCreate（创建前）
created（创建后）
beforeMount（载入前）
mounted（载入后）
beforeUpdate（更新前）
updated（更新后）
beforeDestroy（销毁前）
destroyed（销毁后）

自定义指令，调试项目，api接口调用

# install dependencies
npm install

# serve with hot reload at localhost:9090
npm run dev

# build for production with minification
npm run build


```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
