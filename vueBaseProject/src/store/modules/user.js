import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import VuexPersistence from 'vuex-persist'
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
const user = {
  namespaced: true,
  state: {
    userID: '',
    userName: '',
    AccessToken: getToken(),
    status: '',
    code: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  getters: {
    getUserID: state => state.userID,
    getUserName: state => state.userName ? state.userName : 'lisi',
    getAccessToken: state => state.AccessToken,
    getRoles: state => state.roles,
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name
    },
    SET_USER_ID: (state, userid) => {
      state.userID = userid
    },
    SET_TOKEN: (state, token) => {
      state.AccessToken = token
      setToken(token)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    setUserName({ commit }, name) {
      console.log('ngiehghihihih')
      commit('SET_USER_NAME', name)
    },
    // 用户名登录
    login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          commit('SET_USER_NAME', data.username)
          setToken(data.token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            // 由于mockjs 不支持自定义状态码只能这样hack
            // reject('error')
          }
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            // reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_USER_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_USER_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  },
  // plugins: [vuexLocal.plugin]
}

export default user
