<template>
	<div class="cart">
		
		<h3 class="cart_title">购物车</h3>
		
		<ul class="shopTitle">
			<li class="info">商品信息</li>
			<li>商品金额</li>
			<li>商品数量</li>
			<li>总金额</li>
			<li>编辑</li>
		</ul>
		
		<div class="shopDetai">
			<div class="single-shop am-g" v-for="(item,index) in productList" :key="index">
				<div class="single-img am-g">
					<p class="check-false" :class="{'check-true': item.checked}" @click="item.checked = !item.checked"></p>
					<img :src="item.productImage" alt="" />
					<div class="single-title">
						<h4>{{item.productName}}</h4>
						<p v-for="part in item.parts">赠送：{{part.partsName}}</p>
					</div>
				</div>
				<div class="single-Sun">{{item.productPrice | formatMoney}}</div>
				<div class="single-num">
					<div class="single-box am-g">
						<span @click="changeMoney(item,-1)">-</span>
						<input type="text" value="8" disabled=""  v-model="item.productQuentity" />
						<span @click="changeMoney(item,1)">+</span>
					</div>
					<p><span v-if="item.stock-item.productQuentity > 0">产品剩下：{{item.stock-item.productQuentity}}</span><span v-else>无货</span></p>
				</div>
				<div class="single-Sun single-price">{{item.productPrice*item.productQuentity | money("元")}}</div>
				<div class="single-Sun" @click="delect(item)">删除</div>
			</div>
		
		</div>
			<div class="footer-price am-g">
				<p class="sele" :class="{'sele-true': checkAll}" @click="checkAllFlag(checkAll)"></p><span>全选</span> 
				<div style="float: right;">产品数量： {{getTotal.totalNum}}，产品总价：{{getTotal.totalPrice}}
					<router-link to="/address" class="goOrder">立即结算</router-link>
				</div>
			</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			productList: [],
			currProduct: '',
		}
	},
	filters: {
		formatMoney: function(value){//, type
			return "￥"+value.toFixed(2)//+type
		},
		money: function(value,type){
			return "￥"+value.toFixed(2)+type
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.cartView();
		});
	},
	methods: {
		cartView(){
			const _this = this;
			this.$ajax.get('static/json/cartData.json').then(res=>{
				this.productList = res.data.result.list;
				this.productList.map(item=>{
					this.$set(item, 'checked', false);
				})
			}).catch(error=>{})
		},
		changeMoney(product,way){
			if(way>0){
				if(product.productQuentity<=product.stock-1){
					product.productQuentity++
				}
			}else{
				if(product.productQuentity>1){
					product.productQuentity--
				}
			}
		},
		checkAllFlag(item){
			for(var i=0; i<this.productList.length;i++){
				this.productList[i].checked = !item
			}
		},
		delect(item){
			this.currProduct = item;
			var indexOne = this.productList.indexOf(this.currProduct);
			this.productList.splice(indexOne,1)
		}
	},
	computed: {
		checkAll(){
			return this.productList.every(function(val){
				console.log(val)
				return val.checked;
			});
		},
		getTotal(){
			var total = 0,numLength=0;
			var _proList = this.productList.filter(val=>{return val.checked});
			for(var i=0; i<_proList.length;i++){
				total += _proList[i].productPrice*_proList[i].productQuentity;
				numLength += _proList[i].productQuentity;
			}
			return {totalPrice:total,totalNum: numLength}
		}
	}
}
</script>

<style>
</style>