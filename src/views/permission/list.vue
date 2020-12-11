<template>
  <div class="app-container">
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="account"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码">
    </el-table-column>
    <el-table-column
      prop="reg_time"
      label="创建时间">
      <template slot-scope="scope">
        <span>{{ scope.row.reg_time | getDate }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="creator"
      label="创建者">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="权限分配" 
     >
     <template slot-scope="scope">
        <span>{{ scope.row.role_name | getRole }}</span>
      </template>
    </el-table-column>
  </el-table>


  </div>
</template>

<script>
import {permissionUserlist} from '@/api/article'

export default {
  data() {
    return {
      list: null,
    }
  },
  filters: {
    getDate(time){
      var d = new Date(time);
      var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return times;
    },
    getRole(type){
       switch(type){
          case 'input':
              return '销售人员';
          case 'approve':
              return '初审人员';
          default:
              return type;
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      permissionUserlist().then(res => {
        console.log(res);
        var {code} = res.data;
        if(code == '20000'){
            this.list = res.data.data;  //获取展示的数据
          }
      })
    },
  }
}
</script>
