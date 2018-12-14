<template>
  <div>
    <topBar backShow="true" titleShow="true" :title="$t('confirmOrder.title')"></topBar>
    <div class="content">

      <router-link :to="{ path: '/choiceAddress'}" tag="div">
        <div class="container">
          <h6>{{$t('confirmOrder.receiveInfo')}}</h6>
          <div class="receive-detail">
            <p class="p1"><span class="receive-name">{{addressData.name}}</span>{{addressData.phone}}</p>
            <p>{{addressData.province}}{{addressData.city}}{{addressData.town}}{{addressData.address}}</p>
            <span class="icon-Arrow"></span>
          </div>
        </div>
      </router-link>
      <!-- 订单商品列表 -->
      <div class="goods-container">
        <h6>{{$t('confirmOrder.goodsList')}}</h6>
        <ul class="shopping-list">
          <li v-for="(item, index) in goodsData" @click.stop="goGoodsDetals(index)">
            <div class="img">
                <img :src="imgBaseUrl() + item.product_pic" alt="">
            </div>
            <div class="pro-info">
              <p class="pro-tit txt-cut">{{item.major_pic}}</p>
              <p class="pro-size">
                <span>{{item.sku.name}}</span>
                <span>{{item.product_color}}</span>
                <span class="pro-price" :class="{active: item.hasAbleVoucher == true || item.level.percent != ''}">{{money + item.discount}}</span>
              </p>
              <!-- 无可用优惠 -->
              <div class="discount-selector active" v-if="item.hasAbleVoucher == false && item.level.percent == ''" @click.stop>
                <span class="icon-plus"></span>
                <select class="discount-selector" name="" disabled="disabled">
                  <option :value="$t('confirmOrder.noPreferential')">{{$t('confirmOrder.noPreferential')}}</option>
                </select>
              </div>
              <!-- 有可用优惠 -->
              <div class="discount-selector" v-if="item.hasAbleVoucher == true || item.level.percent != ''" @click.stop>
                <span class="icon-plus"></span>
                <select class="discount-selector" name="" @change="change(index)" v-model="voucherSelected[index]">
                  <option :value="$t('confirmOrder.percent1')">{{$t('confirmOrder.percent1')}}</option>
                  <option v-if="isVipShow" :value="item.level.percent">{{$t('confirmOrder.percent2')}}{{item.level.percent + "%"}}</option>
                  <option v-if="optionItem.isselected==false" v-for="(optionItem, optionIndex) in item.voucher" :value="optionItem.id">{{optionItem.name}}</option>
                </select>
                <span class="discount-price">{{money + item.activePrice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 订单详情底部 -->
    <div class="bottom checkout">
      <div class="bottom-box">
        <div class="left">
          <p><span class="total-price">{{money + toTal}}</span></p>
          <p class="quantity">{{$t('confirmOrder.COD')}}<span>{{$t('confirmOrder.freightFree')}}</span></p>
        </div>
        <!-- 结算 -->
        <div class="right">
          <button @click="submit">{{$t('confirmOrder.submit')}}</button>
        </div>
        <!-- 已取消 -->
        <!-- <div class="right status">
          已取消
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import topBar from '../../components/topBar/topBar.vue'
  import {imgBaseUrl, money} from '../../config/config'
  import i18n from '../../config/i18n'
  export default {
    i18n,
    data() {
      return {
        imgBaseUrl,         //图片域名
        money,              //钱的单位
        id_Sku: [],  //商品id
        toTal: 0, //
        voucherSelected: [],  //被选中的优惠券id集合
        currentArr: [], //上一次被选中的优惠券id集合
        voucher: [],  //优惠券
        unit: [], //商品优惠信息清单（创建订单传参用）
        cart_id: [],
        goodsData: [], //清单商品
        addressData: {  //默认收货地址
          "name": this.$t('confirmOrder.noSet'),
          "phone": "",
          "address": this.$t('confirmOrder.noAdd')
        },
        isVipShow: false, //vip折扣是否显示
      }
    },
    methods: {
      goGoodsDetals: function(index){
        this.$router.push({name: 'goodsDetails', params:{goods_id: this.goodsData[index].product_id}})
      },
      change: function(index){
        this.unit = [];
        // 把总价清零重新计算
        this.toTal = 0
        var selectId = this.voucherSelected[index] //选中的优惠券id

        // 两次循环便利到每一个优惠券
        for (var i=0;i<this.goodsData.length;i++){

          // unit提交订单时候用
          this.unit.push({
                product_id: this.goodsData[i].product_id, //商品id
                voucher_id: '', //优惠券ID
                level_percent: '',  //折扣
                multibuy_id: '',  //连拍ID
                amount: '1',  //
                sku_id: this.goodsData[i].sku.id,  //skuid
                sku_name: this.goodsData[i].sku.name  //XL
              })


            // 如果有优惠券则继续循环
          if(this.goodsData[i].voucher.length!=0){

            var sign = false; //作为判断判断是否还有可选优惠券的标记
            for(var j=0;j<this.goodsData[i].voucher.length;j++){
              /*如果选择的是请选择折扣*/
              if(selectId == this.$t('confirmOrder.percent1')){
                // 上一次被选中的优惠券设为可用
                if(this.goodsData[i].voucher[j].id == this.currentArr[index]){
                  this.goodsData[i].voucher[j].isselected = false;
                }
                // 重新计划被选产品的优惠后价格
                this.goodsData[index].activePrice = this.goodsData[index].discount;

              /*如果选择的是使用vip折扣*/
              }else if(selectId == this.goodsData[i].level.percent){
                // 上一次被选中的优惠券设为可用
                if(this.goodsData[i].voucher[j].id == this.currentArr[index]){
                  this.goodsData[i].voucher[j].isselected = false;
                }
                // 重新计划被选产品的优惠后价格
                this.goodsData[index].activePrice = this.goodsData[index].discount * (1-this.goodsData[index].level.percent * 1/100);

              /*如果选择的是优惠券*/
              }else{
                // 上一次被选中的优惠券设为可用
                if(this.goodsData[i].voucher[j].id == this.currentArr[index]){
                  this.goodsData[i].voucher[j].isselected = false;
                }
                //新选中的优惠券设为不可用
                if(this.goodsData[i].voucher[j].id == selectId){
                  // 重新计算被选产品的优惠后价格
                  this.goodsData[i].voucher[j].isselected = true;
                  if (i == index) {
                    this.goodsData[index].activePrice = this.goodsData[index].discount-this.goodsData[index].voucher[j].amount;
                    this.goodsData[index].voucher[j].isselected = false;
                  };
                }
              }

              //如果这个商品的优惠券全部为不可选，则select变无可用优惠
              if(this.goodsData[i].voucher[j].isselected == false){
                sign = true;
                this.goodsData[i].hasAbleVoucher = true;
              }else{
                if (sign == false) {
                  this.goodsData[i].hasAbleVoucher = false;
                };
              }

            }
          }
          // 总价钱
          this.toTal += parseInt(this.goodsData[i].activePrice)
        }
        console.log(this.goodsData)
        this.unit[index].voucher_id=selectId
        this.currentArr[index] = this.voucherSelected[index]
        // console.log(this.unit)
      },
      submit: function(){
        var _this = this
        if (this.addressData.id != undefined){
          var crateParams = {
            cart_id: this.cart_id,
            contact_id: this.addressData.id,  //地址id
            delivery_time: "all", //送货时间
            delivery_phone: this.addressData.phone, //确认订单及发货通知使用
            units: JSON.stringify(this.unit)
          }
          this.crateOrder(this.token(), crateParams,function(data){
          _this.toast(_this.$t('confirmOrder.createOrder'))
          console.log(data)
          var orderId = data.data.id
          // 订单创建成功后跳到订单详情页面,
          _this.$router.replace({path:'/orderDetail', query:{orderId: orderId}})

          })
        }else{
          _this.toast(_this.$t('confirmOrder.noAdd'))
        }
      },
      // 获取默认地址
      defaultAddHttp: function(){
        var _this = this
        _this.getDefAddress(this.token(), function(data){
          if(data.data.auction_contacts != undefined){
            _this.addressData = data.data.auction_contacts
          }
        })
      }
    },
    mounted(){
      var _this = this

      // 获取默认地址
      _this.defaultAddHttp();

      //获取清单商品id;
      this.id_Sku={
        user_id: '',
        products: this.$route.query.id_Sku
      }

      //获取购物车id集合，创建订单参数用
      this.cart_id = this.$route.query.cart_id

      //获取清单商品
      this.confirmOrder(this.token(), this.id_Sku, function(data){
        data = data.data
        // data[1].voucher = [];
        _this.goodsData = data
        console.log(data)
        //存放已默认的优惠券id
        // var switchId=[111];
        //存放默认选中的产品和优惠券id,
        // var defaultArr = []

        for (var i=0;i<_this.goodsData.length;i++){
          _this.voucherSelected.push(_this.$t('confirmOrder.percent1'))
          _this.unit.push({
                product_id: _this.goodsData[i].product_id, //商品id
                voucher_id: '', //优惠券ID
                level_percent: '',  //折扣
                multibuy_id: '',  //连拍ID
                amount: '1',  //
                sku_id: _this.goodsData[i].sku.id,  //skuid
                sku_name: _this.goodsData[i].sku.name  //XL
              })

          //给所有产品添加自定义属性存放优惠后的价格，默认为原价
          _this.goodsData[i].activePrice = _this.goodsData[i].discount;
          // 给所有优惠券添加自定义属性isselected
          if(_this.goodsData[i].voucher.length!=0){
            //添加自定义属性是否还有可选优惠券
            _this.goodsData[i].hasAbleVoucher = true;
            for(var j=0;j<_this.goodsData[i].voucher.length;j++){
              //单个优惠券是否被选中
              _this.goodsData[i].voucher[j].isselected = false;
            }
          }else {
            //添加自定义属性是否还有可选优惠券
            _this.goodsData[i].hasAbleVoucher = false;
          }
          // _this.goodsData[i].level.percent = 2
          // 如果有等级优惠，则取出优惠百分比，并改变优惠后价钱
          if(_this.goodsData[i].level.percent != ""){
            _this.isVipShow = true;
          //如果没有等级优惠，有优惠券，则取出优惠券为默认选项
          }else if(_this.goodsData[i].level.percent == "" && _this.goodsData[i].voucher.length!=0){

          }
          //总价钱
          _this.toTal += parseInt(_this.goodsData[i].activePrice)
        }
      })
      this.checkLogin();
    },
    components: {
      topBar
    }
  }
</script>
