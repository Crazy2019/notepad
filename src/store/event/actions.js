export default {
	addevent({commit}, params){
		commit("ADDEVENT",{items: params})
	},
	eventcancel: ({commit}, params) => commit('GOCANCEL', {id: params}),
}

