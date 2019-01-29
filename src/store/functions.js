
//本地存储
const localStorageOne = function(item){
	this.get = function(){
		return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
	}
	
	this.set = function(obj){
		return localStorage.setItem(item, JSON.stringify(obj));
	}
	
	this.clear = function(){
		return localStorage.removeItem(item);
	}
	
}

export const age = new localStorageOne("shop");
