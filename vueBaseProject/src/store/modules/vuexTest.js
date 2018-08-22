import { getData, getTableList } from "@/api/testApi";
const vuexTest = {
  namespaced: true,
  state: {
    testState: '测试',
    testAge: 18,
    msgData: {},
    testComputed: '通过computed中获取该值',
    tableData: []
  },
  getters: {
    getTestState: state => state.testState,
    getTestAge: state => {
      return state.testAge * 2
    },
    getMsgData: state => {
      return state.msgData
    },
    getTableList: state => {
      return state.tableData
    }
  },
  mutations: {
    set_test_state: (state, params) => {
      state.testState = params.testState
    },
    change_test_age: (state, newAge) => {
      state.testAge = newAge + 2
    },
    get_ajax_data: (state, newData) => {
      state.msgData = newData
    },
    set_table_data: (state, newData) => {
      state.tableData = newData
    }
  },
  actions: {
    setTestState({ commit }, params) {
      commit('set_test_state', params)
    },
    changeTestAge({ commit }, newAge) {
      commit('change_test_age', newAge)
    },
    getAjaxData({ commit }, params) {
      return new Promise((resolve, reject) => {
        getData(params).then(response => {
          const data = response.data
          commit('get_ajax_data', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTableData({ commit }, params) {
      return new Promise((resolve, reject) => {
        console.log('geiwjhgeihi')
        getTableList(params).then(response => {
          const data = response.data
          commit('set_table_data', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default vuexTest
