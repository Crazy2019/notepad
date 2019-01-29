<template>
	<div style="margin: 30px">
		<button @click="getData">请求数据</button>
		<span v-if="this.$store.getters.isShow">
			<img src="../../static/images/jiaduobao.jpg" width="150" alt="" />
		</span>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	methods: {
		getData(){
			this.$ajax.get("/static/json/cartData.json").then(res=>{
				
				
				
			}).catch(error=>{})
		}
	}
}
</script>

<style>
</style>