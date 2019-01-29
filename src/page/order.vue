<template>
	<div style="margin: 30px;">
		<h4 style="margin: 40px 0 20px;">订单</h4>
		<div class="cartbox" v-for="item in read">
			<img :src="item.productImage" alt="" style="width: 200px;" />
			<h4>{{item.productName}}</h4>
			<p>商品数量：{{item.productQuentity}}件，<span>单价：{{item.productPrice | filtePrice}}</span></p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
//	beforeRouteEnter(to, from, next){
//		next(vm => {
////			let params = vm.$route.params.dataObj;
//			let params = vm.$route.params
//			
//		})
//	},
//	beforeRouteLeave(to, from, next){
//		next();
//	},
	computed: {
		...mapGetters(['read']),
	},
	filters:{
		filtePrice(value){
			return "$"+value.toFixed(2)
		}
	}
	
}
</script>

<style>
	
</style>