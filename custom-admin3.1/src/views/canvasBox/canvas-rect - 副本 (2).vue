<template>
  <div class="box">
    <canvas id="canvas" width="800" height="600"></canvas>
    <Row>
      <ul>
        <li v-for="item in addBtnList"><Button :class="{'active':item.type==btnStyle}" @click="addRect(item)" size="large">{{item.name}}</Button></li>
      </ul>
    </Row>
    <br>
    <Row>
      <ul>
        <li v-for="item in deleteBtnList" :class="{'active2':item.type==delBtnStyle}"><Button @click="handleDeleteRect(item)" size="large">{{item.name}}</Button></li>
      </ul>
    </Row>
    <br>
    <Row>
      <Button @click="move()" size="large">移动</Button>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'canvas-rect',
  props: [],
  data() {
    return {
      delItemTpye: {},//删除的类型
      delBtnStyle: '',//删除按钮设置
      btnStyle: '',//新增按钮颜色
      context: null, //画布方法属性
      canvas: null,// 画布
      isDraw: false, //判断是否点击事件
      isEdit: false,//区分删除和新增
      pointsItem: [], //临时存储图形坐标
      rectStyleAll: {},// 矩形信息
      rectLineWidth: 1.5,
      addBtnList: [
        { type: 'A1', style: 0, name: '添加警戒区', color: 'rgba(255,0,0,.4)', lineColor: 'rgba(255,0,0,1)' },
        { type: 'A2', style: 0, name: '添加受控区', color: 'rgba(255,192,203,.4)', lineColor: 'rgba(255,192,203,1)' },
        { type: 'A3', style: 0, name: '添加关注区', color: 'rgba(0,0,255,.4)', lineColor: 'rgba(0,0,255,1)' },
        { type: 'A4', style: 0, name: '添加非布控区', color: 'rgba(0,128,0,.4)', lineColor: 'rgba(0,128,0,1)' }
      ],
      deleteBtnList: [
        { type: 'A1', style: 0, name: '删除警戒区' },
        { type: 'A2', style: 0, name: '删除受控区' },
        { type: 'A3', style: 0, name: '删除关注区' },
        { type: 'A4', style: 0, name: '删除非布控区' }
      ],
      imgData: null,
      polygons: [], //构造函数获取所有信息
      currPolygon: null,
    }
  },
  methods: {
    //初始化代码
    canvasInit() {
      let _this = this
      _this.canvas = document.getElementById("canvas");
      _this.context = _this.canvas.getContext("2d");
      _this.canvas.style.border = "1px solid #f9f9f9";
      _this.drawGrid("lightgray", 20, 20); //画布

      _this.context.save();
      _this.context.fillStyle = "cornflowerblue";
      _this.context.font = "14px arial";
      // _this.context.font = "14px arial";
      _this.context.fillText("目前所有区域为空", _this.context.canvas.width / 2 - 100, _this.context.canvas.height / 2 - 30);
      _this.context.fillText("请进行区域管理操作", _this.context.canvas.width / 2 - 107, _this.context.canvas.height / 2);
      _this.context.restore();
    },
    //生成随机数
    makeId() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text;
    },
    //画网格线
    drawGrid(color, stepx, stepy) {
      let _this = this
      _this.context.save();
      _this.context.lineWidth = 0.5;
      _this.context.strokeStyle = color;
      for (var i = stepx + 0.5; i < _this.context.canvas.width; i += stepx) {
        _this.context.beginPath();
        _this.context.moveTo(i, 0);
        _this.context.lineTo(i, _this.context.canvas.height);
        _this.context.stroke();
      }
      for (var i = stepy + 0.5; i < _this.context.canvas.height; i += stepy) {
        _this.context.beginPath();
        _this.context.moveTo(0, i);
        _this.context.lineTo(_this.context.canvas.width, i);
        _this.context.stroke();
      }
      _this.context.restore();
    },
    //获取坐标
    windowToCanvas(canvas, x, y) {
      let _this = this
      if (!canvas) {
        console.log("canvas not exist");
        return { x: 0, y: 0 };
      }
      var box = _this.canvas.getBoundingClientRect();
      return {
        x: x - box.left * (canvas.width / box.width),
        y: y - box.top * (canvas.height / box.height),
      };
    },
    //新增 多边形
    addRect(item) {
      let _this = this
      _this.delBtnStyle = ''
      if (item.style) {
        this.addBtnList.map(v => v.style = 0)
        this.btnStyle = ''
        this.isEdit = true
        this.rectStyleAll = {}
      } else {
        this.isEdit = false
        this.rectStyleAll = item
        this.clear()
        this.addBtnList.map(v => v.style = 0)
        item.style = 1
        this.btnStyle = item.type
      }

    },
    //删除 或复制画布内容
    clear() {
      let _this = this
      if (_this.imgData) {
        _this.context.putImageData(_this.imgData, 0, 0);  //getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 
      } else {
        _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.drawGrid("lightgray", 20, 20);
      }
    },
    //绘制 形状 完成
    drawingComplete() {
      let _this = this
      _this.context.closePath();
      _this.canvas.style.cursor = "auto";
      _this.isDraw = false;
      _this.pointsItem = [];
      _this.currPolygon = null;
      _this.imgData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
      _this.context.putImageData(_this.imgData, 0, 0);
      _this.context.closePath();
    },
    //分类删除
    handleDeleteRect(item) {
      let _this = this
      _this.addBtnList.map(v => v.style = 0)
      _this.btnStyle = ''
      _this.isEdit = true
      //添加图标
      _this.delItemTpye = item
      _this.delBtnStyle = item.type
      _this.handleResetRect()
    },
    //重新绘制页面
    handleResetRect() {
      let _this = this
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.drawGrid("lightgray", 20, 20);
      _this.polygons.forEach(function (item, i) {  //利用圆形上的方法划入到页面
        item.createPath().draw().addIncon();
      });
      _this.imgData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
    },
    //确认删除
    handleDelRectItem(item) {
      let _this = this
      _this.polygons = _this.polygons.filter(v => v.id != item.id)
      //清除画布从新写入到画布上
      _this.handleResetRect()
    },
    //边界判断，离开边界删除内容
    move() {
      console.log(5555)
    }
  },
  mounted() {
    let _this = this
    //对象新增属性 用了做删除用
    _this.canvasInit()
    //构造函数  ------------------------------------------------------------------------------

    //图形构造函数
    function Polygon(points, sides, item, isFill) {
      this.id = item.id; // id
      this.rectType = item.type; // 矩形类型
      this.rectName = item.name; // 矩形名字
      this.delIcon = require(`../../assets/images/${item.type}.png`); // 图标颜色
      this.rectX = 0; //物体移动速度x
      this.rectY = 0; //物体y移动速度y
      this.strokeStyle = item.lineColor; // 边线颜色
      this.fillStyle = item.color; //背景色
      this.sides = sides; // 边线粗细
      this.isFill = isFill; //新增还是删除
      this.points = points; //数据
    }
    Polygon.prototype = {
      //绘制路径，
      createPath: function () {
        _this.context.beginPath();
        _this.context.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 0, len = this.points.length; i < len; i++) {
          _this.context.lineTo(this.points[(i + 1) % len].x, this.points[(i + 1) % len].y);
        }
        _this.context.closePath();
        return this;
      },
      //填充到页面
      draw: function () {
        _this.context.save();
        _this.context.strokeStyle = this.strokeStyle;
        _this.context.lineWidth = this.sides;
        _this.context.fillStyle = this.fillStyle;
        _this.context.stroke();
        if (this.isFill) {
          _this.context.fill();
        }
        _this.context.restore();
        return this;
      },
      //添加图标
      addIncon: function () {
        let _ths = this
        var iconImg = new Image();
        iconImg.src = this.delIcon;
        iconImg.onload = function () {
          if (_this.delItemTpye.type == _ths.rectType) {
            let xAll = _ths.points.map(v => v.x)
            let xMax = Math.max.apply(null, xAll)
            let xMin = Math.min.apply(null, xAll)
            let yAll = _ths.points.map(v => v.y)
            let yMax = Math.max.apply(null, yAll)
            let yMin = Math.min.apply(null, yAll)
            let X = (xMax + xMin - 10) / 2
            let Y = (yMax + yMin - 10) / 2
            _this.context.drawImage(iconImg, X, Y) //插入图形
          }
        };
        return this
      }
    }
    //构造函数  ------------------------------------------------------------------------------

    //鼠标 点击 事件
    _this.canvas.addEventListener("mousedown", function (e) {
      if (Object.keys(_this.rectStyleAll).length == 0) return _this.$Message.error('请选择区域')
      if (e.buttons == 1) {
        var pos = _this.windowToCanvas(_this.canvas, e.clientX, e.clientY);
        if (!_this.isEdit) {
          _this.isDraw = true; //按下的是左键
          canvas.style.cursor = "crosshair";//改变划线鼠标样式
          _this.pointsItem.push(pos);
        } else {
          //是否有删除权限
          canvas.style.cursor = 'auto';
          _this.polygons.forEach(function (item, i) {
            item.createPath();//创建路径时才能检测点是否在当前路径中
            if (_this.context.isPointInPath(pos.x, pos.y)) {
              if (_this.delItemTpye.type == item.rectType) {
                _this.$Modal.confirm({
                  title: '提示',
                  content: '<p>是否删除</p>',
                  onOk: () => {
                    _this.handleDelRectItem(item)
                  }
                });
              } else {
                console.log('类型不同无法删除')
              }
            }
          });
        }
      }
    }, false);
    //鼠标 移动 事件
    _this.canvas.addEventListener("mousemove", function (e) {
      if (_this.isDraw) {
        var pos = _this.windowToCanvas(_this.canvas, e.clientX, e.clientY); //获取图形移动坐标点
        _this.clear();
        _this.context.beginPath(); //开辟一个新路径
        _this.pointsItem.forEach((p, i) => {
          //过滤掉undefined
          _this.context[i != 0 ? "lineTo" : "moveTo"](p.x, p.y); //moveTo  移动起始点     lineTo 绘制线(矩形、圆形、图片...)
        });
        _this.context.lineWidth = _this.rectLineWidth; //边线粗细
        _this.context.strokeStyle = _this.rectStyleAll.lineColor; //边线颜色
        _this.context.lineTo(pos.x, pos.y);
        _this.context.stroke(); //绘制边线
      }
    }, false);
    //双击失去焦点
    canvas.addEventListener("dblclick", function () {
      //绘制图形
      if (_this.pointsItem.length == 0) return
      //生成随机id
      _this.rectStyleAll.id = _this.makeId() //删除用
      //分类插入不同颜色 删除图标
      _this.polygons.push(new Polygon(_this.pointsItem, _this.rectLineWidth, _this.rectStyleAll, true));
      _this.currPolygon = _this.polygons[_this.polygons.length - 1];
      _this.currPolygon.createPath().draw()
      _this.drawingComplete();
    }, false);
  }
}
</script>
<style lang="less" scoped>
body {
  background: #fff;
}

#canvas {
  margin-top: 30px;
  background: #eee;
}
ul {
  list-style: none;
  display: flex;
  li {
    margin-right: 30px;
  }
}
.ivu-btn.active {
  background-color: #e13d13;
  border-color: #e13d13;
  color: #fff;
}
.active2 {
  .ivu-btn {
    background-color: #3913e1;
    border-color: #3913e1;
    color: #fff;
  }
}
</style>