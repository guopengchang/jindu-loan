import {constantRoutes,asyncRoutes} from '@/router'

function filterAsyncRouter(routes,name){  //过滤角色
  var data = routes.filter(route=>{
    return route.meta && route.meta.roles && name.some(v=>route.meta.roles.includes(v))
  })
  return data;
}

const state={
  routes:[]  //动态路由
};
const getters={
  get_routes:state=>state.routes,
};
const actions={
  GENERATEROUTES({commit,state},rolesName){   //通过角色来过滤路由
    return new Promise((resolve, reject) => {
      var _routes; //返回路由
      let home = constantRoutes.filter(v=>v.path=='/home')[0];
      home.children = []; //清除
      if(rolesName.includes('administrator')){  //是否是管理员
        home.children = asyncRoutes;
      }else {
        let filterRouter = filterAsyncRouter(asyncRoutes,rolesName);
        home.children = filterRouter;
      };
      _routes = [home] || [];
      commit('SET_ROUTES', _routes);
      resolve(_routes)
    })
  },
};
const mutations={
  SET_ROUTES:(state,routes)=>{
    state.routes = routes;
  }
};

export default{
  state,
  getters,
  mutations,
  actions
}
