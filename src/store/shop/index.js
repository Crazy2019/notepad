import * as func from '../function.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const state = func.shop.get() || {
	shopCart: [],
//	count: 0,
	refresh: [],
}

export default{
	state,
	getters,
	mutations,
	actions
}
