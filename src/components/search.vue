<template>
	
	<div class="search">
		
		<div class="searth-top">
			<div class="hide-search" :class="{'edit-input-show': is_edit}">
				<input type="text" v-model="init.content" ref="content" @keyup.enter="editData" />
				<button @click="editData" :style="{background: getBgColor}">确定</button>
			</div>
			<div class="div-select" :class="{'active': selectKed}" >
				<div class="div-value" @click="selectKed = !selectKed">{{getTypeName}}</div>
				<div class="div-select-body">
					<div class="div-option" @click="doSelect(0)">筛选类型</div>
					<div class="div-option" @click="doSelect(1)">未完成</div>
					<div class="div-option" @click="doSelect(2)">已完成 </div>
					<div class="div-option" @click="doSelect(3)">已取消</div>
				</div>
			</div>
			
			<input type="text" class="search-search" placeholder="筛选关键词" v-model="screen_title" />
		</div>
		
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>所有事项</th>
					<th>类型</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(value, index) in notapad">
					<td>{{index+1}}</td>
					<td>{{value.content}}</td>
					<td>{{getType(value.type)}}</td>
					<td>
						<button @click="showInput(index)">编辑</button>
						<button @click="deleteNum(index,value.id)">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
		
		
		
	</div>
	
</template>

<script>
import { mapGetters } from "vuex"
export default{
	data(){
		return {
			selectKed: false,
			screen_type: 0,
			screen_title: '',
			is_edit: false,
			init: {
				content: '',
				id: 0,
				index: 0
			},
		}
	},
	computed: {
		...mapGetters(['getBgColor']),
		notapad(){
			var self = this;
			return this.$store.getters.getEventList.filter((sum) => {
				if(this.screen_type ===  0 && this.screen_title === ''){
					return sum
				}else if(this.screen_type != 0 && this.screen_title === ''){
					if(this.screen_type === sum.type){
						return sum
					}
				}else if(this.screen_type != 0 && this.screen_title != ''){
					if(sum.type === this.screen_type && sum.content.indexOf(this.screen_title) != -1){
						return sum
					}
				}else if(this.screen_type ===  0 && this.screen_title != ''){
					if(sum.content.indexOf(this.screen_title) != -1){
						return sum
					}
				}else{
					return sum
				}
			});
		},
		getTypeName(){
			return this.getType(this.screen_type) || "筛选类型"
		}
	},
	methods: {
		doSelect(type){
			this.screen_type = type;
			this.selectKed = false;
		},
		getType(type){
			let str = '';
			switch(type){
				case 1: 
					str = "未完成";
					break
				case 2: 
					str = "已完成";
					break
				case 3: 
					str = "已取消";
					break
			}
			return str
		},
		//修改数据
		showInput(index){
			this.is_edit = true;
			this.init = {
				index: index,
				content: this.notapad[index].content,
				id: this.notapad[index].id
			};
			this.$refs.content.focus();
		},
		editData(){
			this.init.content = this.init.content.trim();
			if(this.init.content){
				this.$store.commit('editevent',this.init);
				this.is_edit = false;
				alert("保存成功")
			}
		},
		deleteNum(index,id){
//			this.$emit('deldialog',index,id);
			this.init = {
				index: index,
				id: id
			};
			this.$store.commit("delevent", this.init);
			alert("删除成功")
		}
		
	},
	
}
</script>

<style>
	.hide-search{
		width: 100%;
		height: 35px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 221;
		background: #fff;
		transform: translateY(-600px);
		transition: transform .4s;
	}
	.edit-input-show{
		transform: translateY(0px);
	}
	.hide-search input{
		width: calc(100% - 85px) !important;
		height: 35px !important;
	}
	.hide-search button{
		width: 80px;
		height: 35px;
		border: none;
		/*background: #00b0f0;*/
		color: #fff;
		border-radius: 3px;
	}
	.search{
		margin-top: 30px;
		width: 100%;
		height: auto;
		/*overflow: hidden;*/
	}
	.searth-top{
		width: 100%;
		height: 35px;
		box-sizing: border-box;
		margin-bottom: 10px;
		position: relative;
	}
	.div-select{
		position: absolute;
	    left: 0;
	    top: 0;
	    width: 85px;
	    height: 35px;
	    padding: 0 10px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    border: 1px solid #eee;
	    font-size: 12px;
	    color: #999;
	    cursor: pointer;
	    z-index: 22;
	}
	.div-select:after{
		position: absolute;
	    right: 6px;
	    top: 12px;
	    width: 6px;
	    height: 6px;
	    content: '';
	    border-right: 1px solid #999;
	    border-bottom: 1px solid #999;
	    -webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	}
	.div-value{
		line-height: 35px;
	}
	.div-select-body{
		position: absolute;
	    left: 0;
	    top: 38px;
	    width: 85px;
	    height: 0;
	    padding-left: 10px;
	    line-height: 30px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    overflow: hidden;
	    z-index: 10;
	    -webkit-box-shadow: none;
	    box-shadow: none;
	    border: none;
	    border-radius: 3px;
	    background: #fff;
	    -webkit-transition: all .3s;
	    transition: all .3s;
	}
	.active .div-select-body{
		height: 122px;
		border: 1px solid #eee;
	    -webkit-box-shadow: 0 0 1px #ddd;
	    box-shadow: 0 0 1px #ddd;
	}
	.search-search{
		width: calc(100% - 95px) !important;
		position: absolute;
		top: 0;
		right: 0px;
		height: 35px !important;
		padding: 5px 10px !important;
		border-radius: 0 !important;
		border: 1px solid #eee !important;
	}
	.search-search:focus{
		border: 1px solid green !important;
	}
	table{
		width: 100%;
		border-left: 1px solid #eee;
    	border-top: 1px solid #eee;
    	padding: 0;
    	border-spacing: 0px;
	}
	table th,table td{
		height: 40px;
		box-sizing: border-box;
		padding: 5px 10px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    text-overflow: ellipsis;
	    vertical-align: middle;
	    border-right: 1px solid #eee;
	    border-bottom: 1px solid #eee;
	    text-align: center;
	}
</style>