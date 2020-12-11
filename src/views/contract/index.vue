<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item" 
       @input="query()"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="query()" >
        搜索
      </el-button>
    </div>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="loan_name"
      label="姓名"
      width="100"
      column-key="loan_name">
    </el-table-column>
    <el-table-column
      prop="loan_card"
      label="身份证"
      width="100">
    </el-table-column>
    <el-table-column
      prop="status"
      label="合同状态"
      width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.file_path |getStatusStyle">{{ scope.row.file_path |getStatus}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="{row}">
        <el-button
          size="mini" type="primary" @click="handleCreate(row)" :disabled="row.file_path!=''"
          >生成合同</el-button>
        <el-button
          size="mini"
          type="danger" @click="handleDownload(row)" :disabled="row.file_path==''"
          >下载合同</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows">
    </el-pagination>

  </div>
</template>

<script>
import {contractList,contractCreateFile,contractDownload} from '@/api/article'
import {getToken} from '@/utils/token'

export default {
  name: 'ComplexTable',
  data() {
    return {
      tableData: [], //表格展示的数据
      pages:1, //总页数
      rows:1, //总条数
      listQuery:{
        pageNo:1, //当前页面
        pageSize:10, //条数
        name:''  //查询条件
      }
    }
  },
  filters:{
    getStatusStyle(data){
      if(data){
        return 'success';
      }else {
        return 'info';
      }
    },
    getStatus(data){
      if(data){
        return '已生成合同';
      }else {
        return '未生成合同';
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList(){  //获取数据
      contractList(this.listQuery).then(res=>{
        let {code} = res.data;
        if(code=='20000'){
          let {data,rows,pages} = res.data.data.data;
          this.tableData = data;  //列表展示
          this.rows = rows;  //总条数
          this.pages = pages;  //总页数
        }
      })
    },
    query(){ //按名称查询
      this.getList();
    },
    //当前条数变化
    handleSizeChange(val=this.listQuery.pageSize ){
      this.listQuery.pageSize = val;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val=this.listQuery.pageNo){
      this.listQuery.pageNo = val;
      this.getList();
    },
    //生成合同
    handleCreate(row){
      contractCreateFile({id:row.id}).then(res=>{
        let {code} = res.data;
        if(code=='20000'){
          this.getList();
          this.$notify({  //通知框
            title: '生成合同',
            message: '生成合同成功',
            type:'success',
            duration: 2000
          });
        }
      })
    },
    //下载合同
    handleDownload(row){
      contractDownload({id:row.id}).then(res=>{
        let {code,data} = res.data;
        if(code=='20000'){
          this.$notify({  //通知框
            title: '下载合同',
            message: '下载合同成功',
            type:'success',
            duration: 2000
          });
          //http://139.196.42.209:5004/static/1591674882312.docx
          console.log('http://139.196.42.209:5004'+data.url);
          var _url = 'http://139.196.42.209:5004'+data.url;
          this.downloadFile(_url)
        }
      })
    },
    downloadFile(url){
      var xhr = new XMLHttpRequest();
      xhr.open('get',url);
      xhr.responseType="blob"; //字节流
      xhr.setRequestHeader('token',getToken());
      xhr.onload = ()=>{
        if(xhr.status==200){
          console.log(xhr.response);
          var filename = xhr.responseURL.substring(xhr.responseURL.lastIndexOf("/")+1);
          this.saveAs(filename,xhr.response)
        }
      };
      xhr.send();
    },
    saveAs(name, data) {
        var urlObject = window.URL;  //window对象的URL对象是专门用来将blob或者file读取成一个url的。
        var export_blob = new Blob([data]); //代表二进制类型的大对象,就是Blob对象是二进制数据
        // <a href="12345.jpg" download="名称" >
        var save_link = document.createElement('a');//创建a标签
        save_link.href = urlObject.createObjectURL(export_blob); //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
        //download是 HTML5 中<a>标签新增的一个属性，此属性会强制触发下载操作，指示浏览器下载 URL 而不是导航到它，并提示用户将其保存为本地文件
        save_link.download = name;
        save_link.click();//触发a标签单击
    }
  }
}
</script>
