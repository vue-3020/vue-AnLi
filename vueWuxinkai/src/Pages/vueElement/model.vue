<template>
  <div>
    <p>解决遮罩层覆盖问题   :append-to-body="true"</p>
    <el-button size="small" @click="dialogFormVisible = true">弹出层</el-button>
    <div class="waiceng">
      <el-dialog title="收货地址"  :append-to-body="true" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    </div>
    <br>
    <div class="wrap__uc-hdinfo">
    <div class="inner flexbox">
        <div class="uimg">
            <span class="img"><img src="images/uimg/uimg-def.jpg" /></span>
        </div>
        <a class="info flex1" href="#">
            <label class="name">露娜</label>
            <label class="type mt-10">普通会员</label>
            <label class="tel ff-ar">18621535487</label>
        </a>
        <i class="arr iconfont icon-youjiantou c-fff fs-24"></i>
        <a class="lktel" href="tel:15888886666"><i class="iconfont icon-dianhua1"></i></a>
    </div>
    <!--css3实现波纹-->
    <div class="wrap__uc-waves">
        <i class="wave w1"></i>
        <i class="wave w2"></i>
    </div>
</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form:{},
      dialogFormVisible:false,
      formLabelWidth:'200px'
    }
  }
}
</script>
<style>
.waiceng{border: 1px solid red}


.wrap__uc-waves{overflow:hidden;height:1rem;width:100%;position:absolute;bottom:0;}
.wrap__uc-waves .wave{width:15rem; transform-origin:center bottom; position:absolute;left:0;bottom:0;}
.wrap__uc-waves .w1{background:url("~/static/images/a.png") no-repeat;background-size:cover; height:.5rem; animation:anim_wave 5s linear infinite;}
.wrap__uc-waves .w2{background:url("~/static/images/a.png") no-repeat;background-size:cover; height:.7rem; animation:anim_wave 6s linear infinite;}
@keyframes anim_wave {
    0% {
        transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1)
    }
}
</style>
