<template>
	<div class="cartshop">
		<h4 style="margin: 0px 0 20px;">商品展示</h4>
		
		<div class="shopbox" v-for="(item, index) in shopList">
			<img :src="item.productImage" alt="" />
			<h4>{{item.productName}}</h4>
			<p><span>{{item.productPrice | priceFilter}}</span><button @click="addCart(index)">加入购物车</button></p><!--item.productId-->
		</div>
		<div style="clear: both;"></div>
		<div v-if="showCART">
			<h4 style="margin: 40px 0 20px;">购物车</h4>
			<div class="cartbox" v-for="(price, index) in allShopCart">
				<div class="check-bg" :class="{'checked-bg': price.checked}" @click="price.checked = !price.checked"></div>
				<img :src="price.productImage" alt="" />
				<h4>{{price.productName}}</h4>
				<p><span>{{price.productPrice*price.productQuentity | priceFilter}}</span></p>
				<div class="button-span">
					<span @click="addNum(price,index,-1)">-</span>
					<input type="text" v-model="price.productQuentity" />
					<span @click="addNum(price,index,1)">+</span>
				</div>
				<p style="float: left;">库存：{{price.stock-price.productQuentity}}</p>
				 &nbsp;
				<button @click="deleteOne(index,price.productId)">删除</button>
				<div style="clear: both;"></div>
			</div>
			
			<div class="footer">
				<p class="all" :class="{'all-true': chekALLONE}" @click="allCheck(chekALLONE)"><span>全选</span></p>
				&nbsp;&nbsp;
				<button @click="checkDelete">勾选之后再删除</button>
				
				<p class="num">
					<span>选择了：{{getTotal.NUMBER}}件   {{getTotal.TOTAL | priceFilter}}</span>
					<button @click="goOrder">立即购买</button>
				</p>
				<div style="clear: both;"></div>
			</div>
		</div>
		<div v-else style="margin: 40px 0 20px;"> 购物车为空，请将商品加入购物车吧.....</div>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
	data(){
		return {
			shopList: [],
			priceList: {
				productId: '',
				productImage: '',
				productName: '',
				productPrice: '',
				productQuentity: '',
				stock: '',
			},
		}
	},
	mounted: function(){
		this.$nextTick(()=>{
			this.loadShopList();
		})
	},
	filters: {
		priceFilter(value){
			return "$"+value.toFixed(2)
		}
	},
	methods: {
		loadShopList(){
			this.$ajax.get('/static/json/cartData.json').then(res => {
				this.shopList = res.data.result.list;
			}).catch(error => {});
		},
		addCart(index){
			this.priceList = {
				productId: this.shopList[index].productId,
				productImage: this.shopList[index].productImage,
				productName: this.shopList[index].productName,
				productPrice: this.shopList[index].productPrice,
				productQuentity: this.shopList[index].productQuentity,
				stock: this.shopList[index].stock,
				checked: false
			}
			this.$store.commit("ADDCART", this.priceList);
		},
		addNum(price,index,value){
			if(value>0){
				if(price.stock-price.productQuentity>0){
					this.$store.commit("ADDNUM",{price,index})
				}
			}else{
				if(price.productQuentity>1){
					this.$store.commit("REDNUM",{price,index})
				}
			}
		},
		allCheck(item){
			for(let i=0; i<this.allShopCart.length; i++){
				this.allShopCart[i].checked = !item;
			}
		},
		//删除数据
		deleteOne(index,id){
			this.$store.commit("DELETEONE",{index,id})
		},
		//勾选之后再删除
		checkDelete(){
			let _proTotal1 = this.allShopCart.filter(val => {return val.checked});
			if(_proTotal1.length>0){
				this.$store.commit("ALLDELETE", _proTotal1);
			}else{
				alert("请勾选在删除数据")
			}
		},
		//立即购买
		goOrder(){
			let orderList = this.allShopCart.filter(val => {return val.checked});
			let Stringify = JSON.stringify(orderList)
			if(orderList.length>0){
//				this.$router.push({
//					name: 'Order', 
//					params: {
//						dataObj: Stringify
//					}
//				});
				this.$router.push({
					name: 'Order',
					params: this.$store.commit('ORDERLIST', orderList)
				});
			}else{
				alert("请勾选在商品在购买")
			}
		}
	},
	computed: {
		...mapGetters(['allShopCart','showCART']),
		chekALLONE(){
			let self = this;
			return this.allShopCart.every(function(val){
				return val.checked
			});
		},
		getTotal(){
			let total=0,nlength=0,_proTotal = this.allShopCart.filter(val => {return val.checked});
			for(let i=0; i<_proTotal.length; i++){
				total += _proTotal[i].productPrice*_proTotal[i].productQuentity;
				nlength += _proTotal[i].productQuentity;
			}
			return {NUMBER: nlength,TOTAL: total}
		},
	}
	
}
</script>

<style>
.cartshop{
	margin: 30px;
}
.shopbox{
	float: left;
	width: 200px;
	margin-right: 20px;
	background: #E3E3E3;
	padding-bottom: 8px;
	box-sizing: border-box;
}
.shopbox>img{
	width: 200px;
}
.shopbox h4{
	padding-left: 5px;
	margin-bottom: 10px;
}
.shopbox p{
	padding-left: 5px;
}
.cartbox{
	margin-bottom: 10px;
}
.cartbox>img{
	width: 100px;
	float: left;
	margin-right: 10px;
}
.check-bg{
	float: left;
	width: 20px;
	height: 20px;
	margin-right: 20px;
	background: url(../assets/images/shopping_cart.png) no-repeat center;
	background-size: 100% 100%;
	cursor: pointer;
}
.checked-bg{
	background: url(../assets/images/xuan.png) no-repeat center;
	background-size: 100% 100%;
}
.button-span{
	margin-top: 5px;
}
.button-span span{
	float: left;
	width: 22px;
	height: 22px;
	text-align: center;
	border: 1px solid #928E8E;
	box-sizing: border-box;
	line-height: 20px;
	cursor: pointer;
}
.button-span input{
	float: left;
	height: 22px;
	box-sizing: border-box;
}
.footer{
	width: 100%;
	height: 40px;
	margin-top: 10px;
	background: rgba(0,0,0,.5);
	line-height: 40px;
	box-sizing: border-box;
	padding-left: 4px;
}
.footer p.all span{
	color: #fff;
}
.footer p.all{
	width: auto;
	padding-left: 25px;
	background: url(../assets/images/shopping_cart.png) no-repeat left;
	background-size: 20px 20px;
	cursor: pointer;
	float: left;
}
.footer p.all-true{
	background: url(../assets/images/xuan.png) no-repeat left;
	background-size: 20px 20px;
}
.footer p.num{
	float: right;
}
</style>