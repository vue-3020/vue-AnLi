<template>
  <div>
    <Row :gutter="16">
      <h2>（1）数组对象去重</h2>
      <Col span="12">
      <Card>
        <Row>
          <Col span="12">
          <pre>
           list: [
              { id: 1, name: '关羽' },
              { id: 2, name: '张飞' },
              { id: 3, name: '黄忠' },
              { id: 4, name: '赵云' },
              { id: 5, name: '魏延' },
              { id: 6, name: '法正' },
              { id: 7, name: '马良' },
            ],
        </pre>
          </Col>
          <Col span="12">
          <pre>
           list2: [
              { id: 1, name: '张辽' },
              { id: 2, name: '徐晃' },
              { id: 3, name: '夏侯惇' },
              { id: 8, name: '庞德' },
              { id: 9, name: '许褚' },
              { id:10, name: '荀彧' },
            ]
        </pre>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <p>用id去重, 讲两个数组合并成一个数组去重</p>
          <pre>
              this.data1 = doubleUnique([...this.list, ...this.list2], 'id')
            </pre>
          <p>如果想保留，'张辽，'徐晃，夏侯惇' ,<span style="color:blue">增加了后面覆盖前面的方法</span></p>
          <pre>
              this.data1 = doubleUnique([ ...this.list,...this.list2], 'id',true)
            </pre>
          </Col>
        </Row>
      </Card>
      </Col>
      <Col span="12">
      <Card>
        <p><b>并集</b>：A和B 包括A的所有部分也包括B的所有部分 A={1,2,3} B={3,4,5} 交集{1,2,3,4,5} <span style="color:red">也就是我们说的去重</span></p>
        <List border size="small">
          <ListItem v-for="item in data1"><b style="margin-right:30px">{{item.id}}</b><span>{{item.name}}</span></ListItem>
        </List>
      </Card>
      </Col>
    </Row>
    <br>
    <Row :gutter="16">
      <Col span="12">
      <Card>
        <Row>
          <Col span="12">
          <pre>
           list: [
              { id: 1, name: '关羽' },
              { id: 2, name: '张飞' },
              { id: 3, name: '黄忠' },
              { id: 4, name: '赵云' },
              { id: 5, name: '魏延' },
              { id: 6, name: '法正' },
              { id: 7, name: '马良' },
            ],
        </pre>
          </Col>
          <Col span="12">
          <pre>
           list2: [
              { id: 1, name: '张辽' },
              { id: 2, name: '徐晃' },
              { id: 3, name: '夏侯惇' },
              { id: 8, name: '庞德' },
              { id: 9, name: '许褚' },
              { id:10, name: '荀彧' },
            ]
        </pre>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <p>求差集</p>
          <pre>
             this.data2 = diff(this.list, this.list2, 'id')
            </pre>
          <p>求交集 重叠部分</p>
          <pre>
              this.data1 = overlap(this.list, this.list2, 'id')
            </pre>
          <p>求补集 </p>
          <pre>
           this.data4 = complement(this.list, this.list2, 'id')
            </pre>
          </Col>

        </Row>
      </Card>
      </Col>
      <Col span="12">
      <Card>
        <p><b>差集</b> A和B A且不属于B的元素构成的集合 A={1,2,3,4,5} B={1,2,3,6} {4,5} <span style="color:red">把A里面和B相同的部分删除</span></p>
        <List border size="small">
          <ListItem v-for="item in data2"><b style="margin-right:30px">{{item.id}}</b><span>{{item.name}}</span></ListItem>
        </List>
        <br>
        <p><b>求交集 重叠部分</b> A和B， 既属于A也属于B的部分 ， A={1,2,3,4,5} B={1,2,3,6} {1,2,3} <span style="color:red">获取A和B相同部分</span></p>
        <List border size="small">
          <ListItem v-for="item in data3"><b style="margin-right:30px">{{item.id}}</b><span>{{item.name}}</span></ListItem>
        </List>
        <br>
        <p><b>求补集</b> A和B 即把B中属于A的元素去掉 ， A={1,2,3,4,5} B={1,2,3,6} {6}<span style="color:red">即把B中属于A的元素删除</span></p>
        <List border size="small">
          <ListItem v-for="item in data4"><b style="margin-right:30px">{{item.id}}</b><span>{{item.name}}</span></ListItem>
        </List>
      </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <Card>

      </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <Card>

      </Card>
      </Col>
    </Row>
    <br>
  </div>

