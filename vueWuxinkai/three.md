# 下载

拷贝到 package 中，执行 npm install

```
 "three": "^0.99.0",
```

# 引入连接

```
import * as THREE from 'three';

import TrackballControls from "three/examples/js/controls/TrackballControls.js"

import OBJLoader from "three/examples/js/loaders/OBJLoader.js"

import MTLLoader from "three/examples/js/loaders/MTLLoader.js"
```

# 初始化代码

```

```

# 四大组件

### (1)场景:把任何要显示的东西，放在场景中的任何位置。THREE.Scene = function (){}

### (2)相机:我们最终能够在浏览器中看到的景象, THREE.PerspectiveCamera = function ( fov, aspect, near, far )
* fov: 视角的角度参数
* aspect ：纵横比
* near: 近平面
* far ： 远平面
* ![Alt text](/static/images/xiangji.png)
* var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 ); 夹角45度， 宽/高  最近可以看到1米，最远可以看到1000厘米 

* 2.1 透视相机远程的物体很小，近出的物体很大，
* 2.2 正投影相机，远处和进处一样大

### (3)渲染器： 决定了画家怎么将眼前的场景画到屏幕上。
* THREE.WebGLRenderer()



### (4)几何体：就是要显示在场景中的对象。网格模型
