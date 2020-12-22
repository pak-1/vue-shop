<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="3">
          <el-button type="primary" @click="adddialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table stripe border :data="userlist" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="200">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="200">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="200">
        </el-table-column>
        <el-table-column label="状态" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="statechange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editVisible(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="deleteUser(scope.row.id)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button
                size="mini"
                type="warning "
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 7, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户提示框 -->
    <el-dialog
      @close="adddialogclose"
      title="添加用户"
      :visible.sync="adddialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户提示框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editdialogVisible"
      @close="editdialogclose"
      width="50%"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //判断邮箱
    var EmailRule = (role, value, callback) => {
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的邮箱地址"));
    };

    //判断手机号
    var PhoneRule = (role, value, callback) => {
      const regPhone = /^1\d{10}$/;
      if (regPhone.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号码"));
    };
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      // 添加用户
      adddialogVisible: false,
      // 修改用户
      editdialogVisible: false,
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //添加用户验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6~15个之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: EmailRule, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: PhoneRule, trigger: "blur" },
        ],
      },

      // 修改用户的数据表单
      editForm: {
        id: "",
        username: "",
        email: "",
        mobile: "",
      },
      // 修改用户的验证规则
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: EmailRule, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: PhoneRule, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$http({
        url: "users",
        method: "get",
        params: this.queryInfo,
      }).then(res => {
        if (res.data.meta.status != 200) {
          return this.$message.error("申请用户列表失败");
        }
        this.userlist = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUserList();
    },
    handleCurrentChange(newsize) {
      this.queryInfo.pagenum = newsize;
      this.getUserList();
    },
    statechange(userinfo) {
      // console.log(userinfo);
      this.$http
        .put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        .then(res => {
          // console.log(res);
          if (res.data.meta.status != 200) {
            userinfo.mg_state = !userinfo.mg_state;
            return this.$message.error("设置状态失败");
          }
          this.$message.success(res.data.meta.msg);
        });
    },

    // 添加用户对话框关闭事件
    adddialogclose() {
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return;
        }
        // 验证成功可以发起请求
        this.$http({
          url: "users",
          data: this.addForm,
          method: "post",
        }).then(res => {
          if (res.data.meta.status != 201) {
            return this.$message.error("添加用户失败");
          }
          this.$message.success("添加用户成功");
          this.getUserList();
          this.adddialogVisible = false;
        });
      });
    },
    // 修改用户的值传递
    editVisible(scope_row) {
      this.editForm.id = scope_row.id;
      this.editForm.username = scope_row.username;
      this.editForm.email = scope_row.email;
      this.editForm.mobile = scope_row.mobile;
      this.editdialogVisible = true;
    },
    // 修改用户的重置
    editdialogclose() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户的预验证
    editUserInfo() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) {
          return;
        }
        // 发送修改请求
        this.$http
          .put("users/" + this.editForm.id, {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          })
          .then(res => {
            if (res.data.meta.status != 200) {
              return this.$message.error("修改失败");
            }
            this.$message.success("修改成功");
            this.getUserList();
            this.editdialogVisible = false;
          });
      });
    },
    //删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const status = await this.$http.delete("users/" + id).then(res => {
            return res.data.meta.status;
          });
          if (status != 200) {
            return new Error();
          }
          this.getUserList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
