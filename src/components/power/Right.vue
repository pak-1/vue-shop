<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightsList" style="width: 100%" border stripe>
        <el-table-column type="index" width="60"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == '0'">等级一</el-tag>
            <el-tag v-if="scope.row.level == '1'" type="success">等级二</el-tag>
            <el-tag v-if="scope.row.level == '2'" type="warning">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Right",
  data() {
    return {
      rightsList: [],
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("获取用户权限列表失败");
      }
      this.rightsList = res.data;
      this.$message.success("获取用户权限列表成功");
    },
  },
};
</script>

<style scoped></style>
