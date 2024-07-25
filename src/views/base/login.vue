<template>
  <div class="login-container">


    <puzzle-verification v-model="isVerificationShow1" :onSuccess="handleSuccess" :puzzleImgList="puzzleImgList"
      class="puzzle_verification" />




    <div class="login">
      <!-- 左边 -->
      <div class="left">
        <img :src="require(`@/assets/login1.png`)" alt="" width="309px" style="">
        <div class="leftfont">
          招采项目全生命周期 一站式金融解决方案
        </div>
      </div>
      <!-- 右边 -->
      <div class="right" style="position: relative;">
        <!-- X号 -->
        <!-- <i class="el-icon-close" style="position: absolute;right:10px;top:10px;font-size: 24px;cursor: pointer;"
          @click="$emit(`myClose`)"></i> -->
        <!-- <el-card shadow="never" :body-style="{ padding: '20px' }" style="height:100%;border:0px;"> -->
        <div class="content">
          <div style="width: 360px; height: 333px;">
            <!-- 标题 -->
            <div class="title">快速登录</div>
            <!-- 表单 -->
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off"
              size="large" @submit.native.prevent>
              <el-form-item prop="phoneNumber">
                <el-input ref="phoneNumber" v-model.trim="loginForm.phoneNumber" placeholder="请输入手机号码"
                  class="phoneNumber">
                </el-input>
              </el-form-item>

              <el-form-item prop="msgCode" style="position: relative;">
                <el-button
                  style="height:27px;position: absolute; right: 12px;top:50%;transform: translateY(-50%); z-index: 999;background-color: #DCDFE6;border: 0px;color:#000000 ;opacity: 50%;"
                  type="primary" :disabled="btndisabled" @click.prevent.stop="sendCode" size="mini">{{ codeText }}
                </el-button>
                <el-input v-model.trim="loginForm.msgCode" placeholder="请输入验证码" class="msgCode">
                </el-input>
              </el-form-item>
              <!-- 登录按钮 -->
              <el-button native-type="submit" :loading="loading" type="primary" class="loginbtn" size="large"
                @click.native.prevent="handleLogin">立即登录</el-button>
              <!-- 脚部 -->
              <div class="flexbtn">
                <div class="logonbtn">
                  <span class="span1">没有账号？</span>
                  <span class="span2" @click.prevent="signIn">注册账号</span>
                </div>
              </div>
              <!-- 脚部 -->
              <el-divider class="">其他登录方式</el-divider>

            </el-form>
          </div>
          <!-- </el-card> -->
        </div>
      </div>

    </div>

  </div>
</template>

