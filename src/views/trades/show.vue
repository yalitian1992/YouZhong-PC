<template>
  <div>
    <headTop></headTop>
    <searchTop></searchTop>
    <div class="content w970 mt40" id="trade" v-model="trades.trade_id">
      <h1 style="line-height: 34px;padding-left: 15px;margin-top:30px;">{{$t('message.trades_show.trades')}}</h1>
      <section class="order_track">
        <div class="orderNumTime">{{$t('message.trades_show.tradesnum')}}&nbsp;:&nbsp;<span class="number valueText">{{trades.supplier_trade_identifier || trades.identifier}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('message.trades_show.time')}}&nbsp;:&nbsp;<span class="time valueText">{{ trades.created_at }}</span>
          <div class="button_area">
            <div v-if="trades.status == 'pay'">
              <router-link :to="{path: '/pay', query: {id: trades.trade_id}}" class="rightnow_pay">{{$t('message.trades.Immediatepayment')}}</router-link>
              <div class="cancel_order" @click="delShow" >{{$t('message.trades_show.notrades')}}</div>
              <div class="del_title" :style="delCode == 1 ? 'display:block' : ''">
                <div class="arrow_up">
                  <em></em>
                  <span></span>
                </div>
                <div class="text_content">
                  <div class="fonts_del">{{$t('message.user_center.cancelprompt')}}</div>
                  <div class="yes_no_button">
                    <div class="yes_button" @click="delTrade" >{{$t('message.user_center.ensure')}}</div>
                    <div class="no_button" @click= "delHide">{{$t('message.user_center.cancel')}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="['receive', 'contribute'].indexOf(trades.status) != -1">
              <div class="rightnow_pay confirm_pay"  @click="confirmTradeShow">{{$t('message.trades.goodsOk')}}</div>
              <div class="del_title" :style="confirmTradeCode == 1 ? 'display:block;left:-37px' : ''">
                <div class="arrow_up">
                  <em></em>
                  <span></span>
                </div>
                <div class="text_content">
                  <div class="fonts_del">{{$t('message.trades_show.takeGood')}}</div>
                  <div class="yes_no_button">
                    <div class="yes_button" @click="confirmTradePost" >{{$t('message.trades_show.yesGood')}}</div>
                    <div class="no_button" @click= "confirmTradeHide">{{$t('message.trades_show.noGood')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="process" v-if="trades.payment_service == 'express' ">
          <p class="line line_0 line_s active"></p>
          <div class="item my_cart active">
            <span class="around"></span>
            <p class="text">{{$t('message.trades_show.addtrades')}}</p>
          </div>
          <p class="line line_1 line_l" :class="['receive', 'complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
          <div class="item confirm_trade " :class="['receive', 'complete'].indexOf(trades.status) != -1 ? 'active' : ''">
            <span class="around"></span>
            <p class="text">{{$t('message.trades_show.ship')}}</p>
          </div>
          <p class="line line_2 line_l" :class=" ['complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
          <div class="item pay_mode" :class=" ['complete'].indexOf(trades.status) != -1 ? 'active' : ''">
            <span class="around"></span>
            <p class="text">{{$t('message.trades.goodsOk')}}</p>
          </div>
          <p class="line line_3 line_l" :class=" ['complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
          <div class="item complete" :class=" ['complete'].indexOf(trades.status) != -1 ? 'active' : ''">
            <span class="around"></span>
            <p class="text">{{$t('message.trades_show.complete')}}</p>
          </div>
          <p class="line line_4 line_s" :class=" ['complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
        </div>
        <div v-else>
          <div class="process" v-if="['cancel','freezed'].indexOf(trades.status) != -1">
            <p class="line line_0 line_s active"></p>
            <div class="item my_cart active">
              <span class="around"></span>
              <p class="text">{{$t('message.trades_show.addtrades')}}</p>
            </div>
            <p class="line line_1 line_l active"></p>
            <div class="item confirm_trade active">
              <span class="around"></span>
              <p class="text">{{$t('message.trades_show.notrades')}}</p>
            </div>
            <p class="line line_2 line_s active"></p>
          </div>
          <div class="process" v-else>
            <p class="line line_0 line_s active"></p>
            <div class="item my_cart active">
              <span class="around"></span>
              <p class="text">{{$t('message.trades_show.addtrades')}}</p>
            </div>
            <p class="line line_1 line_l" :class="['audit','ship', 'receive', 'complete'].indexOf(trades.status) != -1 ? 'active' : '' "></p>
            <div class="item confirm_trade" :class="['audit','ship', 'receive', 'complete'].indexOf(trades.status) != -1 ? 'active' : '' ">
              <span class="around"></span>
              <p class="text">{{$t('message.trades_show.paySuccess')}}</p>
            </div>
            <p class="line line_2 line_l" :class="['receive', 'complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
            <div class="item pay_mode" :class="['receive', 'complete'].indexOf(trades.status) != -1 ? 'active' : ''">
              <span class="around"></span>
              <p class="text">{{$t('message.trades_show.ship')}}</p>
            </div>
            <p class="line line_3 line_l" :class=" ['complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
            <div class="item pay_mode" :class="['complete'].indexOf(trades.status) != -1 ? 'active' : ''">
              <span class="around"></span>
              <p class="text">{{$t('message.trades.goodsOk')}}</p>
            </div>
            <p class="line line_4 line_l" :class="['complete'].indexOf(trades.status) != -1 ? 'active' : ''"></p>
            <div class="item complete" :class="['complete'].indexOf(trades.status) != -1 ? 'active' : ''">
              <span class="around"></span>
              <p class="text">{{$t('message.trades_show.complete')}}</p>
            </div>
            <p class="line line_5 line_s" :class="['complete'].indexOf(trades.status) != -1 ? 'active' : '' "></p>
          </div>
        </div>
        <div class="delivery_info">
          <div  class="info_head" v-if="delivery.delivery_service">
            {{$t('message.trades_show.delviyName')}} :  <span>{{this.delviy(delivery.delivery_service)}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('message.trades_show.delviyNum')}}:<span>{{delivery.delivery_identifier}}</span>
          </div>
          <ul class="info_item" v-if="!delivery.delivery_service || DeliveryInfo.returnCode == 500">
            <li>
              {{$t('message.trades_show.delviyInfo')}}
            </li>
          </ul>
          <ul class="info_item" v-for="(delInfo,index) in DeliveryInfo.data" v-else>
            <li>
              <span class="time">{{delInfo.time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span :class="index ==0? 'resign' : ''">{{delInfo.context}}</span>
            </li>
          </ul>
        </div>
      </section>
      <h1 class="orderDetail_title" style="line-height: 34px;padding-left: 15px;">{{$t('message.trades_show.xiangqing')}}</h1>
      <section>
        <h3 class="receiveGood">{{$t('message.trades_show.title')}}</h3>
        <div class="address_content">
          <div class="recipt">
            <span class="recipt_content">{{$t('message.trades_show.name')}}&nbsp;:&nbsp;</span>
            <span class="recipt_detail">{{trades.address.name }}</span>
          </div>
          <div class="recipt">
            <span class="recipt_content">{{$t('message.trades_show.Address')}}&nbsp;:&nbsp;</span>
            <span class="recipt_detail">{{trades.address.address}}</span>
          </div>
          <div class="recipt">
            <span class="recipt_content">{{$t('message.trades_show.phone')}}&nbsp;:&nbsp;</span>
            <span class="recipt_detail">{{trades.address.phone}}</span>
          </div>
          <div class="delivery_way">
            <span class="name">{{$t('message.trades_show.status')}}&nbsp;:&nbsp;</span>
            <span class="phone">{{trades.delivery_time =='all'? $t('message.trader_createL.all') :trades.delivery_time =='workday'?$t('message.trader_createL.workday'):$t('message.trader_createL.playday')}}</span>&nbsp;&nbsp;&nbsp;
          </div>
          <div class="recipt" v-if="trades.delivery_phone">
            <span class="detail">{{$t('message.trades_show.detail')}}&nbsp;:&nbsp;</span>
            <span class="phone">{{trades.delivery_phone}}</span>
          </div>
        </div>
        <h3 class="remark_title">{{$t('message.trades_show.message')}}</h3>
        <div class="remark_content">{{ trades.comment ? trades.comment : $t('message.trades_show.no') }}</div>
      </section>
      <h1 class="mt28" style="line-height: 34px;padding-left: 15px;">{{$t('message.trades_show.product')}}</h1>
      <section>
        <h2 class="pd0">
          <p class="left title">{{$t('message.trades_show.product2')}}</p>
          <p class="left price">{{$t('message.trades_show.price')}}</p>
          <!--<p class="left nums">数量</p>-->
          <p class="left discount">{{$t('message.trades_show.total')}}</p>
          <p class="left total">{{$t('message.trades_show.total2')}}</p>
        </h2>
        <ul class="prods_all">
          <li v-for="(Info,index) in trades.units" :class="index+1 == trades.units.length ? 'last' : ''">
            <div class="img_wrapper left"><img :src="imgBaseUrl()+Info.major_pic+'.m220.jpg'" :onerror="defaultImg(0)" style="width:100%; height:100%"></div>
            <div class="left pro_info">
              <p class="name">{{ Info.name }}</p>
              <div class="pro_detail">
                <p class="mearsure"><span class="color" v-if="Info.sku_color">{{$t('message.show.color')}}：{{Info.sku_color}}</span><span v-if="Info.sku_name" class="size" :class="{'bdl1' : Info.sku_color}">{{$t('message.show.size')}}：{{Info.sku_name}}</span></p>
                <!--<% if(overseas){ %><p class="tax_rate">税率：<%= (val.tax_rate * 100).toFixed(2) || 0 %>%</p><% } %>-->
              </div>
            </div>
            <div class="price left">
              <p class="text">{{currency}}{{Info.discount}}</p>
            </div>
            <!--<div class="sums left">{{Info.amount}}</div>-->
            <div class="discount left">{{Info.discount-Info.price >0? $t('message.trades_show.vouch')+currency+parseInt(Info.discount-Info.price): '-'}}</div>
            <!--<div class="discount left">{{Info.percent ?$t('message.trades_show.vouch')+currency+Info.percent : '-'}}</div>-->
            <div class="sum_money left">
              <p class="h_price">{{currency}}{{Info.price}}</p>
            </div>

            <div class="operation">
              <!--<% if(trade.return_goods && !val.status){ %>-->
              <router-link :to="{path: '/return_goodFrom', query: {supplier: trades.supplier_trade_id, unitId: Info.unit_id, paytype: trades.payment_service}}" v-if=" trades.is_allow_return && !Info.status " class="refund_apply" ><span>退货申请</span></router-link>
              <span v-else>
                <router-link :to="{path: '/return_goodShow', query: {unitId: Info.unit_id}}" v-if = "trades.status == 'complete' && Info.status != 'freezed'" class="refund_apply" ><span>{{ Info.status == 'audit' ? $t('message.trades_show.audit') : (Info.status == 'receive' ? $t('message.trades_show.receive') : (Info.status == 'transfer' ? $t('message.trades_show.transfre') : (Info.status == 'complete' ? $t('message.trades_show.returnMomey') : ''))) }}</span></router-link>
                <p class="left return_good" v-else>{{ Info.status == 'audit' ? $t('message.trades_show.audit') : (Info.status == 'receive' ? $t('message.trades_show.receive') : (Info.status == 'transfer' ? $t('message.trades_show.transfre') : (Info.status == 'complete' ? $t('message.trades_show.returnMomey') : (Info.status == 'freezed' ? $t('message.trades_show.freezed') : '')))) }}</p>
              </span>
            </div>
          </li>
        </ul>
        <div class="remark">
          <div class="remark_text">
            {{$t('message.carts.common')}} <span class="product_count">{{trades.total_unit}}</span> {{$t('message.carts.piece')}}&nbsp;&nbsp;&nbsp;&nbsp;
            {{$t('message.carts.total')}}(
            <!--<% if(overseas){ %>-->
            <!--关税¥  <span class="tax"><%= trade.tax_price || 0 %></span>-->
            <!--<% } %>-->
            {{$t('message.carts.freight')}}{{currency}} <span class="delivery_cost">{{ trades.delivery_price || 0 }}</span>)
            <span class="orderform_sum">{{currency}}{{ trades.payment_price }}</span>
          </div>
        </div>
      </section>
    </div>
    <footErs></footErs>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import searchTop from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import {imgBaseUrl,currency} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        trades:{
          address:{}
        },
        DeliveryInfo:{},
        delCode: 0,
        confirmTradeCode: 0,
        imgBaseUrl,
        currency,
        delivery:{
          supplier_trade_id:'',   //"子订单id",
          identifier: '', //供应商订单号
          delivery_service: '',//'快递服务商',
          delivery_identifier: ''//'快递单号'
        },
        servesName:{
          fedex:this.$t('message.trades_show.fedex'),
          zjs:this.$t('message.trades_show.zjs'),
          ems:this.$t('message.trades_show.ems'),
          offline:this.$t('message.trades_show.offline'),
          pickup:this.$t('message.trades_show.pickup'),
          sf:this.$t('message.trades_show.sf'),
          yt:this.$t('message.trades_show.yt'),
          scic:this.$t('message.trades_show.scic'),
          bestex:this.$t('message.trades_show.bestex'),
          deppon:this.$t('message.trades_show.deppon'),
          dhl:this.$t('message.trades_show.dhl'),
          yunda:this.$t('message.trades_show.yunda'),
          zyzoom:this.$t('message.trades_show.zyzoom'),
          ttkdex:this.$t('message.trades_show.ttkdex'),
          xlobo:this.$t('message.trades_show.xlobo'),
          express_au:this.$t('message.trades_show.express_au')
        }
      }
    },
    components: {
      headTop,
      searchTop,
      footErs

    },
    methods: {
      delShow : function(){
        this.delCode = 1;
      },
      delTrade : function(e){
        var _this = this;
        this.deleatTrade(this.token(),this.trades.trade_id, function (respones) {
          _this.$router.go(0)
        })
      },
      delHide : function(){
        this.delCode = 0;
      },
      confirmTradeShow : function(){
        this.confirmTradeCode = 1;
      },
      confirmTradePost : function(e){
        var _this = this;
        if(this.trades.supplier_trade_id){
          var id = {supplier_trade_id:this.trades.supplier_trade_id}
        }else{
          var id = {trade_id:this.trades.trade_id}
        }
        this.confirmTrade(this.token(),id, function (respones) {
//          console.log(respones)
          _this.$router.go(0)
        });
      },
      confirmTradeHide : function(){
        this.confirmTradeCode = 0;
      },
      tradesInfos:function(){
        var _this = this;
        this.tradesInfo(this.token(),this.$route.query.id,{supplier_trade_id:this.$route.query.supplier_id}, function (response) {
          _this.trades = response.data
          _this.delivery.supplier_trade_id =response.data.supplier_trade_id;
          _this.delivery.identifier =response.data.supplier_trade_identifier;
          _this.delivery.delivery_service =response.data.delivery_service;
          _this.delivery.delivery_identifier =response.data.delivery_identifier;
          if(_this.delivery.delivery_service && _this.delivery.delivery_identifier){
            _this.getDelivery(_this.token(),_this.delivery,function(res){
              _this.DeliveryInfo = res.data;
            })
          }
        })
      },
      delviy:function(msg){
        for(var key in this.servesName){
          if(key == msg){
            return this.servesName[key]
          }
        }
      }

    },
    mounted() {
      var _this = this;
      _this.tradesInfos();
    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/trades/show"
</style>
<style type="text/css" scoped>
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video{
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }
</style>
