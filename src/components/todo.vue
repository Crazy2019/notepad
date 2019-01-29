<template>
	<div>
		<div>
			<h3 class="title" :style="{background: getBgColor}">未完成</h3>
			<ul>
				<li v-for="item in getToDo" :key="item.id">
					<input type="checkbox" :key="item.id" @click="godone(item.id)" />
					{{item.content}} 
					<span class="cancel" @click="goCancel(item.id)">取消</span></li>
			</ul>
		</div>
		<div>
			<h3 class="title" :style="{background: getBgColor}">已完成</h3>
			<ul>
				<li v-for="item in getDone" :key="item.id">
					<input type="checkbox" :key="item.id" @click="goToDo(item.id)" />{{item.content}}</li>
			</ul>
		</div>
		<div>
			<h3 class="title" :style="{background: getBgColor}">已取消</h3>
			<ul>
				<li v-for="item in getCancel">{{item.content}} <span class="cancel" @click="goToDo(item.id)">还原</span></li>
			</ul>
		</div>
		
		
		<button @click="clear">清楚本地记录</button>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default{
	computed: {
		getToDo(){
			return this.$store.getters.getToDo;
		},
		getDone(){
			return this.$store.getters.getDone;
		},
		getCancel(){
			return this.$store.getters.getCancel;
		},
		...mapGetters(['getBgColor'])
	},
	methods: {
		goCancel(id){
			this.$store.dispatch("eventcancel", id);
		},
		goToDo(id){
			this.$store.commit("eventtodo", id);
		},
		godone(id){
			this.$store.commit("eventdone", id)
		},
		clear(){
			this.$store.commit("allclear")
		}
	}
}
</script>
<style type="text/css">
	input[type="checkbox"]{
	    width: 20px;
		height: 20px;
		vertical-align: middle;
	}
	.title{
		margin: 10px 0px;
		font-size: 16px;
		font-weight: 300;
		background: #00b0f0;
		color: #FFFFFF;
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.cancel{
		display: inline-block;
		border: 1px solid #928E8E;
		padding: 4px 6px;
	}
	ul li{
		margin-bottom: 5px;
	}
</style>
