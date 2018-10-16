const tableVisible = {
  state: {
    scores: [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }
    ]
  },
  getters: {
    scoreRadar({ scores }) {
      return {
        title: {
          text: "能力雷达图"
        },
        tooltip: {},
        radar: {
          indicator: scores.map(({ name, max }) => {
            return { name, max };
          })
        },
        series: [
          {
            name: "能力值",
            type: "radar",
            data: [{ value: scores.map(({ value }) => value) }]
          }
        ]
      };
    }
  },
  mutations: { //管理员 用来更改状态，
    increment({ scores }, { amount = 1, index = 0 }) {
      let metric = scores[index];
      metric.value = Math.max(Math.min(metric.value + amount, metric.max), 0);
    }
  },
  actions: {
    asyncIncrement({ commit }, { amount = 1, index, delay }) {
      setTimeout(() => {
        commit("increment", { amount, index });
      }, delay);
    }
  }
};
export default tableVisible;
