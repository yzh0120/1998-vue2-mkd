<template>
  <div id="app">
    <router-view />

    <vxe-modal v-model="$store.state.user.shouAlertLogin" title="" width="1000" height="600" 
      >
      <alertlogin @myClose="()=>{ $store.state.user.shouAlertLogin = false }"></alertlogin>
    </vxe-modal>
  </div>
</template>

<script>
import alertlogin from "@/views/base/alertlogin.vue"
export default {
  name: 'App',
  components: {
    alertlogin,
  },
  mounted() { 
    this.$store.commit("setup/windowResize");
    window.addEventListener("resize", this.clientXY);
    ///////////////
    const _this = this;
    this.bodyScale();
    window.onresize = function () {
      _this.bodyScale();
    }.bind(this);
    //////////////
  },
  methods: {
    //https://www.cnblogs.com/le-cheng/p/17939895
    bodyScale() {
      let devicewidth = document.documentElement.clientWidth //获取当前分辨率下的可是区域宽度
      let scale = devicewidth / 1920 // 分母——设计稿的尺寸
      document.body.style.zoom = scale //放大缩小相应倍数
    }
    clientXY() {
      this.$store.commit("setup/windowResize");
    },
  },
  beforeDestroy() {
    window.removeEventListener("setup", this.clientXY);
  },
  watch: {
    "$store.state.user.userInfo.id": {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          //存在
          // console.log("1111111111111")
          this.$socket.io.opts.query = {
            token: 123, //localStorage.getItem("token") || '没有token'
          };
          this.$socket.open();
        } else {
          this.$socket.disconnect(); //中断socket连接
        }
      },
      immediate: true,
    },
  },
  sockets: {
    //内置事件
    //1 连接成功
    connect() {
      console.log("连接成功", this.$socket);
    },
    //2 断开连接
    disconnect(data) {
      console.log("连接断开", this.$socket);
    },
    //3 重连中...... 服务器端断开,客户端自动执行
    reconnecting() {
      console.log("重连中......");
    },
    //4 重连成功 // 服务器端断开重连成功,客户端自动执行
    reconnect() {
      console.log("重连成功");
    },

    //自定义///////////////////////////////////////////////
    /* 有新消息*/
    newInfo(data) {
      // console.log(data, "newInfo");
      this.$message.success(data);
    },
    /* 非法链接断开*/
    illegal(data) {
      /* this.$socket.disconnect(); //中断socket连接
      this.$socket.connect(); //重新socket连接 */
    },
  },
}
</script>

<style lang="scss">
.box_1000{
  width: 1000px;
  margin: 0 auto;
}
</style>
