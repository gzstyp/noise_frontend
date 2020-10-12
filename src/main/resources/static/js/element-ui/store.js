import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    /* 数据源 */
    state : {
        storageDatas : [{kid:1024}]
    },
    /* 提供修改数据源的方法 */
    mutations : {
        /*一般情况下对象或数组采用vuex来处理*/
        setGridData(state,provider){
            if(provider == null || provider.length <= 0){
                state.storageDatas = [];
            }else{
                state.storageDatas = provider;
            }
        }
    },
    /* 对外提供修改数据源的方法且只能调用 mutations里的方法 */
    actions : {
    },
    modules : {
    }
});