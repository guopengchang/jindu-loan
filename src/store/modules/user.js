import {getToken,removeToken} from '@/utils/token'
import {getInfo,logout} from '@/api/article'

const state={
  token:getToken(),
  roles:[]  //角色

};
const getters={
  token:state=>state.token,
  roles:state=>state.roles,
};
const actions={
  USERINFO({commit,state}){   //获取用户详情
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log(3333);
        const { data } = response.data;
        commit('SET_ROLES', data.roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  LOGOUT({commit,state}){   //退出
    return new Promise((resolve, reject) => {
      logout(state.token).then(response => {
        commit('SET_ROLES', [])  //清空
        commit('SET_TOKEN', '')
        removeToken();  //删除token
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
};
const mutations={
  SET_ROLES:(state,roles)=>{
    state.roles = roles;
  },
  SET_TOKEN:(state,token)=>{
    state.token = token;
  }
};

export default{
  state,
  getters,
  mutations,
  actions
}
