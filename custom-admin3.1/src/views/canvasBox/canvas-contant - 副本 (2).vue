<template>
  <div>
    <canvas id="canvas" width="800" height="600"></canvas>
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
      canvas: null,
      context: null,
      shapes: [],//用于记录canvas中所有可做碰撞检测的图形
      polygonPoints: [], //存放图形
      polygonStrokeStyles: [], //设置图形颜色
      polygonFillStyles: [],//碰撞后文字提示颜色
      mousedown: { x: 0, y: 0 }, //用于记录鼠标按下的位置
      lastdrag: { x: 0, y: 0 }, //用于记录拖拽时上一次鼠标所在的位置
      shapeBeingDragged: undefined,//用于记录当前正在拖拽的多边形
    }
  },
  methods: {
    //初始化
    init() {
      let _this = this
      _this.canvas = document.getElementById("canvas");
      _this.context = _this.canvas.getContext("2d");
      _this.shapes = [];
      _this.polygonPoints = [
        //用于存入3个多边形的顶点集合
        [
          new Point(250, 150),
          new Point(250, 250),
          new Point(350, 250)
        ],
        [
          new Point(100, 100),
          new Point(100, 150),
          new Point(150, 150),
          new Point(150, 100),
        ],
        [
          new Point(400, 100),
          new Point(380, 150),
          new Point(500, 150),
          new Point(520, 100),
        ],
      ];
      console.log( _this.polygonPoints)
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
    //转换坐标到canvas
    windowToCanvas(x, y) {
      var bbox = canvas.getBoundingClientRect();
      return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height),
      };
    },
    //绘制全部形状
    drawShapes() {
      let _this = this
      _this.shapes.forEach(function (shape) {
        // shape.stroke(context);
        
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
    }


  },
  mounted() {
    let _this = this
    _this.init()
    //事件
    //鼠标近下点
    _this.canvas.onmousedown = function (e) {
      var location = _this.windowToCanvas(e.clientX, e.clientY);
      //遍历所有的多边形，找到鼠标按下点所在的坐标形进行拖拽
      _this.shapes.forEach(function (shape) {
        if (shape.isPointInPath(_this.context, location.x, location.y)) {
          _this.shapeBeingDragged = shape;
          _this.mousedown.x = location.x;
          _this.mousedown.y = location.y;
          _this.lastdrag.x = location.x;
          _this.lastdrag.y = location.y;
        }
      });
    };
    //鼠标移动
    _this.canvas.onmousemove = function (e) {
      var location;
      var dragVector; //用于记录拖拽对方
      //鼠标按下点在一个多边形上，在canvas空白处不做任何处理
      if (_this.shapeBeingDragged != undefined) {
        //console.log('有可拖拽图形')
        location = _this.windowToCanvas(e.clientX, e.clientY);
        dragVector = { x: location.x - _this.lastdrag.x, y: location.y - _this.lastdrag.y };
        _this.shapeBeingDragged.move(dragVector.x, dragVector.y);
        _this.lastdrag.x = location.x;
        _this.lastdrag.y = location.y;
        _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
        _this.drawShapes(); //绘制图形
        _this.detectCollosions(); //碰撞检测
      }
    };
    //鼠标抬起
    _this.canvas.onmouseup = function (e) {
      _this.shapeBeingDragged = undefined;
    };
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
</style>