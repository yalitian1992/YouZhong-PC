<template>
  <div>
    <headTop></headTop>
    <searchTop :Buy="Buy"></searchTop>
    <!--overseas-->
    <form class="content w970">
      <h1 style="padding-left: 20px;">{{ $t('message.trader_createL.title') }}</h1>
      <section style="margin-top: 20px">
        <h2 style="border-bottom: solid 1px #DDDDDD;padding-left: 20px; ">{{ $t('message.trader_createL.name') }}</h2>
        <div class="addrlist">
          <ul>
            <li v-for="(contact,index) in address" :class="index>0?show?'': 'hide':''">
              <div class="left title" :class="index == 0 ? 'active': ''" @click="changeAddress(contact.id)">
                {{contact.is_default ? $t('message.trader_createL.def') : contact.name + ' ' + contact.province}}
                <span class="product_ico sel_ico"></span>
              </div>
              <p class="name left">{{ contact.name }}</p>
              <p class="addr left">
                {{ contact.province }}－{{ contact.city }}－{{ contact.town }}&nbsp;{{ contact.address }}</p>
              <p class="tel left">{{ contact.phone}}</p>
              <div class="options">
                <p class="set_default" @click="checkAddress(contact.id)" v-if="!contact.is_default">{{ $t('message.trader_createL.checkAddress') }}</p>
                <router-link :to="{path:'/contacts_update',query:{id:contact.id,path:$route.path,msg:$route.query}}" class="modify">{{ $t('message.trader_createL.midify') }}</router-link>
                <p class="delete_addr" @click="delAddress(contact.id)">{{ $t('message.trader_createL.del') }}</p>
              </div>
            </li>
          </ul>
          <p class="left show_all" @click="showAll(show)" :class="show ? 'up': 'down'"><span
            class="txt">{{show ? $t('message.trader_createL.littleAddress') : $t('message.trader_createL.moreAddress')}}</span>&nbsp;<span class="ico"></span></p>
          <router-link class="right add_new" :to="{path:'/contacts_create',query:{path:$route.path,msg:$route.query}}"><span class="ico"></span>&nbsp;{{ $t('message.trader_createL.addAddress') }}</router-link>
        </div>
      </section>
      <section style="margin-top: 20px">
        <h2 style="border-bottom: solid 1px #DDDDDD;padding-left: 20px; ">{{ $t('message.trader_createL.mode') }}</h2>
        <div class="send_method">
          <p class="left title">{{ $t('message.trader_createL.time') }}</p>
          <label class="lbl_select left">
            <select name="delivery_time" v-model="postmsg.delivery_time">
              <option value="all">{{$t('message.trader_createL.all')}}</option>
              <option value="workday">{{$t('message.trader_createL.workday')}}</option>
              <option value="playday">{{$t('message.trader_createL.playday')}}</option>
            </select>
          </label>
          <p class="left mr25">{{$t('message.trader_createL.order')}}</p>
          <input type="radio" class="radio left" name="tel_radio" value="user" v-model="radioUser"
                 @change="radioChange">
          <p class="left mr20">{{$t('message.trader_createL.phone')}}</p>
          <input type="radio" class="radio left delivery_phone" name="tel_radio" value="other" v-model="radioUser">
          <p class="left">{{$t('message.trader_createL.phone2')}}</p>
          <input type="text" class="telinput left" name="delivery_phone" maxlength="11"
                 :disabled="radioUser == 'other' ? false : true" v-model="postmsg.delivery_phone" @blur="phoneverifys">
          <label id="delivery_phone-error" class="error" v-if="phoneverify">{{phoneverify}}</label>
        </div>
      </section>
      <h1 class="mt28" style="border-bottom: solid 1px #DDDDDD; padding-left: 20px;">{{$t('message.trader_createL.product')}}<p
        class="right"></p></h1>
      <section>
        <h2 class="pd0">
          <p class="left title">{{$t('message.trades_show.product2')}}</p>
          <p class="left price">{{$t('message.trades_show.price')}}</p>
          <p class="left discount">{{$t('message.trades_show.total')}}</p>
          <p class="left total">{{$t('message.trades_show.total2')}}</p>
        </h2>

        <ul class="prods_all">

          <li class="product" v-for="(cart,index) in goodsData" :product_id="cart.product_id" :skuId="cart.sku.id"
              :skuName="cart.sku.name">
            <div class="img_wrapper left">
              <img alt="" :src="imgBaseUrl()+cart.product_pic+'.m220.jpg'" :onerror="defaultImg(0)" style="width:100%; height:100%">
            </div>
            <div class="left pro_info">
              <p class="name">{{ cart.product_name }}</p>
              <div class="pro_detail">
                <p class="mearsure">
                  <span class="color" v-if="cart.product_color">{{$t('message.show.color')}}：{{cart.product_color}}</span>
                  <span class="size bdl1" v-if="cart.sku.name">{{$t('message.show.size')}}：{{cart.sku.name}}</span>
                </p>
              </div>
            </div>
            <div class="price left">
              <p class="text">{{currency}}{{ cart.discount }}</p>
            </div>
            <div class="discount left" style="display: block;height: 20px;">
              <label class="lbl_select" v-if="cart.hasAbleVoucher == true || cart.level.percent != ''">
              	<select class="down_select" name="" id="" @change="change(index)" v-model="voucherSelected[index]">
                  <option value="none" selected="selected">{{$t('message.trader_createL.voucher')}}</option>
                   <option v-if="isVipShow[index] " :value="cart.level.percent" >{{$t('message.trader_createL.vip')}}{{cart.level.percent + "%"}}</option>
                 	<option v-if="optionItem.isselected==false" v-for="(optionItem, optionIndex) in cart.voucher" :value="optionItem.id">{{optionItem.name}}</option>
               </select>
              </label>
              <label class="lbl_unselect"  v-if="cart.hasAbleVoucher == false && cart.level.percent == ''">{{$t('message.trader_createL.unvoucher')}}</label>
            </div>
            <div class="sum_money left">
              <p class="h_price">{{currency}}{{ cart.activePrice}}</p>
            </div>
          </li>
        </ul>
        <div class="remark">
          {{$t('message.trader_createL.remarks')}}<input type="text" :placeholder="$t('message.trader_createL.message')" maxlength='50' v-model="postmsg.comment">
        </div>
      </section>
      <section class="last_part">

        <div class="bottom_part clearfix">
          <div class="clearfix">
            <div class="right">
              {{$t('message.trader_createL.totalPro')}}<span class="total_num" style="color:#BB1E7B;">{{carts.length}}</span>{{$t('message.trades_show.total')}}:{{pretoTal1}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('message.trades_show.total2')}}<span
              class="delivery_cost"></span>：<span class="total_price" style="color:#BB1E7B;font-size:22px;">{{toTal}}</span>
            </div>
          </div>
          <div class="clearfix mt15">
            <div class="agree_row right">
              <input type="checkbox" class="checkbox_input" v-model="checked"><span class="hasRead">{{$t('message.trader_createL.Read')}}</span>
              <router-link :to="{path:'/ruhegoumai'}" target="_blank">{{$t('message.trader_createL.buy')}}</router-link>
              <span class="all_items">{{$t('message.trader_createL.ruler')}}</span>
            </div>
          </div>
          <router-link :to="{path:'/carts'}" class="left back_cart">{{$t('message.trader_createL.goCarts')}}</router-link>
          <input class="submit right" type="button" :class="{unable :!checked}" :value="$t('message.trader_createL.total3')" @click="submit">
        </div>
      </section>
    </form>
    <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
    <footErs></footErs>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import searchTop from '../../components/assembly/shop_header.vue'
  import footErs from '../../components/assembly/foot.vue'
  import nav from './test.json'
  import {imgBaseUrl,currency} from '../../../config/config'
  import alertBox from '../../components/assembly/alert_box.vue'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        Buy: 2,
        carts: {},
        check: true,
				id_Sku: [],  //商品id
        toTal: 0, //
        pretoTal:0,//优惠金额
        pretoTal1:0,
        voucherSelected: [],  //被选中的优惠券id集合
        currentArr: [], //上一次被选中的优惠券id集合
        voucher: [],  //优惠券
        unit: [], //商品优惠信息清单（创建订单传参用）
        cart_id: [],
        radioUser: 'user',
        goodsData: [], //清单商品
        discounts: [], //select value
        count: [],
        indexArr: [],
        Total: 0,
        pricArr: [],
        vouchers_list: {},
        subtotal: "",
        idList: [],
        idList2: [],
        address: [],
        addressdisable: [],
        show: false,
        price: '',
        checked: true,
        phoneverify: '',
        imgBaseUrl,
        currency,
        isVipShow: [], //vip折扣是否显示
        postmsg: {
          contact_id: '',
          cart_id:'',
          delivery_phone: '',
          delivery_time: 'all',
          comment: '',
          units:''
        },
        units: [
          {
            product_id: "",
            voucher_id: '',
            level_percent: '',
            multibuy_id: '',
            amount: 1,
            sku_id: 0,
            sku_name: '',
          }
        ],
        alertText:"",
        alertShow:false,
        selectShow:[]
      }
    },
    components: {
      headTop,
      searchTop,
      footErs,
      alertBox
    },
    methods: {
      changeAddress: function (id) {
        this.postmsg.contact_id = id
        let addressBox = [];
        for (let i = 0; i < this.addressdisable.length; i++) {
          addressBox[i] = this.addressdisable[i];
        }
        for (let i = 0; i < addressBox.length; i++) {
          if (addressBox[i].id == id) {
            let check = addressBox[i];
            addressBox.splice(i, 1)
            addressBox.unshift(check)
            break;
          }
        }
        this.address = addressBox;
        this.show = !this.show;
      },
      delAddress: function (id) {
        var _this = this;
        this.deleteSave(_this.token(),id, function () {
          _this.alertText = _this.$t('message.trader_createL.delSuccess');
          _this.alertShow = true;
          _this.addressList()
        })
      },
      checkAddress: function (id) {
        var _this = this;
        this.setDefAddress(_this.token(),id, function () {
          _this.alertText = _this.$t('message.trader_createL.defaddress');
          _this.alertShow = true;
          _this.addressList()
        })
      },
      addressList: function () {
        var _this = this;
        this.saveList(_this.token(),{page: 1,per_page: 10000},function (respones) {
          if(respones.data.auction_contacts.length <=0){
            _this.$router.replace({path: '/contacts_create', query: {url:_this.$route.path,msg:_this.$route.query}})
          }else{
            _this.addressdisable = respones.data.auction_contacts;
            _this.address = respones.data.auction_contacts;
            _this.postmsg.contact_id = _this.address[0].id
          }
        })
      },
      showAll: function (msg) {
        this.show = !msg;
      },
      phoneverifys: function () {
        var reg = /^1[34578]\d{9}$/;
        if (!reg.test(this.postmsg.delivery_phone) || this.postmsg.delivery_phone.length < 11) {
          this.phoneverify = this.$t('message.forgetPassword.rulesPhones')
        } else {
          this.phoneverify = ""
        }
      },
      radioChange: function () {
        this.phoneverify = "";
        this.postmsg.delivery_phone = ""
      },
      change: function(index){
        // 把总价清零重新计算
        this.toTal = 0
        var selectId = this.voucherSelected[index] //选中的优惠券id

        // 两次循环遍历到每一个优惠券
        for (var i=0;i<this.goodsData.length;i++){
          // unit提交订单时候用
           // 如果有优惠券则继续循环
          if(this.goodsData[i].voucher.length!=0){

            var sign = false; //作为判断判断是否还有可选优惠券的标记
            for(var j=0;j<this.goodsData[i].voucher.length;j++){
              /*如果选择的是请选择折扣*/
              if(selectId == 'none'){
                // 上一次被选中的优惠券设为可用
                if(this.goodsData[i].voucher[j].id == this.currentArr[index]){
                  this.goodsData[i].voucher[j].isselected = false;
                }
                // 重新计划被选产品的优惠后价格
                this.goodsData[index].activePrice = this.goodsData[index].discount;

              /*如果选择的是使用vip折扣*/
              }else if(selectId == this.goodsData[i].level.percent){
              	//this.unit[i].level_percent=this.goodsData[i].level.percent
                // 上一次被选中的优惠券设为可用
                if(this.goodsData[i].voucher[j].id == this.currentArr[index]){
                  this.goodsData[i].voucher[j].isselected = false;
                }
                // 重新计划被选产品的优惠后价格

                this.goodsData[index].activePrice = this.twoInt(this.goodsData[index].discount * (1-this.goodsData[index].level.percent * 1/100));

        				this.unit[index].voucher_id=''
        				this.unit[index].level_percent=selectId
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

        				this.unit[index].level_percent=''
        				this.unit[index].voucher_id=selectId
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
          }else{
          	if(selectId == 'none'){

        		 this.goodsData[index].activePrice = this.goodsData[index].discount;
	        	}
	        	if(selectId == this.goodsData[i].level.percent){
	        		this.goodsData[index].activePrice = this.twoInt(this.goodsData[index].discount * (1-this.goodsData[index].level.percent * 1/100));
	        		this.unit[index].voucher_id=''
	        		this.unit[index].level_percent=selectId
	        	}
          }
          // 总价钱
          this.toTal += Math.floor(this.goodsData[i].activePrice)
          this.pretoTal1=this.pretoTal-this.toTal
        }

        this.currentArr[index] = this.voucherSelected[index]

//      for(var i=0;i<this.voucherSelected.length;i++){
//      	if(this.voucherSelected[i]!='none'){
//      		if(this.unit[i]!=undefined){
//      			this.unit[i].voucher_id=this.voucherSelected[i]
//      		}
//
//      	}
//
//      }


      },
      submit: function () {
        if (this.radioUser == 'other' && !this.postmsg.delivery_phone) {
          this.phoneverify = this.$t('message.forgetPassword.rulesPhone')
          return
        } else if (this.phoneverify || !this.checked || !(this.unit[0])) {
          return
        }else {
          var _this = this;
          _this.postmsg.cart_id = _this.$route.query.carts;
          _this.postmsg.units = JSON.stringify(_this.unit);
					_this.creatTrade(_this.token(), _this.postmsg,function(respones){
            if(respones.status == 200){
              _this.$router.replace({path: '/pay', query: {id: respones.data.id}});
            }else if(respones.status == 403) {
              _this.goToLogin();
            }else{
              _this.alertText = respones.msg;
              _this.alertShow = true;
            }
          })
        }
      }
    },
    mounted() {
      var _this = this;
      var arr = [];
      _this.addressList();
      _this.productsList(_this.token(),{products:_this.$route.query.ids}, function (respones) {
        _this.goodsData = respones.data
        _this.goodsData.map((val, key) => {
          _this.voucherSelected.push('none')
        })
         //存放已默认的优惠券id
        var switchId=[111];
        //存放默认选中的产品和优惠券id,
        var defaultArr = []
         for (var i=0;i<_this.goodsData.length;i++){

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
          // 如果商品价格低于vip折扣最低限额， 则把此vip折扣设为零
            if(_this.goodsData[i].discount <= _this.goodsData[i].level.limitation){
              _this.goodsData[i].level.percent = 0;
              _this.isVipShow[i] = false;
            }
          // 如果有等级优惠，则取出优惠百分比，并改变优惠后价钱

          if(_this.goodsData[i].level.percent != ""){
          	_this.isVipShow[i] = true;
//	          /_this.voucherSelected.push(_this.goodsData[i].level.percent)
//          _this.goodsData[i].activePrice = _this.goodsData[i].discount * (1-_this.goodsData[i].level.percent * 1/100);
          //如果没有等级优惠，有优惠券，则取出优惠券为默认选项
          }else if(_this.goodsData[i].level.percent == "" && _this.goodsData[i].voucher.length!=0){

          }else{  //既没有等级优惠，也没有优惠券
            _this.voucherSelected.push(0)
          }
          if(_this.goodsData[i].voucher.length==0){
          	_this.selectShow[i]=false
          }else{
          	_this.selectShow[i]=true
          }
          //总价钱
          _this.toTal += parseInt(_this.goodsData[i].activePrice)
          _this.pretoTal=_this.toTal
        }
        // 如果没有vip等级优惠但有优惠券是执行
        // 再次循环使已默认选中的选项在其他选项中不显示
        // 其他的这项都要变成false
      })
    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/trades/create"
</style>
<style type="text/css" scoped>
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s,samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }

  select::-ms-expand {
    display: none;
  }

  .down_select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
  }

  .lbl_select {
  }
</style>
