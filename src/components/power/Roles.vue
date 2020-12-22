<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="roleList" style="width: 100%" border stripe>
<!--        展开列 -->
        <el-table-column type="expand" width="60">
        <template slot-scope="scope">

          <el-row  :class="['bdbotton',index1 == 0? 'bdtop' : '','vcenter']"
                   v-for="(item1,index1) in scope.row.children">
<!--            一级权限-->
            <el-col :span="6" >
               <el-tag>{{item1.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
<!--            二级权限-->
            <el-col :span="18">
              <el-row v-for = "(item2,index2) in item1.children"
                      :class="[index2 == 0 ? '' :'bdtop','vcenter']" >
                <el-col :span="6">
                   <el-tag type="success">{{item2.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
<!--                三级权限-->
                <el-col :span="18">
                     <el-tag @close="removeRightById" closable type="warning" v-for='item3 in item2.children'>{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
        </el-table-column>
        <el-table-column type="index" width="60"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button class="el-button-rool" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button class="el-button-rool" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              <el-button class="el-button-rool" size="mini" type="warning" icon="el-icon-s-tools">编辑权限</el-button>
            </template>
          </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      roleList:[],
    }
  },
  created() {
    this.getRoleList()
  },
  methods:{
    async getRoleList(){
      const {data : res } = await this.$http.get('roles')
      console.log(res)
      if (res.meta.status != 200){
        return this.$message.error('获取失败')
      }
      this.roleList = res.data;
      this.$message.success('获取成功')
    }
  }
};
</script>

<style scoped>
.el-table{
  margin-top: 20px;
}
.el-button-rool{
  margin-left: 36px;
}
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbotton{
  border-bottom:1px solid #eee ;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>
