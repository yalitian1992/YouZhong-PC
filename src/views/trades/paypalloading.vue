<template>
  <div>
    <headTop></headTop>
    <div class="main" data-id="819599">
      <div class="text">
        <div class="mask ie">
          <div class="alert_tip">
            <div class="title_pay">
              <span class="tip_icon"></span>
              <p>{{$t('message.payLoading.title')}}</p>
            </div>
            <p class="mask_load">{{paymsg}}</p>
          </div>
        </div>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import searchTop from '../../components/assembly/shop_header.vue'
  import footErs from '../../components/assembly/foot.vue'
  //import {} from '../../assets/js/contacts/create.js'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        postmsg: {
          paymentId: "", // paypal支付订单ID
          token: "",
          PayerID: "", //支付用户ID
        },
        paymsg:this.$t('message.payLoading.paymsg')
      }
    },
    components: {
      headTop,
      searchTop,
      footErs
    },
    methods: {},
    mounted(){
      var _this = this;
      _this.postmsg.paymentId = _this.$route.query.paymentId;
      _this.postmsg.token = _this.$route.query.token;
      _this.postmsg.PayerID = _this.$route.query.PayerID;
      _this.tradesExecute(_this.token(),_this.postmsg,function(respone){
        if(respone.status == 200){
          _this.paymsg = _this.$t('message.payLoading.paySuccess')
          setTimeout(function () {
            _this.$router.replace({path: '/trades_show', query: {id: respone.data.trade_id}});
          },2000)
        }else{
          if(respone.msg == 'faild'){
            _this.paymsg = _this.$t('message.payLoading.payfalse')
            setTimeout(function () {
              _this.$router.replace({path: '/trades_show', query: {id: respone.data.trade_id}});
            },2000)

          }
        }
      })
    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/trades/pay"
</style>
<style type="text/css" scoped>
.text{
  padding: 100px 0;
  background: #fff;
}
.text .mask{
  background: #fff;
  position: static;
}
.text .mask .alert_tip{
  position: static;
  margin:0 auto;
}
</style>
