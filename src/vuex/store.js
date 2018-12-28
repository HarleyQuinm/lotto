import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    actions,
    state:{
        usercode:'',
        islogin:false,
        userinfo:'',
        actId:''
    },
    mutations:{
        UserLogin(state,data){
            this.state.islogin=data.login;
            this.state.usercode=data.usercode;
            this.state.userinfo=data.userinfo;
        },
        getactId(state,data){
            this.state.actId=data
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]
})