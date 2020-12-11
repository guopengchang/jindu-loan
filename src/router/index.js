import Vue from 'vue'
import VueRouter from 'vue-router'
import loanApprove from './modules/loanApprove'
import permission from './modules/permission'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由分二个模块  1、常规配置   2、动态配置
export const constantRoutes = [  //常规配置 
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import( '../views/login/index')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',   //重定向
    meta: { title: '首页',roles:['input','approve'] },
    component: () => import( '../layout/index'),
    children:[
      {
          path: '/index',  //首页
          name: 'index',
          meta: { title: '首页',roles:['input','approve'] },
          component: () => import( '../views/home/index')
      }
    ]
  }
]
 
export const asyncRoutes = [  //动态配置
        {
          path: '/index',  //首页
          name: 'index',
          meta: { title: '首页',roles:['input','approve'] },
          component: () => import( '../views/home/index')
      },
      {
        path: '/loan-input',  //贷款申请
        name: 'loan-input',
        meta: { title: '贷款申请',roles:['input']  },
        component: () => import( '../views/loan-input/index'),
      },
      {
        path: '/input-manager',
        name: 'input-manager',
        meta: { title: '申请管理',roles:['input']  },
        component: () => import('../views/input-manager/index'),
      },
      loanApprove,
      {
        path: '/contract',
        name: 'contract',
        meta: { title: '标的管理' ,roles:['approve'] },
        component: () => import('../views/contract/index'),
      },
      permission
]

const router = new VueRouter({
  routes:constantRoutes
})

export default router
