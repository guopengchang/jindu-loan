import router from './router'
import store from './store'

//路由拦截  路由在跳转前执行。。。
//beforeEach 有三个参数
//to 即将进入的路由
//from 即将离开
//next 下一个  管道钩子
router.beforeEach(async(to,from,next)=>{
    //1、是否是登录页
    if(to.path=='/login'){
        next();
    }else {
        //2、登录用户信息（分角色  管理员  销售人员  初审人员）
        //正常跳转   vuex中获取角色信息
        var hasRoles = store && store.getters.roles && store.getters.roles.length>0;
        console.log(111);
        if(hasRoles){
            next() //有角色  跳出拦截  
        }else {
            try{ //页面刷新 第一次登录
                let {roles} = await store.dispatch('USERINFO');  //获取用户详情
                //roles: [{id: 1, name: "administrator"}]  管理员administrator  销售input 审核approve
                let roleName = roles.map(n =>n.name); //取出name属性
                //传入对应的角色，返回路由的结果
                let asyncRoutes = await store.dispatch('GENERATEROUTES',roleName);
                console.log(asyncRoutes);
                router.addRoutes(asyncRoutes); //动态路由  接受的参数是数组对象
                console.log(222);
                if(roles){
                    next({...to});
                }else {
                    next({path:'/login'});
                }
            } catch(error){
                console.log(444);
                next({path:'/login'})
            }
        }
    }
    
    
    //没有角色  页面刷新 拿到用户信息   回到登录
    
})

