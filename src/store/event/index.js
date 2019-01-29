import * as func from '../function';

import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const state = func.local.get() || {
	event: [],
	count: 0,
}
export default{
	state,
	getters,
	mutations,
	actions
}



