<template>
  <el-container class="home-container">
    <el-header>
      <div class="_left">
        <img src="../assets/logo.png" alt="" /><span>商城后台管理系统</span>
      </div>
      <div class="_right">
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '56px' : '200px'">
        <div class="topbtn" @click="menuctrol">|||</div>
        <el-menu
          :default-active="currentpath"
          router
          :collapse-transition="false"
          :collapse="isCollapse"
          :unique-opened="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="(item, index) in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="'iconfont' + ' ' + iconArr[index]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + child.path"
              v-for="child in item.children"
              :key="child.id"
              @click="savepath('/' + child.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span> {{ child.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { request } from "../netword/request.js";
export default {
  data() {
    return {
      menulist: [],
      iconArr: [
        "icon-duoyonghu",
        "icon-tijikongjian",
        "icon-shangpin",
        "icon-danju-tianchong",
        "icon-baobiao",
      ],
      isCollapse: false,
      currentpath: "",
    };
  },
  created() {
    this.getMenuList();
    this.currentpath = window.sessionStorage.getItem("activepath");
  },
  methods: {
    savepath(activepath) {
      window.sessionStorage.setItem("activepath", activepath);
      this.currentpath = activepath;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    getMenuList() {
      this.$http({
        url: "menus",
        method: "get",
      }).then(res => {
        this.menulist = res.data.data;
        // console.log(this.menulist);
      });
    },
    menuctrol() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #333744;
  transition: all 0.3s;
}
.el-main {
  background-color: #eaedf1;
}
._left {
  display: flex;
  align-items: center;
  color: #fff;
}
._left img {
  width: 55px;
}
._left span {
  margin-left: 12px;
}
.iconfont {
  margin-right: 10px;
}
.el-menu {
  border-right: none;
}
.topbtn {
  background-color: rgb(108, 109, 119);
  line-height: 24px;
  text-align: center;
  letter-spacing: 2px;
  color: #fff;
  cursor: pointer;
}
</style>
