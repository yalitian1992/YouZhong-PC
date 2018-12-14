<template>
  <div>
    <headTop></headTop>
    <normalHead></normalHead>
    <div style="height: 40px;"></div>
    <div class="content mt40">
      <userSide></userSide>
      <section style="margin-bottom: 0px;">
        <div class="left user_info">
          <div class="top">
            <div class="img_wrapper left loaded"><img :src="imgBaseUrl() +this.headimg" :onerror="defaultImgUser(0)" alt=""></div>
            <p class="user_name">{{this.name || this.phone}}</p>
            <p class="level">{{this.level_name}}</p>
          </div>
        </div>
        <div class="right order_type">
          <router-link :to="{path: '/trades',query:{status:'pay'}}" class="mb1 mr1">
            <span class="user_center_ico unpay_ico"></span>
            <p>{{ $t('message.user_center.payment') }}&nbsp;{{pay_amount}}</p>
          </router-link>
          <router-link :to="{path: '/trades',query:{status:'ship,audit'}}" class="mb1 mr1">
            <span class="user_center_ico unship_ico"></span>
            <p>{{ $t('message.user_center.deliverGoods') }}&nbsp;{{ship_amount}}</p>
          </router-link>
          <router-link :to="{path: '/trades',query:{status:'receive'}}" class="mr1">
            <span class="user_center_ico unrecive_ico"></span>
            <p>{{ $t('message.user_center.goodsReceipt') }}&nbsp;{{receive_amount}}</p>
          </router-link>
          <router-link :to="{path: '/trades',query:{status:'complete'}}">
            <span class="user_center_ico complete_ico"></span>
            <p>{{ $t('message.user_center.complete') }}&nbsp;{{complete_amount}}</p>
          </router-link>
        </div>
      </section>
      <section v-if="this.lengthP != 0" class="order_detail" style="margin-top: 15px;">
        <h1>{{ $t('message.user_center.examine') }}
          <router-link :to="{path: '/trades'}" class="right">{{ $t('message.user_center.allorder') }}&nbsp;<span class="go_ico"></span></router-link>
        </h1>
        <div v-for="(item,$index) in list1.trades">
          <div>
            <div class="order_title">
              <!--<div class="left <%= (val.location_id && val.location_id.id != 1  && val.location_id.id != 13) ? 'foreign' : '' %> flag_tag">
                <div class="user_center_ico logo_ico left"></div>
                <p class="left">内地发货</p>
              </div>-->
              <p class="left">{{ $t('message.trades_show.tradesnum') }}：<span>{{item.identifier}}</span></p>
              <p class="left">{{ $t('message.trades_show.time') }}：<span>{{item.created_at}}</span></p>
              <router-link :to="{path: '/trades_show',query:{id:item.trade_id,supplier_id:item.supplier_trade_id}}" target="_blank" class="right">
                <span class="user_center_ico detail_ico"></span>{{ $t('message.trades_show.xiangqing') }}
              </router-link>
            </div>
            <table class="prods_detail">
              <tr>
                <td>
                  <div class="prod_li" v-for="(units,$index) in item.units" :class="$index > 2? (proShow[index] ? '':'hidden'):'' ">
                    <router-link :to="{name:'show',params:{id:units.product_id}}" class="img_wrapper left" target="_blank">
                      <img :src="imgBaseUrl()+units.major_pic+'.m220.jpg'" :onerror="defaultImg(0)" alt="">
                    </router-link>
                    <div class="left prod_info">
                      <router-link :to="{name:'show',params:{id:units.product_id}}" class="name" target="_blank">{{units.name}}</router-link>
                      <div class="mearsure">
                        <span class="color">{{ $t('message.user_center.ordercolor') }}：{{units.sku_color}}</span>
                        <span class="size">{{ $t('message.user_center.ordersize') }}：{{units.sku_name}}</span>
                        <!--<p class="tax_rate">税率：</p>-->
                      </div>
                    </div>
                    <div class="left money">
                      <p>¥{{units.discount}}</p>
                    </div>
                    <p class="nums left"></p>
                    <p class="return_good left"></p>
                  </div>
                  <div v-if="item.units.length > 3? (!proShow[$index]):false" class="show_all" @click="ShowPro($index)">{{ $t('message.user_center.surplus') }}{{item.units.length-3}}{{ $t('message.user_center.several') }}<span class="arrow_ico"></span></div>
                </td>
                <td>
                  <p class="total_price">¥{{item.payment_price}}</p>
                  <p class="tax"></p>
                  <p class="delivery">{{ $t('message.user_center.freight') }}</p>
                </td>
                <td>
                  <p class="status" v-if="item.status == 'pay'">{{ $t('message.user_center.payment') }}</p>
                  <!--<p class="status" v-if="item.status == 'audit'">待审核</p>-->
                  <p class="status" v-if="item.status == 'ship' || item.status == 'audit' ">{{ $t('message.user_center.deliverGoods') }}</p>
                  <p class="status" v-if="item.status == 'receive'">{{ $t('message.user_center.goodsReceipt') }}</p>
                  <p class="status" v-if="item.status == 'complete'">{{ $t('message.user_center.complete') }}</p>
                  <p class="status" v-if="item.status == 'cancel'">{{ $t('message.trades.canceled') }}</p>
                  <p class="status" v-if="item.status == 'freezed'">{{ $t('message.trades.frozen') }}</p>
                </td>
                <td class="btns">
                  <router-link :to="{path: '/pay',query:{id:item.trade_id}}" class="btn right_now_pay">{{ $t('message.trades.Immediatepayment') }}</router-link>
                  <div class="btn cancel can_trade" @click="canTrade($index)">{{ $t('message.trades_show.notrades') }}</div>
                  <div class="del_title" v-if="n == $index">
                    <div class="arrow_up">
                      <em></em>
                      <span></span>
                    </div>
                    <div class="text_content">
                      <div class="fonts_del">{{ $t('message.user_center.cancelprompt') }}</div>
                      <div class="yes_no_button">
                        <div class="yes_button" @click="CancelOrder($index)">{{ $t('message.user_center.ensure') }}</div>
                        <div class="no_button" @click="noButton">{{ $t('message.user_center.cancel') }}</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
      <section class="command" style="margin-top: 20px;">
        <h1>{{ $t('message.user_center.promotion') }}</h1>
        <div class="prods">
          <!--<a target="_blank" class="prod left <%= k2 == 3 ? 'last' : '' %>" href="/products/<%= v2.id %>" title="<%= v2.name %>">-->
          <router-link v-for="item in listgoods" :to="{name:'show',params:{id:item.id}}" target="_blank" class="prod left" :key='item.id'>
            <div class="img_wrapper imghover" style="overflow: hidden;">
              <img :src="imgBaseUrl()+item.major_pic+'.m220.jpg'" :onerror="defaultImg(0)" alt="">
            </div>
            <div class="pro_info">
              <p class="name" style="height: 39px;">{{item.product_name}}</p>
              <p class="money">{{currency}}{{item.discount}}</p>
            </div>
          </router-link>
          <!--</a>-->
        </div>
      </section>
      <!--<form action="" method="">
      <label><input id="email_box" data-selector=<%= user_center.email_status %> name="setting[receive_promotion_email]" type="checkbox" value="" <%= user_center.email_status ? 'checked' : '' %>/>接收来自全球U选的邮件（包括活动邮件、代金券、到货通知邮件等）</label>
      <label class="mt10"><input id="sms_box" data-selector=<%= user_center.message_status %> name="setting[receive_promotion_sms_of_promote]" type="checkbox" <%= user_center.message_status ? 'checked' : '' %>  value="" />接收来自全球U选的短信（包括活动短信、提示短信等）</label>
      </form>-->
    </div>
    <footErs></footErs>
  </div>
