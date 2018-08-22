<template>
  <div class="login-wrap">
      <div class="ms-title">后台管理系统</div>
      <div class="ms-login">
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="0px" class="demo-userInfo">
              <el-form-item prop="username">
                  <el-input v-model="userInfo.username" placeholder="username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" placeholder="password" v-model="userInfo.password" @keyup.enter.native="submitForm('userInfo')"></el-input>
              </el-form-item>
              <div class="login-btn">
                  <el-button type="primary" @click="submitForm('userInfo')">登录</el-button>
              </div>
              <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
          </el-form>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters('user', ['getUserID', 'getUserName', 'getAccessToken', 'getRoles'])
  },
  data: function () {
    return {
      userInfo: {
        username: "admin",
        password: "admin"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations('user', ['SET_USER_NAME', 'SET_USER_ID', 'SET_TOKEN']),
    ...mapActions('user', ['setUserName', 'login', 'LogOut', 'FedLogOut', 'ChangeRoles', 'getUserInfo']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // mock js 返回的是提交的参数，所以这里只是演示登录后信息的存储
          this.login(this.userInfo).then((response) => {
            this.$router.push("/");
            // 可以通过下面方式调用 action 和 mutation
            //this.SET_USER_NAME(response.username)
            // this.setUserName(response.username)
          }).catch(error => {
            this.$message({
              message: error != null ? error : '登录失败',
              center: true
            });
          })
        } else {
          this.$message({
            message: '登录信息有误',
            center: true
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
