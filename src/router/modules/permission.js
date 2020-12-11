const permission = {
        path: '/permission',
        name: 'permission',
        meta: { title: '权限管理' },
        component: () => import('@/views/permission/index'),
        children:[
          {
            //path: '/loan-approve/first',
            path: '/permission/create',
            meta: { title: '创建管理员' },
            component: () => import('@/views/permission/create'),
          },
          {
            path: '/permission/list',
            meta: { title: '列表展示' },
            component: () => import('@/views/permission/list'),
          }
        ]
      }
  export default permission