</template>
<script>

import { forEach, getIntersection } from '@/libs/tools'
import { doubleUnique, diff, overlap, complement, deleteBracket, deleteDescendingOrder, getType, judgeAttr, trimAll, filesCopy ,getMonthDays} from '@/libs/toolsES6'
export default {

  data() {
    return {
      list: [
        { id: 1, name: '关羽' },
        { id: 2, name: '张飞' },
        { id: 3, name: '黄忠' },
        { id: 4, name: '赵云' },
        { id: 5, name: '魏延' },
        { id: 6, name: '法正' },
        { id: 7, name: '马良' },
      ],
      list2: [
        { id: 1, name: '张辽' },
        { id: 2, name: '徐晃' },
        { id: 3, name: '夏侯惇' },
        { id: 8, name: '庞德' },
        { id: 9, name: '许褚' },
        { id: 10, name: '荀彧' },
      ],
      list3: [
        { uid: 1, id: 1, name: '郭嘉' },
        { uid: 2, id: 2, name: '程昱' },
        { uid: 6, id: 3, name: '杨修' },
        { uid: 4, id: 4, name: '糜芳' },
        { uid: 8, id: 5, name: '庞统' },
        { uid: 1, id: 4, name: '诸葛亮' },
        { uid: 9, id: 3, name: '周瑜' },
        { uid: 3, id: 2, name: '甘宁' },
        { uid: 1, id: 1, name: '吕蒙' },
      ],

      data1: [],//数组去重
      data2: [],//求差集
      data3: [],
      data4: []
    }
  },

  mounted() {
    //（1）js手写 forEach 方法
    forEach([1, 2, 3, 4, 5, 6], function (a, c, e) { console.log(`当前项${a}`, `索引${c}`, `总数据:${e}`) });

    //（2）数组对象去重
    this.data1 = doubleUnique([...this.list, ...this.list2], 'id')
    debugger
    console.log(`数组求并集，去重`, this.data1)

    //（3）数组求差集
    this.data2 = diff(this.list, this.list2, 'id')
    console.log(`数组求差集`, this.data2)

    //（4）求交集 重叠部分 
    this.data3 = overlap(this.list, this.list2, 'id')


    //(5)补集 A和B 即把B中属于A的元素去掉 
    this.data4 = complement(this.list, this.list2, 'id')
    console.log(`补集`, this.data4)

    //删除数组中括号
    this.data5 = deleteBracket(['吕布', '赵云', '马超', '许褚', '典韦', '魏延'])
    console.log(`删除数组中括号`, this.data5)

    //倒序删除
    this.data6 = deleteDescendingOrder(this.list3)
    console.log(`倒序删除`, this.data6)

    //监测数据类型
    let type1 = getType([])
    let type2 = getType({})
    let type3 = getType('')
    let type4 = getType(1)
    console.log(`监测数据类型`, type1, type2, type3, type4)

    //查询是否包含这个属性
    let type5 = judgeAttr({ uid: 1, id: 1, name: '吕蒙' }, 'name')
    let type6 = judgeAttr({ uid: 1, id: 1, name: '吕蒙' }, 'age')
    console.log(`查询是否包含这个属性`, type5, type6)

    //删除所有空格
    console.log(`删除所有空格`, trimAll(` 123 456 789 `))



    //深拷贝
    let list4 = [{ uid: 1, id: 1, name: '吕蒙', age: 23 }]
    let filesData = filesCopy(list4)
    list4[0].name = '张辽'
    list4[0].age = 44
    console.log(`原始值被修改`, list4, `拷贝值，没有被修改`, filesData)


    // 过滤对象属性
    let student = { id: 1, age: 20, name: '刘备', sex: "男" }
    let { id, age, ...params } = student
    console.log(`过滤对象属性`, params)

    //对象是否为空
    var data = {};
    var arr = Object.keys(data);
    console.log(`对象是否为空`, arr.length == 0);//true 

  //获取年月日
  console.log(`获取年月日`,getMonthDays(new Date()))
    
  },

  methods: {



  }
}
</script>
