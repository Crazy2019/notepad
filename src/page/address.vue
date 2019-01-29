<template>
	<div class="address">
		<h3 class="cart_title">配送地址</h3>
		<ul class="address-Ul am-g">
			<li v-for="(address, index) in filterAddress" :key="index" :class="{'check': index==currentIndex}" @click="currentIndex = index">
				<p class="address-Name">{{address.userName}}</p>
				<h3 class="address-title">{{address.streetName}}</h3>
				<p class="tel">{{address.tel}}</p>
				<p class="moren" v-if="!address.isDefault" @click="setDefault(address.addressId)">设为默认</p>
				<p class="default"  v-if="address.isDefault">默认地址</p>
				
			</li>
		</ul>
		<div style="text-align: center;width: 100%;" @click="limitNum = addressList.length">more</div>
	</div>
</template>

<script>
export default{
	data() {
		return {
			addressList: [],
			limitNum: 3,
			currentIndex: 0
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getAddressList();
		})
	},
	computed: {
		filterAddress: function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods: {
		getAddressList(){
			this.$ajax.get('static/json/address.json').then(res=>{
				this.addressList = res.data.result;
				console.log(res.data.result)
			}).catch(error=>{})
		},
		setDefault(addressId){
			this.addressList.forEach(function(address, index){
				if(address.addressId == addressId){
					address.isDefault = true
				}else{
					address.isDefault = false
				}
			})
		}
//		loadMore(){
//			this.limitNum = this.addressList.length;
//		}
	}
}
</script>
