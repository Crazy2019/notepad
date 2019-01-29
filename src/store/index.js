import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import eventOne from './event';
import theme from './theme';
import shop from './shop';
import loginSta from './login';

export default new Vuex.Store({
    modules: {
        eventOne,
        theme,
        shop,
        loginSta
    }
});