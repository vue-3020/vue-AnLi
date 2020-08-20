

export default {
  state: {
    count: 0,
    string: ""
  },
  mutations: {
    storeIncrement: state => state.count++,
    storeDecrement: state => state.count--,
    myString: (state, value) => value ? (state.string = value) : (state.string = "")

  },
  actions: {

  },
}
