<template>
  <div>
    <headTop></headTop>
    <searchTop :Buy="Buy"></searchTop>
   <div class="main" data-id="819599">
      <div class="content">
        <div class="title_header">
          <span class="loaded confirm_icon left"></span>{{$t('message.pay.title')}}&nbsp;,&nbsp;{{$t('message.pay.titlea')}}<span class="fill_value"> 2 </span>{{$t('message.pay.titleb')}}<span
          class="remark">&nbsp;&nbsp;{{$t('message.pay.titlec')}}</span>
          <div class="order_info">
            <span class="remark">{{$t('message.pay.identif')}}&nbsp;:&nbsp;&nbsp;</span><span class="remark">{{payInfos.identifier}}</span>&nbsp;&nbsp;&nbsp;
            <span class="remark">{{$t('message.pay.money')}}&nbsp;:&nbsp;&nbsp;<span class="money_value">¥ {{payInfos.price}}</span></span>
          </div>
        </div>
        <div class="platform">
          <div class="title_label">{{$t('message.pay.platfrom')}}<span class="option">&nbsp;&nbsp;</span></div>
          <ul>
            <li class="loaded" v-for="(paytype,index) in payInfos.payment_services" v-if="['alipay', 'paypal'].indexOf(paytype.payment_service) != -1">
              <input type="radio" :value="paytype.payment_service" name="pay_radio" :checked="index == checkNum" @change="selectText(paytype.name,paytype.payment_service,index)">
              <img src="../../assets/images/trades/alipay.png" v-if="paytype.payment_service == 'alipay'">
              <img src="../../assets/images/trades/paypal.png" v-if="paytype.payment_service == 'paypal'">
            </li>
          </ul>
        </div>
        <div class="receivepay" v-for="(express,item) in payInfos.payment_services" v-if="express.payment_service =='express'">
          <div class="title_label">{{$t('message.pay.express')}}<span class="option">&nbsp;&nbsp;{{$t('message.pay.expressInfo')}}</span></div>
          <ul>
            <li>
              <input type="radio" :value="express.payment_service" name="pay_radio" :checked="item == checkNum" @change="selectText(express.name,express.payment_service,item)"/>
              <img src="../../assets/images/trades/receivepay.png?20151229154423">
            </li>
          </ul>
        </div>

        <div class="button_area">
          <button class="confirm_button" @click="paySubmit">{{$t('message.pay.submit')}}</button>
          <div class="title_pay">{{$t('message.pay.check')}}：<span class="selected_way">{{textValue}}</span></div>
        </div>
      </div>
    </div>

    <div class="mask ie hide">
      <div class="alert_tip">
        <div class="title_pay"><span class="tip_icon"></span>
          <p>{{$t('message.pay.alertInfo')}}</p></div>
        <div class="mask_alert">
          <div class="subtitle"><span></span>{{$t('message.pay.alertA')}}</div>
          <div class="completed_button" @click="payfinished">{{$t('message.pay.alertB')}}</div>
          <div class="question_button" @click="payback">{{$t('message.pay.alertC')}}</div>
        </div>
        <p class="mask_load hide">{{$t('message.pay.alertLoad')}}</p>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import searchTop from '../../components/assembly/shop_header.vue'
  import footErs from '../../components/assembly/foot.vue'
  import {payUrl} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
  import {currency} from '../../../config/config'
  export default {
    i18n,
    data() {
      return {
        Buy: 3,
        id:'',
        currency,
        payInfos:{},
        textValue:'',
        payment_service: '',
        postmsg: {
          trade_id:'' ,
          subject: "",
          out_trade_no: "",
          total_amount: ""
        },
        payUrl,
        checkNum:0
      }
    },
    components: {
      headTop,
      searchTop,
      footErs
    },
    methods: {
      //确定支付
      paySubmit: function () {
        var _this = this
      	var host = 'http://'+window.location.host
        $('.confirm_button').addClass('bg').attr('disabled',true).text(_this.$t('message.pay.submitLoad'))
        if(this.payInfos.status == 'pay'){
          if(this.payment_service == 'alipay'){
            var newWin = window.open('about:blank');
            this.tradesAlipay(this.token(),{trade_id:this.postmsg.trade_id},function(response){
              $('.confirm_button').removeClass('bg').attr('disabled',false).text(_this.$t('message.pay.submit'))
              newWin.location.href = response.data.url;
              $('.mask').removeClass('hide');
            })
          }else if(this.payment_service == 'express'){
            var _this = this;
            this.tradesExpress(this.token(),{trade_id:this.postmsg.trade_id},function(){
              $('.confirm_button').removeClass('bg').attr('disabled',false)
              _this.$router.replace({path: '/trades_show', query: {id: _this.$route.query.id}});
            })
          }else if(this.payment_service == 'paypal'){
            var _this = this;
            var newWin = window.open('about:blank');
            _this.tradesPaypal(_this.token(),{trade_id:_this.postmsg.trade_id,return_url:host+'/paypalLoding'},function(response){
              $('.confirm_button').removeClass('bg').attr('disabled',false).text(_this.$t('message.pay.submit'))
              newWin.location.href = response.data.url;
              $('.mask').removeClass('hide');
            })
          }
        }else{
          this.$router.replace({path: '/trades_show', query: {id: this.$route.query.id}});
        }
      },
      //完成支付
      payfinished: function () {
        $('.mask_alert').addClass('hide');
        $('.mask_load').removeClass('hide');
        var _this = this;
        this.payInfo(this.token(),{trade_id:this.$route.query.id},function(respone){
          if (respone.data.status != 'pay') {
            _this.$router.replace({path: '/trades_show', query: {id: _this.$route.query.id}});
          } else {
            $('.mask_alert').removeClass('hide');
            $('.mask_load').addClass('hide');
          }
        })
      },
      //重新支付
      payback:function () {
        $('.mask_alert').addClass('hide');
        $('.mask_load').removeClass('hide');
        var _this =this;
        this.payInfo(this.token(),{trade_id:this.$route.query.id},function(respone){
          if (respone.data.status != 'pay') {
            _this.$router.replace({path: '/trades_show', query: {id: _this.$route.query.id}});
          } else {
            $('.mask_alert').removeClass('hide');
            $('.mask_load').addClass('hide');
            $('.mask').addClass('hide');
          }
        })
      },
      selectText:function(text,server,index){
        this.payment_service = server
        this.textValue = text
        this.checkNum = index
      }
    },
    mounted(){
      var _this = this;
      _this.payInfo(_this.token(),{trade_id:_this.$route.query.id},function(respone){
        _this.payInfos = respone.data;
        _this.payment_service = _this.payInfos.payment_services[0].payment_service;
        _this.postmsg.trade_id = _this.$route.query.id;
        _this.textValue = _this.payInfos.payment_services[0].name;
      })

    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/trades/pay"
</style>
<style type="text/css" scoped>
.bg{
  background: #9b9a9c !important;
}
</style>