</template>
<style scoped>
  *{margin: 0;padding: 0;}
  .hidden{
    display: none;
  }
</style>
<style lang="sass" scoped>
  @import "../../assets/sass/sass-statement.scss"
  @import "../../assets/sass/user_center/index.scss"
</style>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import normalHead from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import userSide from '../../components/assembly/userCenterSide.vue'
  import {imgBaseUrl,currency} from '../../../config/config'
  import i18n from '../../assets/js/il8n.js'

  export default {
    i18n,
    data() {
      return {
        index:'',
        list: [],      //用户信息
        list1: [],     //订单列表
        listgoods: [],  //品牌列表
        imgBaseUrl,      //图片域名
        currency,
        proShow: [],
        n: 1000,
        lengthP: -1,
        name: '',
        headimg: '',
        phone: '',
        level_name: '',
        Status: '',     //订单状态
        can_trade: false,       //取消订单
        ID:{
          user_id: '',
        },
        para: {
          page:1,
          per_page:5,
          keyword:'最新'
        },
        quantitylist: {},    //订单数量统计
        pay_amount: '',
        ship_amount: '',
        receive_amount: '',
        complete_amount: '',
      }
    },
    components: {
      headTop,
      normalHead,
      footErs,
      userSide
    },
    methods: {
      canTrade: function($index){    //显示取消订单
        this.n = $index;
//        this.can_trade = true;
      },

//      取消订单
      CancelOrder: function($index){
        var _this = this;
//      _this.can_trade = false;
        this.deleatTrade(_this.token(),_this.list1.trades[$index].trade_id,function(data){
          _this.n=null
          _this.GetTrade('pay');
        });
      },
      noButton: function(){     //隐藏取消订单
        this.n = null;
      },
//      展示剩下商品
      ShowPro: function(index){
        this.index = index;
        this.proShow[index] = true;
      },
//      订单列表
      GetTrade: function(sta){
        var _this = this;
        let paraTrade = {
          page:1,
          page_size:10,
          status: sta
        }
        this.getTrade(_this.token(),paraTrade,function(data){
          _this.list1 = data.data;
          _this.lengthP = _this.list1.total_amount;
          for(var i = 0;i<_this.lengthP;i++) {
            _this.proShow[i] = false
          }
        })
      }
    },
    mounted() {
      var _this = this;
//      用户详情
      this.userDetails(_this.token(),function(data){
        _this.list = data.data.auction_users;
        _this.name = _this.list.name;
        _this.headimg = _this.list.pic;
        _this.phone = _this.list.phone;
        _this.level_name = _this.list.level.name;
      })

//      订单列表 调用
      this.GetTrade('pay');

//      订单数量统计
      this.quantityTrade(_this.token(),function(data){
        _this.quantitylist = data.data;
        _this.pay_amount = _this.quantitylist.pay_amount;
        _this.ship_amount = _this.quantitylist.ship_amount;
        _this.receive_amount = _this.quantitylist.receive_amount;
        _this.complete_amount = _this.quantitylist.complete_amount;
      })

//      品牌列表
      this.goodsList(_this.para,function(data){
        _this.listgoods = data.data.products;
      })

//      获取id
      if(sessionStorage.getItem('user')){
        this.ID.user_id = JSON.parse(sessionStorage.getItem('user')).auction_user.id;
      }

      setTimeout(function(){
        //底部商品列表图片放大缩小
        $(".imghover").hover(function(){
          $(this).find("img").stop().animate({
            width: "100%"
          },1000)
        },function(){
          $(this).find("img").stop().animate({
            width: "90%"
          },1000)
        });
      })


      /*$('.logistics_empty').bind('click', function(){
        var id = $(this).parents('.logistics').data('id');
        window.location.href = '/trades/' + id;
      });
      $(".logistics").on("mouseover",function(){
        $(this).find(".logistics_layer").css("display","block")
      })
      $(".logistics").on("mouseout",function(){
        $(this).find(".logistics_layer").css("display","none")
      })

  //显示剩余
      $('.show_all').bind('click',function(){
        $(this).prevAll('.prod_li').removeClass('hide');
        $(this).addClass('hide');
      });

      $('.yes_button').bind('click',function(e){
        e.preventDefault();
        var id = $(this).data('id');
        app.cancel_trade(id, function(){
          window.location.reload();
        })
      });*/

    }
  }
</script>
