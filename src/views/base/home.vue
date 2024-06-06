<template>
  <div>
<el-button type="primary" size="default" @click="go">录单</el-button>


<tip title="注意事项">
  <div class="notice">
            <!-- <p style="color:red;">1、保函一经开出，概不退费。</p> -->
            <p>1、每次支付都会生成订单对应的新收款帐号，请按照页面提示帐号进行付款。</p>
            <p>2、请申请人使用申请企业对公账户付款，使用非对公帐户付款将会打款失败。</p>
            <p>3、订单金额与转账金额必须一致，请勿多转帐、少转帐或分次转账。</p>
            <p>4、请在转帐时，按照收款信息备注的内容，填写附言/摘要/备注。</p>
            <p>5、对公支付因各银行不同，会影响实际到账时间，最终支付时间以到账时间为准，请合理安排付款时间。</p>
            <!-- <p>6、如有疑问，请拨打客服电话： {{ info.extendJson && info.extendJson.ServicePhone }}</p> -->
            <!-- <p>6、如有疑问，请拨打客服电话：   &nbsp;13028830302   &nbsp; 13711526903</p> -->
          </div>
</tip>

<p style="height: 1000px;"></p>
<p></p>
  </div>
</template>

<script>
  export default {
  methods: {
      go() { 
        
      },
  },
  }
</script>

<style lang="scss" scoped>

</style>
