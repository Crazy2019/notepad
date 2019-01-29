<template>
	<div>
		<button @click="leftmenu" id="contan">点击显示侧边栏</button>
		<div class="left_menu" :class="{'left_menuShow': leftShow}"></div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			leftShow: false
		}
	},
	methods: {
		leftmenu(){
			this.leftShow = !this.leftShow;
		},
//		show12(){
//			var sp = document.getElementById("contan");
//			if(sp){
//				if(!sp.contains(event.target)){
//					this.leftShow = !this.leftShow;
//				}
//			}
//		}
	}
}
</script>

<style>
.left_menu{
	position: fixed;
	top: 23px;
	left: 0;
	z-index: 100;
	width: 250px;
	height: 100%;
	background: rgba(0,0,0,.4);
	-webkit-transform: translateX(-250px);
	-moz-transform: translateX(-250px);
	-ms-transform: translateX(-250px);
	-o-transform: translateX(-250px);
	transform: translateX(-250px);
	-webkit-transition: transform .5s;
	-moz-transition: transform .5s;
	-ms-transition: transform .5s;
	-o-transition: transform .5s;
	transition: transform .5s;
}
.left_menuShow{
	-webkit-transform: translateX(0);
	-moz-transform: translateX(0);
	-ms-transform: translateX(0);
	-o-transform: translateX(0);
	transform: translateX(0);
}
</style>