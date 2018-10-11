import { getTableList } from "@/api/vueElement/tableApi";
const vuesAccount = {
  state: {
    AffairsData: [],
    currentType: 1 //默认显示的类型 0-草稿箱 1-已发布 2-待发布
  },
  getters: {
    getTableList: state => {
      return state.AffairsData;
    }
  },
  mutations: {},
  actions: {
    getTableListClick({ commit }, params) {
      return new Promise((resolve, reject) => {
        getTableList(params)
          .then(response => {})
          .catch(error => {});
      });
    }
  }
};
export default vuesAccount;
