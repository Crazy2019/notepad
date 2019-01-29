
import *as func from '../function.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const state = func.login_state.get() || {
	user: '',
	isLogin: false,
	isShow: false
}
export default{
	state,
	getters,
	mutations,
	actions,
}
