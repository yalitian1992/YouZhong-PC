<template>
  <div>
    <headTop></headTop>
    <searchTop></searchTop>
    <div class="content mt40">
      <div class="main">
        <div class="content content_info">
          <div class="form_header">{{ $t('message.returnGoodFrom.title') }}</div>
          <div class="label_background">
            <label class="error first"> {{ $t('message.returnGoodFrom.textA') }}</label><br><br>
            <label v-if="paytype == 'express'" class="error express">{{ $t('message.returnGoodFrom.textB') }}</label>
          </div>

          <div class="label_background hide">
            <label class="error first">{{ $t('message.returnGoodFrom.textC') }}</label>
          </div>
          <form class="form arrival_info" :class="{'paytypes':paytype == 'express'}">
            <ul v-if="paytype == 'express'">
              <li class="receiver_name">
                <span class="pre_title">*</span>&nbsp;{{ $t('message.returnGoodFrom.name') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input class="name_input border_input" height="30px" name="return_name" maxlength="20" v-model="userInfo.return_name"/>
              </li>
              <li class="phone">
                <span class="pre_title">*</span>&nbsp;{{ $t('message.returnGoodFrom.phone') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input class="border_input" height="30px" name="return_phone" maxlength="11" v-model='userInfo.return_phone'/>
              </li>
              <li class="detail_address">
                <span class="pre_title">*</span>&nbsp;{{ $t('message.returnGoodFrom.Address') }}&nbsp;&nbsp;&nbsp;
                <label class="lbl_select state_label">
                  <select class="select_box province" name="province" v-model="countryNum" @change="checkCountry">
                    <option value="">{{ $t('message.createAddress.province') }}</option>
                    <option v-for="(country,index) in counObj.provinces" :value="index+1" >{{country.name}}</option>
                  </select>
                </label>
                <label class="lbl_select state_label">
                  <select class="select_box city" name="city" v-model="cityNum" @change="checkCity">
                    <option value="">{{ $t('message.createAddress.city') }}</option>
                    <option v-for="(city,index) in cityObj" :value="index+1" @change="">{{city.name,index}}</option>
                  </select>
                </label>&nbsp;&nbsp;&nbsp;
              </li>
              <li class="postcode">
                <span class="pre_title">*</span>&nbsp;{{ $t('message.returnGoodFrom.bank') }}&nbsp;&nbsp;&nbsp;
                <input class="border_btm_input" height="30px" name="return_branch" maxlength="100" v-model="userInfo.return_branch"/>
              </li>
              <li class="bank_card">
                <span class="pre_title">*</span>&nbsp;{{ $t('message.returnGoodFrom.banknum') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input class="border_btm_input" height="30px" name="return_account" maxlength="30" v-model="userInfo.return_account"/>
              </li>
            </ul>
            <ul v-else>
              <li class="phone">
                <span class="pre_title">*</span>&nbsp;{{ $t('message.returnGoodFrom.phone') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input class="border_input" height="30px" name="return_phone" maxlength="11" v-model='userInfo.return_phone'/>
              </li>
            </ul>
            <div class="button_area">
              <input class="submit save_btn" type="submit" :value="$t('message.returnGoodFrom.add')">
            </div>
          </form>
        </div>
        <div class="content know_info">
          <div class="form_header">{{ $t('message.returnGoodFrom.notice') }}</div>
          <div class="know_fonts">
            {{ $t('message.returnGoodFrom.noticeText') }}
          </div>
          <div class="know_title">
            {{ $t('message.returnGoodFrom.noticeTextb') }}
          </div>
          <div class="know_fonts">
            {{ $t('message.returnGoodFrom.noticeTextC') }}
          </div>
          <div class="know_fonts">
            {{ $t('message.returnGoodFrom.noticeTextD') }}<router-link :to="{path: '/index'}" style="color: #BB1E7B">www.ihaveu.com</router-link>{{ $t('message.returnGoodFrom.noticeTextE') }}<router-link :to="{path: '/index'}" style="color: #BB1E7B">www.ihaveu.com</router-link>{{ $t('message.returnGoodFrom.noticeTextF') }}
          </div>

          <div class="know_fonts know_last_fonts">
            {{ $t('message.returnGoodFrom.noticeTextH') }}{{telephone}}{{ $t('message.returnGoodFrom.noticeTextG') }}
          </div>
        </div>
      </div>

    </div>
    <footErs></footErs>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import searchTop from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import {telephone} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        paytype:'',
        telephone,
        userInfo:{
          "supplier_trade_id": 1,//供应商订单ID
          "id": 1,
          "return_name": '',//退款人
          "return_phone": '',//退款电话
          "return_province": '',//退款省份
          "return_city": '',//退款城市
          "return_branch": '',//退款支行
          "return_account": '',//退款帐号
          "payment_service": '',//支付类型
        },
        counObj:[],
        cityObj:[],
        countryNum:'',
        cityNum:'',
      }
    },
    components: {
      headTop,
      searchTop,
      footErs
    },
    methods: {
      checkCountry:function(){
        this.cityNum='';
        this.cityObj=[];
        if(this.countryNum){
          this.cityObj = this.counObj.provinces[Number(this.countryNum)-1].cities;
          this.userInfo.return_province =this.counObj.provinces[Number(this.countryNum)-1].name;
        }
      },
      checkCity:function(){
        if(this.cityNum){
          this.userInfo.return_city = this.cityObj[Number(this.cityNum)-1].name;
        }
      },
    },
    mounted() {
      var _this = this;
      _this.paytype = _this.$route.query.paytype;
      _this.provincesCities(function(responce){
        _this.counObj = responce.data.auction_contacts.countries[0];
      })
      _this.$nextTick(function(){
        $('.form').validate({
          rules: {
            return_phone: {
              required: true,
              minlength: 11,
              digits: true
            },
            return_provice: {
              required: function(){
                return $('.form').hasClass('paytypes');
              }
            },
            return_city: {
              required: function(){
                return $('.form').hasClass('paytypes');
              }
            },
            return_branch: {
              required: function(){
                return $('.form').hasClass('paytypes');
              }
            },
            return_name: {
              required: function(){
                return $('.form').hasClass('paytypes');
              }
            },
            return_account: {
              required: function(){
                return $('.form').hasClass('paytypes');
              }
            }
          },
          messages: {
            return_phone: {
              required: _this.$t('message.forgetPassword.phoneNull'),
              minlength: _this.$t('message.forgetPassword.rulesPhones'),
              digits: _this.$t('message.forgetPassword.rulesPhones')
            },
            return_provice: {
              required: _this.$t('message.createAddress.rulesProvince')
            },
            return_city: {
              required: _this.$t('message.createAddress.rulesProvince')
            },
            return_branch: {
              required: _this.$t('message.returnGoodFrom.backbranch')
            },
            return_name: {
              required: _this.$t('message.returnGoodFrom.backPre')
            },
            return_account: {
              required: _this.$t('message.returnGoodFrom.backCard')
            }
          },
          submitHandler: function(){
            _this.userInfo.supplier_trade_id = _this.$route.query.supplier;
            _this.userInfo.id = _this.$route.query.unitId;
            _this.userInfo.payment_service = _this.paytype;
            _this.returnGoods(_this.token(),_this.userInfo,function(responce){
              _this.$router.push({path: '/return_goodShow', query: {unitId: _this.$route.query.unitId}});
            })
          },
          errorPlacement: function(error, element) {
            if (element.hasClass('select_box')) {
              error.appendTo(element.parent().parent());
            } else {
              error.appendTo(element.parent());
            }
          }
        });
      })

    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/return_good/returnship"
</style>
<style type="text/css" scoped>
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video{
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }
  .textarea{
    line-height:24px;
    width: 300px;
    height:100px;
    border: 1px solid;
    border-color: #CCC;
    padding: 0 5px;
    vertical-align: top;
    resize: none;
  }
</style>