<script>
// import { setCookie, setLocal } from "@/utils/auth";
import * as cookieFn from '@/utils/cookie.js';
// import * as userApi from "@/api/user";
import * as userApi from "@/api/user";
import {
  Message,
  MessageBox
} from 'element-ui';
export default {
  name: "login",
  data() {
    return {
      isVerificationShow1: false,
      puzzleImgList: [require("@/assets/1.png")],

      hascheck: false,
      loginForm: {
        phoneNumber: "",
        msgCode: "",
      },
      loginRules: {
        phoneNumber: [
          { required: true, trigger: "blur", message: "请输入手机号码" },
        ],
        msgCode: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,

      codeText: "获取验证码",
      btndisabled: false,
      timer: null,

      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() { },
  // mounted() {
  //   if (this.loginForm.userName === "") {
  //     this.$refs.userName.focus();
  //   } else if (this.loginForm.password === "") {
  //     this.$refs.password.focus();
  //   }
  // },
  destroyed() { },
  methods: {
    signIn() {
      this.$router.push({
        path: "/signIn"
      }).then(() => {
        this.$store.state.user.shouAlertLogin = false
      })
    },
    handleSuccess() {
      this.isVerificationShow1 = false
      this.getCode();
      var count = 60;
      this.btndisabled = true;
      this.codeText = `${count}s后重新获取`;
      this.timer = setInterval(() => {
        count--;
        this.codeText = `${count}s后重新获取`;
        if (count <= 0) {
          clearInterval(this.timer);
          this.btndisabled = false;
          this.codeText = `获取验证码`;
        }
      }, 1000);
    },
    service() {

    },
    //提交登录
    handleLogin() {
      this.$store.state.user.userInfo = {}
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let data = {
            userName: this.loginForm.phoneNumber,
            password: this.loginForm.msgCode
          }
          userApi.login(data).then(
            (res) => {
              this.loading = false;
              if (res.code == 200) {
                cookieFn.setCookie(
                  process.env.VUE_APP_TOKEN,
                  res.data.token,
                  new Date(res.data.expireTime)
                );
                console.log(this.$route, "this.$route")
                // let path = this.$route.path
                this.$router.push({
                  path: "/home"
                })
                //   .then(() => {
                //   this.$emit("myClose")
                //   this.$router.push({
                //     path: path
                //   })
                // })
              } else {
                this.$message.error(res.info);
              }
            },
            (err) => {
              this.loading = false;
              console.log(err, "err");
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 到注册页面
    goregister() {
      this.$router.push({ name: "register" });
    },

    // 点击按钮发送验证码
    sendCode() {
      this.$refs["loginForm"].validateField(["phoneNumber"], (valid) => {
        if (valid) {
          this.$message.warning("请先填写手机号码");
          return false;
        } else {
          this.isVerificationShow1 = true
          // this.getCode();
          // var count = 60;
          // this.btndisabled = true;
          // this.codeText = `${count}s后重新获取`;
          // this.timer = setInterval(() => {
          //   count--;
          //   this.codeText = `${count}s后重新获取`;
          //   if (count <= 0) {
          //     clearInterval(this.timer);
          //     this.btndisabled = false;
          //     this.codeText = `获取验证码`;
          //   }
          // }, 1000);
        }
      });
    },

    // 获取验证码
    getCode() {
      // userApi
      //   .sign({
      //     phone: this.loginForm.phoneNumber,
      //   })
      //   .then((res) => {
      //     if (res.code == 200) {
      //       this.$message.success(
      //         `验证码已经发送到${this.loginForm.phoneNumber}，请注意查收`
      //       );
      //     } else {
      //       this.$message.error(res.msg);
      //     }
      //   });
    },

    // 获取url上面的参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
.puzzle_verification {
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


$light_gray: #ccc;

.login-container {
  width: 100%;
  height: 100%;

}


.login {
  // width: 1050px;
  width: 100%;
  height: 98%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  .left {
    height: 80%;
    width: 300px;
    margin-top: 60px;
    margin-left: 60px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100px;
      // height: 100px;
    }

    .leftfont {
      margin: 0 auto;
      width: 80%;
      text-align: center;
      margin-top: 40px;
      font-size: 24px;
      color: #F6384C;
    }
  }

  .right {
    height: 100%;
    width: 400px;
    padding-right: 40px;

    // display: flex;
    // justify-content: center;
    // align-items: center;
    position: relative;
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .title {
        text-align: center;
        font-weight: bold;
        margin-top: 50px;
        font-size: 26px;
        font-weight: bold;
        color: black;
        margin-bottom: 30px;
      }

    }

  }
}



::v-deep {
  .el-input.el-input--large input {
    border-radius: 0px;
    padding-left: 15px;
  }

  .el-input-group__append {
    border-radius: 0px;
    background-color: transparent;
  }


  .phoneNumber {
    .el-input__inner {
      // background: url(../assets/phone.png) no-repeat 10px center;
      // color: #dadada;
      height: 53px;
    }
  }

  .msgCode {
    .el-input__inner {
      // background: url(../assets/password.png) no-repeat 10px center;
      height: 53px;
      // color: #dadada;
    }
  }

  .loginbtn {
    width: 100%;
    height: 48px;
    // margin-top: 60px;
    // margin-bottom: 15px;
    background-color: #F6384C;
    border: #F6384C;
    font-size: 18px;
  }

  .logonbtn {
    margin-top: 20px;
    text-align: right;
    font-size: 14px;

    .span1 {
      color: rgba(0, 0, 0, 0.4);

    }

    .span2 {
      cursor: pointer;
      color: #409EFF;
    }
  }


  .el-divider__text {
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
  }
}
</style>
