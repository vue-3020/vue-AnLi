import Cookies from 'js-cookie'

const app = {
  state: {
    appState: '测试',
    language: Cookies.get('language') || 'en'
  },
  getters: {
    appState: state => state.appState,
    language: state => state.language
  },
  mutations: {
    SET_APPSTATE: (state, params) => {
      state.appState = params.appState
      Cookies.set('language', params.language)
    }
  },
  actions: {
    setAppState({ commit }, params) {
      commit('SET_APPSTATE', params)
    }
  }
}

export default app
