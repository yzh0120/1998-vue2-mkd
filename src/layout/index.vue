<template>
  <el-container class="container">
    <template v-if="$store.state.config.needNav">
      <el-header height="auto">
        <div class="box">
          <!-- 左边 -->
          <div class="left">
            <img :src="require(`@/assets/logo.png`)" alt @click="toHome" style="position: relative;z-index: 99999999999;"/>
          </div>
          <!-- 中间 v-if="$store.state.setup.window_innerWidth >= 1500"-->
          <div class="nav" >
            <el-menu :default-active="$route.path" router class="el-menu-self" mode="horizontal">
              <el-menu-item index="/home">首页</el-menu-item>
              <el-menu-item index="/jyt">捷易通平台</el-menu-item>
              <el-submenu index="/abc">
                <template slot="title">系统软件</template>
                <el-menu-item index="/edit">三方金融服务平台</el-menu-item>
                <el-menu-item index="/dzbhspxt">电子保函审批系统</el-menu-item>
                <el-menu-item index="/frzywoaxt">非融</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <!-- 右边 -->
          <div class="right">
            <el-button v-if="!userInfo.id" type="info" size="small" @click="tologin" class="loginBtn">登录</el-button>
            <el-dropdown v-else :show-timeout="50" :hide-timeout="50" @command="onDropdownCommand">
              <span>
                <span v-if="userInfo.userName">{{ userInfo.userName }}</span>
                <span v-else-if="userInfo.phone">{{ userInfo.phone }}</span>
                <span v-else>未登录</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

         <!-- 中间 -->
         <!-- <div class="nav" v-if="$store.state.setup.window_innerWidth < 1500">
            <el-menu :default-active="$route.path" router class="el-menu-self" mode="horizontal">
              <el-menu-item index="/home">首页</el-menu-item>
              <el-menu-item index="/jyt">捷易通平台</el-menu-item>
              <el-submenu index="/abc">
                <template slot="title">系统软件</template>
                <el-menu-item index="/edit">三方金融服务平台</el-menu-item>
                <el-menu-item index="/dzbhspxt">电子保函审批系统</el-menu-item>
                <el-menu-item index="/frzywoaxt">非融</el-menu-item>
              </el-submenu>
            </el-menu>
          </div> -->

      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </template>
    <template v-else>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </template>

  </el-container>
</template>

<script>
import * as cookieFn from '@/utils/cookie.js';
export default {
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  data() {
    return {

    }
  },
  methods: {
    toHome() {
      this.$router.push({ path: "/" })
    },
    tologin() {
      this.$router.push({ path: "/login" })
    },
    onDropdownCommand(path) {
      if (path == "logOut") {
        cookieFn.removeCookie(process.env.VUE_APP_TOKEN);
        // this._closeAllTagsView(this.$route)
        // this.$store.state.router.routes = []//
        this.$router.push({ name: "login" }).then(() => {
          // window.location.reload();
        });
      } else {
        this.$router.push(path);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {

  .box {
    position: relative;
    height: 50px !important;

    .left {
      height: 100%;
      position: absolute;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 60px;

      img {
        cursor: pointer;
        width: 50px;
      }
    }

    //右边
    .right {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 60px;

      .loginBtn {
        background: #F5F5F5;
        border-color: #F5F5F5;
        color: #000000;
        padding: 9px 26px;
        font-size: 16px;

        &:hover {
          background: #F6384C;
          border-color: #F6384C;
          color: #ffffff;
        }
      }
    }

    
  }
  .nav {
      width: 1000px;
      margin: 0 auto;
    }
}

::v-deep {
  .el-scrollbar__wrap {
    overflow: auto
  }

  // .el-menu--horizontal {
  //   .el-submenu {
  //     .el-submenu__title {
  //       border: 0px solid red !important;
  //       font-size: 16px !important;
  //       ;
  //       font-weight: 500 !important;
  //       ;
  //       color: rgba(31, 31, 31, 1) !important;
  //     }
  //   }
  // }

  .el-dropdown-menu__item {
    &:hover {
      background-color: #FEEBED;
      color: #F86050;
    }

  }
}


// @import '~@/styles/ppp.scss';
</style>
