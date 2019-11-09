import Vue from "vue";
import Vuex from "vuex";
import Sys_init from "./sys_init";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Sys_init }
});
