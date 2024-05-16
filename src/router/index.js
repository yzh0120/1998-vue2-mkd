import Vue from 'vue'
import VueRouter from 'vue-router'
import baseRoutes from './baseRoutes.js'
import store from '@/store/index' //vuex
import * as cookieFn from '@/utils/cookie.js';
import {
  Message,
} from 'element-ui';
Vue.use(VueRouter)
import * as userApi from "@/api/user";

//处理 同一个地方（路由）触发了两次的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//路由白名单
const whiteListName = ["login", "404", "401","edit","home"]


//静态资源目录
function fnStatic() {
  if (process.env.VUE_APP_ENV === 'test') {
    return "/test/"
  } else if (process.env.VUE_APP_ENV === 'build') {
    return "/build/"
  } else {
    return "/"
  }
}


const router = new VueRouter({
  mode: 'hash',
  base: fnStatic(),
  routes: baseRoutes
})

router.beforeEach(async (to, from, next) => {

  //保存某些数据
  if (!store.state.config.platformObj ?.id) {
    let strObj = cookieFn.getLocal("ppp") != `undefined` ? cookieFn.getLocal("ppp") : "{}"
    store.state.config.platformObj = JSON.parse(strObj)
  }

  //刚进去保存query
  let flag = from.query.channelCode || to.query.channelCode
  if (flag) {
    if (!to.query.channelCode) {
      next({
        path: to.path,
        query: from.query
      })
    }
  }

  if (store.state.config.needLogin) {
    if (cookieFn.getCookie(process.env.VUE_APP_TOKEN)) { //如果浏览器有token
      if (!store.getters.userInfo.userName) { //如果vuex没有用户信息
        await userApi.getAppSession().then(res => { //通过接口获取用户信息
          store.state.user.userInfo = res.data //保存用户信息//store.dispatch("user/setUserInfo", res.data); 

        })
      }
      next()
    } else { //如果没有token
      if (whiteListName.indexOf(to.name) !== -1) { //白名单
        next() //放行
      } else { //非白名单，跳转登录页
        store.state.user.shouAlertLogin = true
        next()

      }
    }
  } else {
    next() //放行
  }
})

router.afterEach(() => {

})




export default router
