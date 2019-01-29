import *as func from '../function.js';

export default{
//	SET_USER(states, data){
//		states.user = data;
//		func.login_state.set(states);
//	},
//	SET_TOKEN(states,status){
//		states.token = status;
//		func.login_state.set('token', status);
//	},
	CHANGELOGIN(states, status){
		states.user = status;
		states.isLogin = true;
		func.login_state.set(states);
	},
	EXITLOGIN(states){
		states.user = "",
		states.isLogin = false;
		func.login_state.set(states);
	}
}
