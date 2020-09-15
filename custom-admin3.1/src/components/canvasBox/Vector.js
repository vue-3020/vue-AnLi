//对象测量

class Vector {
  constructor (x, y){
    this.x = x;
    this.y = y;
  }

  //得到向量的长度
  getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  //两向量相加得到的新向量
  add(anotherVector) {
    var v = new Vector();
    v.x = this.x + anotherVector.x;
    v.y = this.y + anotherVector.y;
    return v;
  }

  //两向量相减,得到边缘法向量 OA-OB = BA;
  subtract(anotherVector) {
    var v = new Vector();
    v.x = this.x - anotherVector.x;
    v.y = this.y - anotherVector.y;
    return v;
  }

  //两向量的点积，一个向量在别一处向量上的投影,得到的不是一个向量，是投影的长度
  dotProduct(anotherVector) {
    return this.x * anotherVector.x + this.y * anotherVector.y;
  }

  //得到多边形的边缘向量,即多边形，相邻两点的向量
  edge(anotherVector) {
    return this.subtract(anotherVector);
  }

  //得到垂直于边缘向量的边缘法向量，即投影轴向量
  perpendicular() {
    var v = new Vector();
    v.x = this.y;
    v.y = 0 - this.x;
    return v;
  }

  //得去某向量的单位向量，即方向相同，长度为1的向量，单位向量主要是用来指示方向的
  normalize() {
    var v = new Vector(0, 0);
    var m = this.getMagnitude();
    if (m != 0) {
      //避免向量为0
      v.x = this.x / m;
      v.y = this.y / m;
    }
    return v;
  }

  //得去边缘法向量的单位向量，即投影轴向量的单位方向，表示投影轴的方向
  perpendicularNormal() {
    var p = this.perpendicular();
    return p.normalize();
  }
}
export default Vector