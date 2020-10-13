<template>
  <div class="box">
    <div class="box-in" v-show="!btnStyle"> </div>
    <canvas id="canvas" width="800" height="600"></canvas>
    <br>
    <Row>
      <ul>
        <li v-for="item in addBtnList"><Button :class="{'active':item.type==btnStyle}" @click="addRect(item)" size="large">{{item.name}}</Button></li>
      </ul>
    </Row>
    <br>
    <Row>
      <ul>
        <li v-for="item in deleteBtnList"><Button :class="{'active':item.type==btnStyle}" @click="delectRect(item)" size="large">{{item.name}}</Button></li>
      </ul>
    </Row>
  </div>
</template>
<script>
import Vector from "../../components/canvasBox/Vector";
import Projection from "../../components/canvasBox/Projection";
import Point from "../../components/canvasBox/Point";
import Shape from "../../components/canvasBox/Shape";
import Polygon from "../../components/canvasBox/Polygon";
export default {
  name: 'bigMinGrid',
  props: [],
  data() {
    return {
      btnStyle: "", //按钮色
      rectBgColor: '', //背景色
      rectBorderColor: '',//边线颜色
      addBtnList: [
        { type: 'A1', style: 0, name: '添加警戒区', color: 'red', lineColor: '#000' },
        { type: 'A2', style: 0, name: '添加受控区', color: 'pink', lineColor: '#000' },
        { type: 'A3', style: 0, name: '添加关注区', color: 'blue', lineColor: '#000' },
        { type: 'A4', style: 0, name: '添加非布控区', color: 'green', lineColor: '#000' }
      ],
      deleteBtnList: [
        { type: 'D1', style: 0, name: '删除警戒区' },
        { type: 'D2', style: 0, name: '删除受控区' },
        { type: 'D3', style: 0, name: '删除关注区' },
        { type: 'D4', style: 0, name: '删除非布控区' }
      ],
      typeIn: "",
      canvas: null,
      context: null,
      imgData: null,
      isDraw: false,
      shapes: [],//用于记录canvas中所有可做碰撞检测的图形
      polygonPoints: [], //存放图形
      pointsItem: [],// 单个图形
      polygonStrokeStyles: [], //设置图形颜色
      polygonFillStyles: [],//碰撞后文字提示颜色
      mousedown: { x: 0, y: 0 }, //用于记录鼠标按下的位置
      lastdrag: { x: 0, y: 0 }, //用于记录拖拽时上一次鼠标所在的位置
      shapeBeingDragged: undefined,//用于记录当前正在拖拽的多边形
    }
  },
  methods: {
    //新增图形
    addRect(item) {
       
      debugger
      if (item.style) {
        this.btnStyle = ''
        this.rectBgColor = ''
        this.rectBorderColor = ''
      } else {
        this.addBtnList.map(v => v.style = 0)
        item.style = 1
        // this.btnStyle = item.type
        // this.rectBgColor = item.color
        // this.rectBorderColor = item.lineColor
      }
    },
    //删除图形
    delectRect(item) {
      if (this.polygonPoints.length == 0) return this.$Message.error('没有要删除的内容')

      if (item.style) {
        this.btnStyle = ''
      } else {
        this.addBtnList.map(v => v.style = 0)
        item.style = 1
        this.btnStyle = item.type
      }
    },
    //初始化
    init() {
      let _this = this
      _this.canvas = document.getElementById("canvas");
      _this.context = _this.canvas.getContext("2d");
      _this.shapes = [];
      _this.polygonStrokeStyles = ["blue", "yellow", "pink"]; //3个多边形的描边颜色
      _this.polygonFillStyles = ["rgba(255,255,0,0.7)", "rgba(100,140,230,0.6)", "rgba(255,255,255,0.8)",]; //3个之边形的填充颜色
      //初始化    polygon:多边形    points:点(x,y)    shapes:形状
      for (var i = 0; i < _this.polygonPoints.length; i++) {
        var polygon = new Polygon();
        var points = _this.polygonPoints[i];
        polygon.strokeStyle = _this.polygonStrokeStyles[i]; // 边线颜色
        polygon.fillStyle = _this.polygonFillStyles[i];  //填充颜色
        points.forEach(function (point) {
          polygon.addPoint(point.x, point.y);
        });
        _this.shapes.push(polygon);
      }
      _this.context.shadowColor = "rgba(100,140,255,0.5)";
      _this.context.shadowBlur = 4;
      _this.context.shadowOffsetX = 2;
      _this.context.shadowOffsetY = 2;
      _this.context.font = "38px arial";
      
      //绘制所有的多边形
      _this.drawShapes();
      _this.context.save();
      _this.context.fillStyle = "cornflowerblue";
      _this.context.font = "24px arial";
      _this.context.fillText("拖拽图形相碰撞", 10, 25);
      _this.context.restore();

    },
    //开始拖拽
    windowToCanvas(canvas, x, y) {
      let _this = this
      if (!canvas) {
        console.log("canvas not exist");
        return { x: 0, y: 0 };
      }
      _this.context.beginPath();
      var box = _this.canvas.getBoundingClientRect();
      return {
        x: x - box.left * (canvas.width / box.width),
        y: y - box.top * (canvas.height / box.height),
      };
    },
    //绘制全部形状
    drawShapes() {
      let _this = this
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.shapes.forEach(function (shape) {
        shape.fill(_this.context);
      });
    },
    //检测碰撞
    detectCollosions() {
      let _this = this
      var textY = 30;
      var numShapes = _this.shapes.length;
      var shape;
      var i;
      if (_this.shapeBeingDragged) {
        for (var i = 0; i < numShapes; ++i) {
          shape = _this.shapes[i];
          if (shape != _this.shapeBeingDragged) {

            if (_this.shapeBeingDragged.collidesWith(shape)) {
              //返回true: 碰撞了，false: 没有碰撞
              _this.context.fillStyle = shape.fillStyle;
              _this.context.fillText("碰撞了", 20, textY);
              textY += 40;
            }
          }
        }
      }
    },


    //删除
    clear() {
      let _this = this
      if (_this.imgData) {
        _this.context.putImageData(_this.imgData, 0, 0);  //getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 
      } else {
        _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      }
    },
    //绘制完成
    drawingComplete() {
      let _this = this
      _this.addAllPoint(_this.pointsItem);
      _this.context.stroke()
      _this.context.fill(); // 填充图形，
      _this.context.closePath();
      _this.canvas.style.cursor = "pointer";
      _this.isDraw = false;
      _this.pointsItem = [];
      _this.imgData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
      _this.context.putImageData(_this.imgData, 0, 0);
      _this.context.closePath();
    },
    //转化为我们需要得格式
    addAllPoint(pointItem) {
      console.log(5555,pointItem)
      let _this = this
      let array = pointItem.map((v) => new Point(v.x, v.y));
      _this.polygonPoints.push(array);
       console.log( _this.polygonPoints)
      _this.init()
    }
  },
  mounted() {
    let _this = this
    _this.init()

    _this.context.lineWidth = 1.5; //线得粗细
    _this.context.strokeStyle = "rgba(255,0,0,1)"; //填充边线颜色
    _this.context.fillStyle = "rgba(100,140,230,0.5)"; //填充图形颜色


    //点下按钮
    _this.canvas.addEventListener("mousedown", function (e) {
      if (e.buttons == 1) {//按下的是左键
        var pos = _this.windowToCanvas(_this.canvas, e.clientX, e.clientY);
        _this.pointsItem.push(pos);
        
        _this.isDraw = true;
        canvas.style.cursor = "crosshair";
        console.log(`获取画布上的位置`, pos);
      }
    }, false);

    // 鼠标移动 移动
    _this.canvas.addEventListener("mousemove", function (e) {
      if (!_this.isDraw) return;
      var pos = _this.windowToCanvas(_this.canvas, e.clientX, e.clientY);
      _this.context.save();
      _this.clear();
      _this.context.beginPath(); //创造另一条路径的分界线
      _this.pointsItem.forEach((p, i) => {
        //过滤掉undefined
        _this.context[i != 0 ? "lineTo" : "moveTo"](p.x, p.y); //moveTo  移动起始点     lineTo 绘制线(矩形、圆形、图片...)
      });
      _this.context.lineTo(pos.x, pos.y);
      _this.context.stroke(); //绘制边线
      _this.context.restore();
    }, false);

    //结束绘制
    canvas.addEventListener("dblclick", function () {
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
  background: #eee;
}
.ivu-btn.active {
  background-color: #e13d13;
  border-color: #e13d13;
  color: #fff;
}
.box {
  position: relative;
  width: 800px;
  height: 600px;
  .box-in {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(200, 11, 11, 0.2);
  }
}
ul {
  list-style: none;
  display: flex;
  li {
    margin-left: 30px;
  }
}
</style>