<template>
  <div>
    <headTop></headTop>
    <normalHead></normalHead>
    <div style="height: 40px;"></div>
    <div class="content mt40">
      <userSide></userSide>
      <div class="right w970" style="margin-bottom: 70px;">
        <div class="header">
          <p class="left protitle">{{ $t('message.trades.product') }}</p>
          <p class="left pricetitle">{{ $t('message.trades.price') }}</p>
          <!--<p class="left numtitle">数量</p>-->
          <p class="left w113">{{ $t('message.trades.goPrice') }}</p>
          <div class="left w113 order_status">
            <p v-model="selected" @mouseenter="select_ul=true" @mouseleave="select_ul=false">{{selected}}<span class="status_ico"></span></p>
            <div class="ul" v-if="select_ul" @mouseenter="select_ul=true" @mouseleave="select_ul=false">
              <a v-for="(option,$index) in options" v-bind:value="option.value" :class="{'active':option.active,'unactive':!option.active}" @click="Select(option,$index,option.status)">{{option.text}}</a>
            </div>
          </div>
          <p class="left w113">{{ $t('message.trades.operation') }}</p>
        </div>
        <div class="clearfix">
          <div v-for="(item,index1) in list.trades">
              <div class="order_title">
                <p class="left">{{ $t('message.trades_show.tradesnum') }}：<span>{{item.supplier_trade_identifier?item.supplier_trade_identifier:item.identifier}}</span></p>
                <p class="left">{{ $t('message.trades_show.time') }}：<span>{{item.created_at}}</span></p>
                <router-link :to="{path: '/trades_show',query:{id:item.trade_id,supplier_id:item.supplier_trade_id}}" target="_blank" class="right detail">
                  <span class="user_center_ico detail_ico"></span>{{ $t('message.trades_show.xiangqing') }}
                </router-link>
              </div>
              <table class="prods_detail">
                <tr>
                  <td>
                    <div class="prod_li" v-for="(units,index2) in item.units"  :class="index2 > 2&& !proShow[index1]? 'hidden':''" >
                      <router-link :to="{name:'show',params:{id:units.product_id}}" class="img_wrapper left" target="_blank">
                        <img :src="imgBaseUrl()+units.major_pic+'.m220.jpg'" :onerror="defaultImg(0)" alt="">
                      </router-link>
                      <div class="left prod_info">
                        <router-link :to="{name:'show',params:{id:units.product_id}}" class="name" target="_blank">{{units.name}}</router-link>
                        <div class="mearsure">
                          <span class="color" >{{ $t('message.user_center.ordercolor') }}：{{units.sku_color}}</span>
                          <span class="size">{{ $t('message.user_center.ordersize') }}：{{units.sku_name}}</span>
                        </div>
                      </div>
                      <div class="left money">
                        <p> {{currency}}{{units.discount}}</p>
                      </div>
                      <p class="nums left"></p>
                      <span v-if="Clickable">
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == ''" class="reback left">
                        <span>{{ $t('message.trades.null') }}</span>
                      </router-link>
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == 'audit'" class="reback left">
                        <span>{{ $t('message.trades.audit') }}</span>
                      </router-link>
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == 'receive'" class="reback left">
                        <span>{{ $t('message.trades.returnreceive') }}</span>
                      </router-link>
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == 'complete'" class="reback left">
                        <span>{{ $t('message.trades_show.returnMomey') }}</span>
                      </router-link>
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == 'cancel'" class="reback left">
                        <span>{{ $t('message.trades.canceled') }}</span>
                      </router-link>
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == 'freezed'" class="reback left">
                        <span>{{ $t('message.trades.frozen') }}</span>
                      </router-link>
                      <router-link :to="{path: '/return_goodShow',query: {id: units.product_id}}" v-if="units.status == 'transfer'" class="reback left">
                        <span>{{ $t('message.trades.transfer') }}</span>
                      </router-link>
                    </span>
                      <span v-if="notClickable">
                      <p class="return_good left" v-if="units.status == ''">{{ $t('message.trades.null') }}</p>
                      <p class="return_good left" v-if="units.status == 'audit'"><span>{{ $t('message.trades.audit') }}</span></p>
                      <p class="return_good left" v-if="units.status == 'receive'"><span>{{ $t('message.trades.returnreceive') }}</span></p>
                      <p class="return_good left" v-if="units.status == 'complete'"><span>{{ $t('message.trades_show.returnMomey') }}</span></p>
                      <p class="return_good left" v-if="units.status == 'cancel'"><span>{{ $t('message.trades.canceled') }}</span></p>
                      <p class="return_good left" v-if="units.status == 'freezed'"><span>{{ $t('message.trades.frozen') }}</span></p>
                      <p class="return_good left" v-if="units.status == 'transfer'"><span>{{ $t('message.trades.transfer') }}</span></p>
                    </span>
                    </div>
                   <!-- <p>{{item.units.length > 3?true:false}}</p>-->
                    <div v-if="item.units.length > 3&& !proShow[index1]?true:false" class="show_all" @click="ShowPro(index1)">{{ $t('message.user_center.surplus') }}{{item.units.length-3}}{{ $t('message.user_center.several') }}<span class="arrow_ico"></span></div>
                  </td>
                  <td>
                    <p class="total_price">{{currency}}{{item.payment_price}}</p>
                    <p class="delivery">（{{ $t('message.user_center.freight') }}）</p>
                  </td>
                  <td>
                    <!--<p class="status" v-if="item.status == 'audit' ">待审核</p>-->
                    <p class="status" v-if="item.status == 'pay' ">{{ $t('message.user_center.payment') }}</p>
                    <p class="status" v-if="item.status == 'ship' || item.status == 'express' || item.status == 'audit' ">{{ $t('message.user_center.deliverGoods') }}</p>
                    <p class="status" v-if="item.status == 'receive' ">{{ $t('message.user_center.goodsReceipt') }}</p>
                    <p class="status" v-if="item.status == 'complete' ">{{ $t('message.user_center.complete') }}</p>
                    <p class="status" v-if="item.status == 'cancel' ">{{ $t('message.trades.canceled') }}</p>
                    <p class="status" v-if="item.status == 'freezed' ">{{ $t('message.trades.frozen') }}</p>
                    <p class="status" v-if="item.status == 'accept' ">{{ $t('message.trades.accept') }}</p>
                    <p class="status" v-if="item.status == 'reject' ">{{ $t('message.trades.reject') }}</p>
                  </td>
                  <td class="btns">
                    <!--待付款-->
                    <div v-if="item.status == 'pay'">
                      <router-link :to="{path: '/pay',query:{id:item.trade_id}}" class="btn right_now_pay" >{{ $t('message.trades.Immediatepayment') }}</router-link>
                      <div class="btn cancel can_trade" @click="canTrade(index1)">{{ $t('message.trades_show.notrades') }}</div>
                    </div>
                    <!--待发货-->
                    <div v-if="item.status == 'ship' || item.status == 'express' || item.status == 'audit'">
                      <router-link :to="{path: '/trades_show',query:{id:item.trade_id,supplier_id:item.supplier_trade_id}}" class="btn cancel logistics" ><span class="btn1" @mouseenter="Delivery(index1)" @mouseleave="XDelivery(index1)">{{ $t('message.trades.delivery') }}</span>
                        <div class="logistics_layer" v-if="m == index1" @mouseenter="Delivery(index1)" @mouseleave="XDelivery(index1)">
                          <div class="arrow">
                            <em></em>
                            <span></span>
                          </div>
                          <div class="tips_content">
                            <div class="logistics_tip active">
                              <p class="logistics_tip_round">●</p>
                              <div class="logistics_tip_text">
                                <p class="logistics_text">{{ $t('message.trades.deliverTip') }}</p>
                                <p>{{item.created_at}}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <!--待收货-->
                    <div v-if="item.status == 'receive'">
                      <router-link :to="{path: ''}" class="btn confirm_btn">
                        <span @click="Alert(item.supplier_trade_id)">{{ $t('message.trades.goodsOk') }}</span>
                      </router-link>
                      <router-link :to="{path: '/trades_show',query:{id:item.trade_id,supplier_id:item.supplier_trade_id}}" class="btn cancel logistics"><span class="btn1" @mouseenter="Delivery(index1)" @mouseleave="XDelivery(index1)">{{ $t('message.trades.delivery') }}</span>
                        <div class="logistics_layer" v-if="m == index1" @mouseenter="Delivery(index1)" @mouseleave="XDelivery(index1)">

                          <div class="arrow">
                            <em></em>
                            <span></span>
                          </div>
                          <div class="logistics_tips">
                            <div class="tips_top">
                              <p class="tips_name">{{delviy(delivery.delivery_service)}}</p>
                              <p class="tips_number">{{ $t('message.trades.waybill') }}：{{delivery.delivery_identifier}}</p>
                            </div>
                            <div class="tips_content" v-if="!delivery.delivery_service || DeliveryInfo.returnCode == 500">
                              <div v-for="item in list1" class="logistics_tip active">
                                <p class="logistics_tip_round">●</p>
                                <div class="logistics_tip_text">
                                  <p class="logistics_text">{{ $t('message.trades.deliverTip') }}</p>
                                  <p>{{item.ship_at}}</p>
                                </div>
                              </div>
                            </div>
                            <div v-else>
                              <div class="tips_content" v-for="(delInfo,index) in DeliveryInfo.data" v-if="(index<6) == true">
                                <div class="logistics_tip active">
                                  <p class="logistics_tip_round">●</p>
                                  <div class="logistics_tip_text">
                                    <p class="logistics_text">{{delInfo.context}}</p>
                                    <p>{{delInfo.time}}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div :class="{'hide':show_more}">
                              <div class="clearfix"></div>
                              <div class="tips_bottom">
                                <p>{{ $t('message.trades.more') }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <!--已完成-->
                    <div v-if="item.status == 'complete'">
                      <router-link :to="{path: '/trades_show',query:{id:item.trade_id,supplier_id:item.supplier_trade_id}}" class="btn cancel logistics"><span class="btn1" @mouseenter="Delivery(index1)" @mouseleave="XDelivery(index1)">{{ $t('message.trades.delivery') }}</span>
                        <div class="logistics_layer" v-if="show = (m == index1)" @mouseenter="Delivery(index1)" @mouseleave="XDelivery(index1)">
                          <div class="arrow">
                            <em></em>
                            <span></span>
                          </div>
                          <div class="logistics_tips">
                            <div class="tips_top">
                              <p class="tips_name">{{delviy(delivery.delivery_service)}}</p>
                              <p class="tips_number">{{ $t('message.trades.waybill') }}：{{delivery.delivery_identifier}}</p>
                            </div>
                            <div class="tips_content" v-if="!delivery.delivery_service || DeliveryInfo.returnCode == 500">
                              <div v-for="item in list1" class="logistics_tip active">
                                <p class="logistics_tip_round">●</p>
                                <div class="logistics_tip_text">
                                  <p class="logistics_text">{{ $t('message.trades.deliverTip') }}</p>
                                  <p>{{item.ship_at}}</p>
                                </div>
                              </div>
                            </div>
                            <div v-else>
                              <div class="tips_content" v-for="(delInfo,index) in DeliveryInfo.data" v-if="(index<6) == true">
                                <div class="logistics_tip active">
                                  <p class="logistics_tip_round">●</p>
                                  <div class="logistics_tip_text">
                                    <p class="logistics_text">{{delInfo.context}}</p>
                                    <p>{{delInfo.time}}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div :class="{'hide':show_more}">
                              <div class="clearfix"></div>
                              <div class="tips_bottom hide" :class="">
                                <p>{{ $t('message.trades.more') }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <!--已取消-->
                    <div v-if="item.status == 'cancel'"></div>
                    <!--已冻结-->
                    <div v-if="item.status == 'freezed'"></div>
                    <!--已接受-->
                    <div v-if="item.status == 'accept'"></div>
                    <!--已拒绝-->
                    <div v-if="item.status == 'reject'"></div>
                    <!--已返还-->
                    <div v-if="item.status == 'return'"></div>

                    <div class="del_title" v-if="n == index1">
                      <div class="arrow_up">
                        <em></em>
                        <span></span>
                      </div>
                      <div class="text_content">
                        <div class="fonts_del">{{ $t('message.user_center.cancelprompt') }}</div>
                        <div class="yes_no_button">

                          <div class="yes_button" @click="CancelOrder(index1)">{{ $t('message.user_center.ensure') }}</div>
                          <div class="no_button" @click="noButton">{{ $t('message.user_center.cancel') }}</div>
                        </div>
                      </div>
                    </div>
                    <!--<a href="/trades/<%= trade.id %>" class="btn confirm_btn" data-id="<%= trade.id %>">确认收货</a>-->

                    <!--<a href="/trades/<%= trade.id %>" data-id="<%= trade.id %>" class="btn cancel logistics">查看物流
                      <div class="logistics_layer">
                        <div class="arrow">
                          <em></em>
                          <span></span>
                        </div>
                        <div class="logistics_tips">
                          <div class="tips_top">
                            <p class="tips_name"><%= sails.config.delivery_name[trade.delivery_service]%></p>
                            <p class="tips_number">运单号：<%= trade.delivery_identifier %></p>
                          </div>
                          <div class="tips_content">

                          </div>
                          <div class="clearfix"></div>
                          <div class="tips_bottom hide">
                            <p>查看更多信息></p>
                          </div>
                        </div>
                      </div>
                    </a>-->
                  </td>
                </tr>
              </table>
            <!--</div>-->
          </div>
          <!--无记录状态-->
          <div class="noorder" v-if="noorder">
            <div class="bgimg"></div>
            <p>{{ $t('message.trades.nostatus') }}</p>
            <router-link :to="{path:'/index'}">{{ $t('message.trades.shop') }}</router-link>
          </div>
        </div>
      </div>
      <div class="pageV" v-if="showL">
        <v-pagination v-if="(!noorder)" :total="total" :current-page='current' :display="display" @pagechange="pagechange"></v-pagination>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>
<script>
  import Vue from 'vue'
  import headTop from '../../components/assembly/headTop.vue'
  import normalHead from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import userSide from '../../components/assembly/userCenterSide.vue'
  import pagination from '../../components/assembly/paging'
  import {imgBaseUrl,currency} from '../../../config/config'
  import i18n from '../../assets/js/il8n.js'

  export default {
    i18n,
    data() {
      return {
        listDeliv: [],
        n: null,
        m: null,
        total:10,
        current:1,
        display:10,
        cancelS: '', //取消订单后重新请求参数status
        lengthP: 100,
        paraTrade: {
          page:1,
          page_size:10,
          status: ''
        },
        confirmPara: {
          user_id: '1',
          supplier_trade_id: '',
        },
        status: '',  //订单状态
        imgBaseUrl,
        currency,
        list: [],
        list1: [],     //查看物流
        payment: '',
        show: false,  //物流提示框
        select_ul: false,
        selected: '',
        options: [
          {text: '全部订单',value: '0',status: {}},
          {text: '待付款',value: '1',status: 'pay'},
//          {text: '待审核',value: '2',status: 'audit'},
          {text: '待发货',value: '2',status: 'audit,ship'},
          {text: '待收货',value: '3',status: 'receive'},
          {text: '已完成',value: '4',status: 'complete'},
          {text: '已取消',value: '5',status: 'cancel'},
          {text: '已冻结',value: '6',status: 'freezed'},
          {text: '已接受',value: '7',status: 'accept'},
          {text: '已拒绝',value: '8',status: 'reject'},
          {text: '已返还',value: '9',status: 'return'}
        ],
        para: this.$route.query.status,  //地址栏获取订单状态
        Clickable: false,      //status状态可点击
        notClickable: true,       //status状态不可点击
        noorder:  false,
        showL: false,
        pro_length: 0,         //商品长度
        proShow: [],
        indexShow:'',
        hides:{
        	val1:[],
        	val2:[]
        },
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
        },
        DeliveryInfo:{},
        show_more: true
      }
    },
    components: {
      headTop,
      normalHead,
      footErs,
      userSide,
      'v-pagination': pagination
    },
    methods: {
//      本地存储
      storages: function(ss) {
        var alHttpData = ss
        sessionStorage.setItem('alHttpData', JSON.stringify(alHttpData));
      },

//       查看物流
      Delivery: function(index){
        this.DeliveryInfo = {};
        this.m = index;
        var _this = this;
        var alHttpData = JSON.parse(sessionStorage.getItem('alHttpData'))

//        _this.getTrade(_this.token(),_this.paraTrade,function(data){
          _this.listDeliv = alHttpData
          _this.delivery.supplier_trade_id = _this.listDeliv[index].supplier_trade_id
          _this.delivery.identifier = _this.listDeliv[index].identifier
          _this.delivery.delivery_service = _this.listDeliv[index].delivery_service
          _this.delivery.delivery_identifier = _this.listDeliv[index].delivery_identifier

        if(_this.delivery.delivery_service || _this.delivery.delivery_identifier){
          if(_this.listDeliv[index].status != 'pay'){
            _this.getDelivery(_this.token(),_this.delivery,function(res){
              _this.DeliveryInfo = res.data;

              console.log( _this.DeliveryInfo.status)
              if(_this.DeliveryInfo.data.length > 6){
                _this.show_more = false;
              };
            })
          }
        }

//        })
      },

      delviy:function(msg){
        for(var key in this.servesName){
          if(key == msg){
            return this.servesName[key]
          }
        }
      },

      XDelivery: function($index){
        this.m = null;
      },
      Select: function(item,val,stu){     //下拉列表
        this.select_ul = false;
        this.selected = this.options[val].text;
        this.options.forEach(function (item) {
          Vue.set(item,'active',false);
        });
        this.cancelS = stu;
//        this.current=1
//        this.pagechange(1,1)
        this.GetTrade(stu)
        Vue.set(item,'active',true);
      },
//      展示剩下商品
      ShowPro: function(index){
    		this.m = index;
        this.indexShow = index;
        this.proShow[index] = true;
        console.log(this.proShow)

      },
      Alert: function(tradeID){       //是否确认收货
        var _this = this
        _this.confirmPara.supplier_trade_id = tradeID;
        this.confirmTrade(_this.token(),_this.confirmPara,function(data){
          if(data.status == 200){
            _this.GetTrade();
          }
        })
      },
//      显示取消订单提示框
      canTrade: function($index){
        this.n = $index;
      },
//      隐藏取消订单提示框
      noButton: function(){
        this.n = null;
      },
//      取消订单
      CancelOrder: function($index){
        var _this = this;
        this.deleatTrade(_this.token(),_this.list.trades[$index].trade_id,function(data){
          _this.n=null
          _this.GetTrade(_this.cancelS);
        });
      },
//      分页
      pagechange: function(currentPage,idx) {
        this.current = currentPage
        this.paraTrade.page = currentPage;
        this.GetTrade(this.cancelS);
      },
//      订单列表
      GetTrade:function(status){
        var _this = this;
        _this.paraTrade.status = status;
        this.getTrade(_this.token(),_this.paraTrade,function(data){
          _this.list = data.data;
          console.log()
          _this.storages(_this.list.trades);
          _this.total=data.data.total_amount;
          _this.lengthP = _this.list.trades.length;
          for(var i = 0;i<_this.total;i++) {
            _this.proShow[i] = false
          }
          if(_this.total == 0){
            _this.noorder = true;
          }else{
            _this.noorder = false;
          }

          if(_this.total >= _this.display){
            _this.showL = true;
          }else{
            _this.showL = false;
          }
//        获取status传参
          if(_this.para == 'complete'){
            _this.Clickable = true;
            _this.notClickable = false;
          }
        });
      }
    },
    mounted() {

      if(this.para){
        this.GetTrade(this.para);
//        this.pagechange(this.paraTrade.page,this.para);
//        this.pagechange();
        if(this.para == 'pay'){
          this.selected = '待付款'
        }
        if(this.para == 'ship,audit'){
          this.selected = '待发货'
        }
        if(this.para == 'receive'){
          this.selected = '待收货'
        }
        if(this.para == 'complete'){
          this.selected = '已完成'
        }
      }else{
//        this.GetTrade()
        this.pagechange(this.paraTrade.page,'')
        this.selected = '全部订单'
      }


      //是否确认收货
        $('.confirm_btn').bind('click',function(e){
          e.preventDefault();
          alert(123);
          var id = $(this).data('id');
          if(confirm('是否确认收货？')){
            app.confirm_trade(id, function () {
              window.location.reload();
            });
          }
        });
        $('.logistics').bind('mouseenter', function(){
          var $this = $(this);
          $this.find('.tips_content').empty();
        });
        $('.logistics_empty').bind('click', function(){
          var id = $(this).parents('.logistics').data('id');
          window.location.href = '/trades/' + id;
        });
        if(sessionStorage.getItem('user')){
          this.confirmPara.user_id = JSON.parse(sessionStorage.getItem('user')).auction_user.id
        }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/sass-statement.scss"
  @import "../../assets/sass/user_center/orders.scss"
</style>
<style scoped>
  .return_good.left{
    float: right;
  }
  .hidden{
    display: none;
  }
  .content{
    position: relative;
  }
  .pageV{
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
