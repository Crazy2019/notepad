export default{
	status(states){
		return states.user
	},
	showWel(states){
		if(states.isLogin == false){
			return true
		}else{
			return false
		}
	},
	isShow(states){
		return states.isShow
	}
	
}
