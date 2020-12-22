<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="head_img">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return;
        }
        this.$http({
          url: "login",
          method: "post",
          data: this.loginForm,
        }).then(res => {
          const { data } = res;
          if (data.meta.status != 200) {
            return this.$message.error("用户名或密码错误");
          }
          this.$message.success("登录成功");
          //console.log(data);
          window.sessionStorage.setItem("token", data.data.token);
          this.$router.push("/home");
        });
      });
    },
  },
};
</script>

<style scoped>
.login_container {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  height: 100%;
  position: relative;
}
.login_box {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
.head_img {
  width: 130px;
  height: 130px;
  position: absolute;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  padding: 10px;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.head_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
