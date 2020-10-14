class Polygon {
  constructor(points, sides, item, isFill, move = { x: 0, y: 0 }) {
    this.id = item.id; // id
    this.rectType = item.type; // 矩形类型
    this.rectName = item.name; // 矩形名字
    this.delIcon = item.hasOwnProperty('delIcon') ? require(`../../assets/images/${item.type}.png`) : ''; // 图标颜色
    this.rectX = move.x; //物体移动速度x
    this.rectY = move.y; //物体y移动速度y
    this.strokeStyle = item.lineColor; // 边线颜色
    this.fillStyle = item.color; //背景色
    this.sides = sides; // 边线粗细
    this.isFill = isFill; //新增还是删除
    this.points = points; //数据
  }


  //绘制路径，
  createPath(context) {
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 0, len = this.points.length; i < len; i++) {
      context.lineTo(this.points[(i + 1) % len].x, this.points[(i + 1) % len].y);
    }
    context.closePath();
    return this;
  }
  //填充到页面
  draw(context) {
    context.save();
    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.sides;
    context.fillStyle = this.fillStyle;
    context.stroke();
    if (this.isFill) {
      context.fill();
    }
    context.restore();
    return this;
  }
  //添加图标
  addIncon(context, delItemTpye) {
    let _ths = this
    var iconImg = new Image();
    iconImg.src = this.delIcon;
    iconImg.onload = function () {
      if (delItemTpye.type == _ths.rectType) {
        let xAll = _ths.points.map(v => v.x)
        let xMax = Math.max.apply(null, xAll)
        let xMin = Math.min.apply(null, xAll)
        let yAll = _ths.points.map(v => v.y)
        let yMax = Math.max.apply(null, yAll)
        let yMin = Math.min.apply(null, yAll)
        let X = (xMax + xMin - 10) / 2
        let Y = (yMax + yMin - 10) / 2
        context.drawImage(iconImg, X, Y) //插入图形
      }
    };
    return this
  }
}

export default Polygon
