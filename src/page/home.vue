<template>
	<div class="home">
		<!--<p style="margin-bottom: 10px;">
			<router-link to="/login" v-if="this.$store.getters.showWel">这里显示的是是否登入 </router-link>
			<span v-else>欢迎 {{status}} <small @click="exitLOGIN" style="cursor: pointer;">退出</small></span>
		</p>
		<router-link to="/my">我的</router-link>
		<router-link to="/classification">分类</router-link><br />
		<p style="margin: 10px 0;"><router-link to="/shop">前往首页购物</router-link></p>-->
		
		
		
		<input type="text" v-model="searchValue" placeholder="请输入要添加的内容..." @keyup.enter="submit" />
		<button class="add-btn" @click="submit" :style="{background: getBgColor}">提交</button>
		
		<todo></todo>
		
		<search></search>
		
		<div style="margin-top: 40px" class="theme-bg">
		 	<div class="theme-list" @click="switchTheme('blue')">
                <span style="background: blue"></span>#00b0f0
            </div>
            <div class="theme-list" @click="switchTheme('green')">
                <span style="background: green"></span>#00d1b2
            </div>
            <div class="theme-list" @click="switchTheme('orange')">
                <span style="background: orange"></span>#f4b976
            </div>
            <div class="theme-list" @click="switchTheme('pink')">
                <span style="background: pink"></span>#f39894
            </div>
            <div class="theme-list" @click="switchTheme('cyan')">
                <span style="background: cyan"></span>#26b6be
            </div>
            <div style="clear: both;"></div>
		</div>
		
	</div>
	
</template>

<script>
import todo from "../components/todo"
import search from "../components/search";
import { mapGetters } from "vuex";
export default{
	components: {todo,search},
	data(){
		return {
			searchValue: '',
			getEventList: [],
			del_init: {
				index: 0,
				id: 0
			},
		}
	},
	methods: {
		submit(){
			let self = this,params = {id: 0,type: 1,content: '',time: ''};
			self.searchValue = self.searchValue.trim();
			if(self.searchValue){
				params.content = self.searchValue;
				self.$store.dispatch("addevent",params);
				self.searchValue = '';
				alert("添加成功")
			}
		},
		switchTheme(theme){
			this.$store.commit("SWITCHTheme", theme);
		},
		exitLOGIN(){
			this.$store.commit("EXITLOGIN");
		}
	},
	computed: {
		...mapGetters(['getBgColor','status'])
//		getBGCOLOR(){
//			return this.$store.states.theme
//		}
	}
}
</script>
<style type="text/css">
	ul,li{list-style: none;margin: 0;padding: 0;}
	.home{
		width: 800px;
		height: auto;
		margin: 20px auto;
		/*border: 1px solid #928E8E;*/
		padding: 20px;
	}
	.home input[type="text"]{
		width: 400px;
		height: 40px;
		box-sizing: border-box;
		padding: 7px 10px;
	    line-height: 26px;
	    border: 1px solid #c0ccda;
		outline: none;
		border-radius: 4px;
	}
	.add-btn{
		width: 80px;
	    height: 40px;
	    line-height: 26px;
	    color: #fff;
	    border: none;
    	background: #00b0f0;
    	border-radius: 4px;
    	outline: none;
	}
	.theme-bg .theme-list{
		position: relative;
		width: 70px;
	    height: 36px;
	    line-height: 36px;
	    padding-left: 36px;
	    border: 1px solid #aaa;
	    border-radius: 3px;
	    cursor: pointer;
        background: #fff;
        float: left;
        margin-right: 10px;
	}
	.theme-bg .theme-list span{
		position: absolute;
	    left: 8px;
	    top: 8px;
	    width: 20px;
	    height: 20px;
	}
</style>
