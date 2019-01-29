import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Index from '@/page/index'
import Address from '@/page/address'
import shop from '@/page/shop'
import Order from '@/page/order'
import Login from '@/page/login'
import My from '@/page/my'
import Classification from '@/page/classification'

//import store from '@/store/index.js'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta: {
      	/*标明需要登录*/
      	auth: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
    	path: '/address',
    	name: 'Address',
    	component: Address
    },
    {
//  	path: '/order/:dataObj',
			path: '/order',
			name: 'Order',
    	component:  Order,
    },
    {
			path: '/login',  //登录
			name: 'Login',
    	component:  Login,
    },
    {
			path: '/my',  //我的
			name: 'My',
    	component:  My,
    	meta: {
      	/*标明需要登录*/
      	auth: true
      }
    },
    {
			path: '/classification',  //分类
			name: 'Classification',
    	component:  Classification,
    	meta: {
    		/*标明需要登录*/
    		auth: true
    	}
    }
  ]
});
