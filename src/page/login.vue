<template>
	<div>
		
		<div class="login-box">
			<h4>登录页面</h4>
			<div class="content-box">
				<div>
					<label for="">账号：</label>
					<input type="text" v-model="user_text" />
				</div>
				<div>
					<label for="">密码：</label>
					<input type="password" v-model="user_password" />
				</div>
				
				<button class="btn" @click="loginClick" >登录</button>
			</div>
		</div>
		
	</div>
</template>

<script>
export default{
	data(){
		return {
			user_text: '',
			user_password: ''
		}
	},
	methods: {
		loginClick(){
			if(this.user_text == "" || this.user_text == undefined || this.user_text == undefined){
				alert("用户名不能为空!")
				return false
			}else if(this.user_password == "" || this.user_password == undefined || this.user_password == undefined){
				alert("密码不能为空!")
				return false
			}else if(this.user_text === "123" && this.user_password === "123" || this.user_text === "admin" && this.user_password === "admin"){
				this.$store.dispatch("changeLogin", this.user_text);
				alert("登陆成功!");
				this.$router.push({path: this.$route.query.redirect});
			}else{
				alert("登陆失败")
			}
		}
	}
	
}
</script>

<style>
.login-box{
	width: 800px;
	margin: 30px auto;
	height: auto;
	border: 1px solid #928E8E;
	box-sizing: border-box;
	padding: 10px 10px 20px;
}
.login-box h4{
	font-weight: 600;
	text-align: center;
	line-height: 40px;
}
.content-box{
	
}
.content-box>div{
	margin-bottom: 20px;
	height: 34px;
}
.content-box>div label{
	line-height: 34px;
	width: 50px;
    display: inline-block;
}
.content-box>div input{
	height: 34px;
	width: 720px;
	border: 1px solid #928E8E;
	box-sizing: border-box;
	padding: 4px 8px;
}
.btn{
	width: 100%;
	height: 36px;
	background: #00b0f0;
	border: 1px solid #00b0f0;
	color: #fff;
	cursor: pointer;
}
</style>