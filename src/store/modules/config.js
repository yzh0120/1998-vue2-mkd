
const screenHeight = Number(clientHeight());
function clientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
}
export default {
  namespaced: true,
  state: {
    //弹窗全局的loading字段控制
    al:false,
    isCollapse: false,
    alert401: false,
    dataItem: [],//数据字典
    tableheight: screenHeight - 280 + "px",//vxetable高度
    navTableHeight: screenHeight - 120 + "px",//vxetable高度,
    needLogin: true,
    needNav:true,
    loading:false,//全局加载控制
    
  },
  mutations: {
    m_setCollapse(state, val) {
      state.isCollapse = val;
    }
  },

  actions: {

  }
}

