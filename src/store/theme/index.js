import * as func from '../function.js'
import mutations from './mutations.js';
import getters from './getters.js';

const state = func.theme_local.get() || {
	theme: '#00b0f0'
}

export default{
	state,
	getters,
	mutations
}
