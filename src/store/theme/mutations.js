import * as func from '../function.js';
export default {
	SWITCHTheme(states,theme){
		states.theme = theme;
		func.theme_local.set(states);
	}
}
