import * as type from './mutations-type.js';
import * as func from '../function.js';
export default {
	[type.ADDEVENT](states, obj){  
		states.count++;
		obj.items.id = states.count;
		states.event.unshift(obj.items);
		func.local.set(states);
//		for(let i=0; i< states.event.length; i++){
//			if(obj.items.content === states.event[i].content){
//				alert("内容已存在");
//				return 
//			}else{
//				
//			}
//		}
	},
	//移至取消
	[type.GOCANCEL](states, obj){
		for(let i=0; i<states.event.length; i++){
			if(states.event[i].id === obj.id){
				states.event[i].type = 3;
                var item = states.event[i];
                states.event.splice(i, 1);
				break;
			}
		}
		states.event.unshift(item);
        func.local.set(states);
	},
	//移至未完成
	eventtodo(states, id){
		for(let i=0; i<states.event.length; i++){
			if(states.event[i].id === id){
				states.event[i].type = 1;
				var item = states.event[i];
				states.event.splice(i,1);
				console.log(item)
				break
			}
		}
		states.event.unshift(item);
        func.local.set(states);
	},
	// 移至已完成
	eventdone(states, id){
		for(let i=0; i<states.event.length; i++){
			if(states.event[i].id === id){
				states.event[i].type = 2;
				var item = states.event[i];
				states.event.splice(i,1);
				break
			}
		}
		states.event.unshift(item);
		func.local.set(states);
	},
	
	//清楚本地记录
	allclear(states){
		states.event = [];
		func.local.clear();
	},
	
	
	//编辑成功
	editevent(states,init){
		if(states.event[init.index].id === init.id){
			states.event[init.index].content = init.content;
		}else{
			states.event.filter((d)=>{
				console.log(d.id+"----"+init.id)
				if(d.id === init.id){
					d.content = init.content
				}
			})
		}
		func.local.set(states)
	},
	
	//删除数据
	delevent(states, init){
		if(states.event[init.index].id == init.id){
			states.event.splice(init.index, 1)
		}else{
			states.event.filter((d,i) => {
				if(d.id === init.id){
					states.event.splice(i, 1);
				}
			});
		}
		func.local.set(states);
	}
}
