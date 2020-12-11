<template>
  <div>
      <el-menu-item :index="basePath" v-if="!item.children">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
      <!-- 有子级 -->
      <el-submenu :index="basePath" v-else>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <sidebarItem v-for="child in item.children" :key="child.path" 
          :item="child" :basePath="resolvePath(child.path)"/>
      </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name:'SidebarItem',
  props:['item','basePath'],
  methods:{
    resolvePath(routePath){
      //path.resolve()   在绝对路径上拼接子级
      //path.resolve('/a/b','./c')   //a/b/c
      console.log(this.basePath);
      return path.resolve(this.basePath,routePath);
    }
  },

}
</script>
