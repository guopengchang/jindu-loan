import request from '@/utils/request'

//登录
export function login(data){
    // return request({
    //     method:'post',
    //     url:'user/login',
    //     data
    // })
    return request.post('user/login',data);
}
//获取用户信息
export function getInfo(token){
    return request({
        method:'get',
        url:'user/info',
        params:{token}
    })
}
//退出
export function logout(){
    return request({
        method:'post',
        url:'user/logout'
    })
}

//提交贷款申请
export function createLoan(data){
    return request({
        method:'post',
        url:'loan/create',
        data
    })
}

//申请管理 -查询
export function loanList(data){
    return request({
        method:'get',
        url:'loan/list',
        params:data
    })
}

//申请管理 -提交
export function submitToApprove(data){
    return request({
        method:'post',
        url:'loan/submitToApprove',
        data
    })
}

//申请管理 -删除
export function loanDelete(data){
    return request({
        method:'delete',
        url:'loan/delete/'+data.id,
    })
}

//申请管理 -编辑
export function loanUpdate(data){
    return request({
        method:'put',
        url:'loan/update',
        data
    })
}

//标的管理-获取数据
export function contractList(data){
    return request({
        method:'get',
        url:'contract/list',
        params:data
    })
}
//标的管理-生成合同
export function contractCreateFile(data){
    return request({
        method:'post',
        url:'contract/createFile',
        data
    })
}
//标的管理-下载合同
export function contractDownload(data){
    return request({
        method:'get',
        url:'contract/download',
        params:data
    })
}

//创建管理员
export function permissionCreateUser(data) {  //权限管理-创建管理员
    return request({
      url: 'permission/createUser',
      method: 'post',
      data
    })
  }
  
  export function permissionUserlist(data) {  //权限管理-列表展示
    return request({
      url: 'user/list',
      method: 'get',
      params: data
    })
  }