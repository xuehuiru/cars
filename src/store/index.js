import Vue from 'vue'
import Vuex from 'vuex'

import App from './module/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        index:App
    }
})