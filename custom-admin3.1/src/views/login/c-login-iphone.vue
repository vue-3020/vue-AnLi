<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入手机号">
      <Button type="text" slot="append" :disabled="!rightPhone" @click.prevent="getCode">
        <b :class="rightPhone?'unbstyle':'bstyle'"> {{computeTime>0 ? `已发送(${computeTime})s`:'获取验证'}}</b>
      </Button>
      </Input>
    </FormItem>
    <FormItem prop="password" v-if="show_password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="append" @click="show_password=false">
        显示密码
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password" v-else>
      <Input v-model="form.password" placeholder="请输入密码">
      <span slot="append" @click="show_password=true">
        隐藏密码
      </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  data() {
    return {
      show_password: false,
      phone: '',//手机号
      computeTime: 0, //定时器倒计时
      form: {
        userName: '',
        password: '',

      }
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    },
    //获取验证
    rightPhone() {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.userName)
    }
  },
  methods: {
    //提交
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    },
    // 设置定时器，
    getCode() {
      //点击验证多次，定时器会累加，
      if (!this.computeTime) { //只有在没有计时的时候才发送，  只有不等于0 就是true， 
        this.computeTime = 30
        this.interval = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) { //停止计时
            clearInterval(this.interval)
          }
        }, 1000);
        //发送请求 也是在里面做
        // 发送成功返回 0 发送失败返回1
        let code = 0
        if (code == 1) {
          //说明报错，停止定时器
          clearInterval(this.interval)
        }

      }

    }
  }
}
</script>
<style lang="less">
.unbstyle {
  color: blue;
}
.bstyle {
  color: red;
}
</style>