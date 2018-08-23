import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state ={//状态
    count:1//共用的数据
}

const mutations ={  //改变对象的方法 ,state 就是上面const里的
    add(state){//增加的办法
        state.count ++
    },
    reduce(state){   //减少的办法
        state.count --
    }
}

export default new Vuex.Store({  //暴漏出接口给其他的页面应用
    state, //存值
    mutations //方法
})