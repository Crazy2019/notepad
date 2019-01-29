/*本地存储数据 localStorage*/

const localEvent = function(item){
	this.get = function(){
		return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';  //拿到JSON对象
	}
	
	this.set = function(obj){
		return localStorage.setItem(item, JSON.stringify(obj));  //存储字符串
	}
	
	this.clear = function(){
		return localStorage.removeItem(item);
	}
}

export const local = new localEvent("qshNotepad");

export const theme_local = new localEvent("qshTheme");

export const shop = new localEvent("qshShop"); //加入购物车

export const login_state = new localEvent("qsh_login");  //登入

export const getDate = () => {//获取当天日期
	const data = new Date(),
	month = data.getMonth()+1;
	return data.getFullYear() + '-' + month + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
}

