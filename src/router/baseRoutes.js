let layout = () => import("@/layout/index.vue")
// import baseForm from "./modules/1-base-form.js"
// import vxeTable from "./modules/2-vxe-table.js"
// import fastCopy from "./modules/3-fastCopy.js"

// import localCopyjs from "./modules/5-localCopy.js"
// import style from "./modules/6-style.js"
// import svgIcon from "./modules/7-svgIcon.js"
// import socket from "./modules/8-socket.js"
// import pdf from "./modules/9-pdf.js"
// import vCharts from "./modules/10-vCharts.js"
// import elementUI from "./modules/11-element-ui.js"
// import print from "./modules/12-print.js"
// import tagsView from "./modules/13-tagsView.js"
// import panel from "./modules/14-panel.js"

const routes = [{
    path: "/",
    redirect: "/home",
    component: layout,
    meta: {},
    children: [{
        path: 'home',
        name: 'home',
        component: () => import("@/views/base/home.vue"),
        meta: {
        }
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import("@/views/edit/index.vue"),
        meta: {
        }
      },
      {
        path: 'jyt',
        name: 'jyt',
        component: () => import("@/views/edit/index.vue"),
        meta: {
        }
      },
      {
        path: 'dzbhspxt',
        name: 'dzbhspxt',
        component: () => import("@/views/edit/index.vue"),
        meta: {
        }
      },
      {
        path: 'frzywoaxt',
        name: 'frzywoaxt',
        component: () => import("@/views/edit/index.vue"),
        meta: {
        }
      },
      {
        path: 'myGuarantee',
        name: 'myGuarantee',
        component: () => import("@/views/myGuarantee.vue"),
        meta: {
        }
      }
    ]
  },
  // {
  //   path: '/blank',
  //   name: 'blank',
  //   component: layout,
  //   meta: {
  //     hidden: true,
  //   },
  // },

  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/base/login.vue")
  },

]

export default routes
