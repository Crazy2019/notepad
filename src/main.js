// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/index.css'//引入样式
import axios from 'axios'//配置axios
import store from './store/index' //引入store

require('../mock')

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
/**/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
	console.log(store.state.loginSta.isLogin)
	if(to.meta.auth){
		if(store.state.loginSta.isLogin == true){// 通过vuex state获取当前的isLogin是否存在
			next();
		}else{
			alert("请先登录之后才能进入");
			next({
				path: '/login',
				query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}else{
		next();
	}
});


//超时时间
axios.defaults.timeout = 5000; 

//定义一个请求拦截器
axios.interceptors.request.use(function(config){
//	config.headers['X-Requested-With'] = 'XMLHttpRequest';
	console.log(config)
	store.state.loginSta.isShow = true; 	//在请求时发出一些操作
	return config
},error => {
    // Do something with request error
    return Promise.reject(error);
});

//定义一个响应拦截器
axios.interceptors.response.use(function(response){
	store.state.loginSta.isShow = false; 	//在这里对返回的数据进行处理
	console.log(response.data)
	console.log(response);
	return response
},error => {
    return Promise.reject(error);
});
