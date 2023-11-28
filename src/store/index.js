import { createStore } from 'vuex'

export default createStore({
    state:{
        isCollapse:true
    },
    mutations:{
        updateCollapse(state, payload){
            // payload是调用方法时传过来的参数
            state.isCollapse=!state.isCollapse
        }
    }
})