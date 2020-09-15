class Shape {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.strokeStyle = "rgba(255,253,208,0.9)";
    this.fillStyle = "rgba(147,197,114,0.8)";
  }

  //碰撞检测
  collidesWith(shape) {
    //返回true表示碰撞了， false表示没有碰撞
    var axes = this.getAxes().concat(shape.getAxes()); //得到拖拽形状与传入形状的所有投影轴集合
    return !this.separationOnAxes(axes, shape); //返回在任何一个投影轴上的投影是否有公开
  }

  //检测在投影轴上投影是否有分离
  separationOnAxes(axes, shape) {
    var axis;
    var projection1;
    var projection2;
    for (var i = 0; i < axes.length; ++i) {
      axis = axes[i];
      projection1 = shape.project(axis); //得到形状在当前投影轴上的投影
      projection2 = this.project(axis); //得到当前拖拽形状在当前投影轴上的投影
      if (!projection1.overlaps(projection2)) {
        //检测两个投影在当前投影轴上是否重叠,分离返回false
        return true; //在当前投影轴上分离返回true,表示两个形状肯定没有碰撞，不需在检测后面的投影轴了，
      }
    }
    return false; //检测完全部的投影轴上的投影没和一个分离的，返回false;
  }

  //返回投影的最大值与最小值
  project(axis) {
    throw "project(axis) 还没有实现呢"; //这里不写是因为不同的形状的计算投影最大值与最小值的方法不同，不能统一写在这里
  }

  //得到形状所有的投影轴
  getAxes() {
    throw "getAxes() 还没有实现呢"; //这里不写是因为不同的形状得到投影轴的方法也不一样，不能统一写在这里，如圆形与多边形
  }

  //移动形状
  move(dx, dy) {
    throw "move(dx,dy) 还没有实现呢"; //这里不写是因为不同的形状移动的方法不同，不能统一写在这里
  }

  //绘制图形的方法
  //创建路径
  creatPath(context) {
    throw "creatPath(context) 还没有实现呢"; //这里不写是因为不同的形状绘制的方法不同，不能统一写在这里
  }

  //图形填充方法
  fill(context) {
    context.save();
    context.fillStyle = this.strokeStyle;
    this.creatPath(context);
    context.fill();
    context.restore();
  }

  //图形描边方法
  stroke() {
    context.save();
    context.strokeStyle = this.strokeStyle;
    this.creatPath(context);
    context.stroke();
    context.restore();
  }

  //判断当前鼠标的点是否在当前形状的路径内
  isPointInPath(context, x, y) {
    this.creatPath(context);
    return context.isPointInPath(x, y); //该方法用于检测点是否在当前路径
  }
}

export default Shape
