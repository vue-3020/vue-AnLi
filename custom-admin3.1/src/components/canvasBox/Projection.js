// Projection 投影对象
class Projection {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
  //检测两个多边形在同一个投影轴上的投影是否有重合,重叠返回true
  overlaps(projection) {
    return this.max > projection.min && projection.max > this.min;
  }
}

export default Projection
 