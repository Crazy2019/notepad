export default{
	allShopCart(states){
		return states.shopCart
	},
	showCART(states){
		let statesLength = states.shopCart.length;
		if(statesLength>0){
			return true
		}else{
			return false
		}
	},
	read(states){
		console.log(states.refresh)
		return states.refresh
	}
}
