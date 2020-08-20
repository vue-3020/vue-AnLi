<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-tab">
          <Button :class="{'on':loginWay}" @click="loginWay=true">密码登录</Button>
          <Button :class="{'on': !loginWay}" @click="loginWay=false">手机登录</Button>
        </div>
        <div class="form-con" v-if="loginWay">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
        <div class="form-con" v-else>
          <login-iphone @on-success-valid="handleSubmit"></login-iphone>
          <p class="login-tip">手机登录</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { setSessionStorage, clearSessionStorage, getSessionStorage } from "@/utils/common";
import LoginForm from './c-login-form'
import LoginIphone from './c-login-iphone'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm,
    LoginIphone
  },
  data() {
    return {
      loginWay: true
    }
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          let resData = `{"org_user_id":"admin","org_dept_id":"110001","org_term_no":"218.10.97.236","orguser_cn_name":"超级管理员","orgdept_cn_name":"恒丰企业","org_channel_code":"01","org_work_code":"","submit_type":1,"org_dprl_expls":"平台超级管理员","br_sbsbno":"","work_seq":"20200806000000052","token":"-1918411306","org_rs_code":"15","is_need_token":1}`
          setSessionStorage(`CommData`, resData);
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-tab {
      text-align: center;
      button {
        margin: 0 10px;
      }
      .on {
        color: #fff;
        background-color: #2d8cf0;
        border-color: #2d8cf0;
      }
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
