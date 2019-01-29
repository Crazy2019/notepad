import * as func from '../function.js';
export default {
	//加入购物车
	ADDCART(states, obj){
//		states.count++;
		states.shopCart.unshift(obj);/*.unshift*/
		func.shop.set(states)
	},
	//增加
	ADDNUM(states, {price,index}){
		price.productQuentity++;
		states.shopCart[index].productQuentity = price.productQuentity++;
		func.shop.set(states);
	},
	//减少
	REDNUM(states,{price,index}){
		price.productQuentity--;
		states.shopCart[index].productQuentity = price.productQuentity--;
		func.shop.set(states);
	},
	
	//单个删除数据
	DELETEONE(states,{index,id}){
//		states.count--;
		states.shopCart.splice(index,1);
		func.shop.set(states)
	},
	//勾选之后再删除
	ALLDELETE(states, obj){
		let Length = obj.length;
		states.shopCart.splice(obj,Length);
		states.count = states.shopCart.length;
		func.shop.set(states)
	},
	
	//购买
	ORDERLIST(states, obj){
		states.refresh = obj;
		func.shop.set(states);
	}
}