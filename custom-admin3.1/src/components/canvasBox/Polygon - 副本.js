import Shape from './Shape'
import Point from './Point'
import Vector from './Vector'
// Projection 投影对象
var Polygon = function () {
  this.points = [];
  this.strokeStyle = "blue";
  this.fillStyle = "white";
};

Polygon.prototype = new Shape(); //用原型继承的方法来继承Shape对象的属性与方法

//重新定义多边形碰撞方法
Polygon.prototype.collidesWith = function (shape) {
  var axes = shape.getAxes();
  if (axes === undefined) {
    //多边形与圆形碰撞
    // return polygonCollidesWithCircle(this, shape);
  } else {
    return !this.separationOnAxes(axes.concat(this.getAxes()), shape);
  }
};

//用于得到多边形所有投影轴的方法
Polygon.prototype.getAxes = function () {
  debugger
  var v1 = new Vector(); //代表多边形的相邻两点
  var v2 = new Vector();
  var axes = [];

  for (var i = 0; i < this.points.length - 1; i++) {
    //遍历多边形所有相邻的点得去所有的投影轴
    v1.x = this.points[i].x;
    v1.y = this.points[i].y;

    v2.x = this.points[i + 1].x;
    v2.y = this.points[i + 1].y;
    axes.push(v1.edge(v2).perpendicularNormal());
  }

  //将收尾两点的投影轴也加入
  v1.x = this.points[this.points.length - 1].x;
  v1.y = this.points[this.points.length - 1].y;

  v2.x = this.points[0].x;
  v2.y = this.points[0].y;
  axes.push(v1.edge(v2).perpendicularNormal());
  return axes;
};

//得到多边形各个点在某一条投影轴上投影，并得到投影两端点值，传递给投影对象Projection返回投影对象
Polygon.prototype.project = function (axis) {
  debugger
  var scalars = []; //用于存放所有点向量在投影轴向量上的点积集合，注意点积集合是数量不是向量
  var v = new Vector();
  this.points.forEach(function (point) {
    v.x = point.x;
    v.y = point.y;
    scalars.push(v.dotProduct(axis));
  });

  return new Projection(
    Math.min.apply(Math, scalars),
    Math.max.apply(Math, scalars)
  );
};

//为多边形增加新的点
Polygon.prototype.addPoint = function (x, y) {
  
  this.points.push(new Point(x, y));
};

//创建多边形路径
Polygon.prototype.creatPath = function (context) {
  
  if (this.points.length === 0) {
    return;
  }

  context.beginPath();
  context.moveTo(this.points[0].x, this.points[0].y);

  for (var i = 0; i < this.points.length; i++) {
    context.lineTo(this.points[i].x, this.points[i].y);
  }

  context.closePath(); //让首尾两点相连，创建完闭合路径
};

//移动多边形
Polygon.prototype.move = function (dx, dy) {
  //遍历多边形全部点，更新多边形位置
  for (var i = 0, point; i < this.points.length; i++) {
    point = this.points[i];
    point.x += dx;
    point.y += dy;
  }
};
export default Polygon
 