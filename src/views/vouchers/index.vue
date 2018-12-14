<template>
  <div>
    <headTop></headTop>
    <normalHead></normalHead>
    <div style="height: 40px;"></div>
    <div class="content mt40">
      <userSide></userSide>
      <div class="voucherList">
        <!--<div class="add_vou">
          <p>
            <span>添加代金券</span>
            <input type="text" name="add_vou" class="adds" v-model="vou.voucher.identifier" placeholder="请输入代金券兑换码" required="required">
            <b style="color: #fff" @click="add_Coupon">
              添加
            </b>
          </p>
        </div>-->
        <table class="aside" cellpadding="0" cellspacing="0">
          <tr>
            <th width="158px">{{ $t('message.vouchers.numbers') }}</th>
            <th width="230px">{{ $t('message.vouchers.name') }}</th>
            <th width="112px">{{ $t('message.vouchers.value') }}</th>
            <th width="200px">{{ $t('message.vouchers.condition') }}</th>
            <th width="148px">{{ $t('message.vouchers.time') }}</th>
            <th width="122px">{{ $t('message.vouchers.status') }}</th>
          </tr>
          <tr class="show" v-for="(item,index) in vouchersList" :class="{is_using:item.notUsed}">
            <td>{{item.id}}</td>
            <td>{{item.event.name}}</td>
            <td>{{item.event.amount}}</td>
            <td>{{item.event.limitation}}</td>
            <td>{{item.event.ended_at.slice(0,11)}}</td>
            <td>
              <span v-if="item.trade_id">已使用</span>
              <span v-else>
                <span v-if="(+new Date(item.event.ended_at) > +new Date())">未使用</span>
                <span v-else>已过期</span>
              </span>


              <!--<span v-if="item.trade_id">{{ $t('message.vouchers.yesused') }}</span>
              <span v-else="+new Date(item.event.ended_at) > +new Date()">{{ $t('message.vouchers.notused') }}</span>
              <span v-else>{{ $t('message.vouchers.used') }}</span>-->
            </td>
          </tr>
          <!--无优惠券-->
          <tr class="noshow" v-if="total == 0">
            <td colspan="6">
              <div class="error_show">
                <div class="error_img">
                  <img src="../../assets/images/vouchers/no_chit.png" width="118" height="61">
                </div>
                <div class="title">
                  {{ $t('message.vouchers.notcoupons') }}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <v-pagination v-if="Show" :total="total" :current-page='current' :display="display" @pagechange="pagechange"></v-pagination>
    <footErs></footErs>
    <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import normalHead from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import userSide from '../../components/assembly/userCenterSide.vue'
  import pagination from '../../components/assembly/paging'
  import alertBox from '../../components/assembly/alert_box.vue'
  import i18n from '../../assets/js/il8n.js'

  export default {
    i18n,
    data() {
      return {
        total: 0,      //记录总条数
        current: 1,    //当前页
        display: 10,     //每页显示条数
        alertText:"",
        alertShow:false,
        vouchersList: {},
        list1: [],    //兑换代金券
        identifier: '',     //兑换码
        vou:{
          voucher:{
            identifier:''
          }
        },
        Length: '',
        notUsed: false,
        para:{
          page: 1,    // 页数
          per_page: 10
        },
        Show: false
      }
    },
    components: {
      headTop,
      normalHead,
      footErs,
      userSide,
      'v-pagination': pagination,
      alertBox
    },
    methods: {
//      添加代金券
      /*add_Coupon: function(){
        var _this=this;
        if(_this.vou.voucher.identifier == ''){
          _this.alertShow = true;
          _this.alertText = "请输入兑换码！";
        }else{
          _this.addCoupon(_this.token(_this.$route.path,_this.$route.query),_this.vou,function(data){
            if(data.status == 200){
              _this.alertShow = true;
              _this.alertText = data.msg;
              _this.pagechange();
            }else{
              if(data.status == 601){
                _this.alertShow = true;
                _this.alertText = "兑换码不能为空！";
              }else{
                _this.alertShow = true;
                _this.alertText = data.msg;
              }
            }
          })
        }
      },*/
//      分页
      pagechange: function(currentPage) {
        this.current = currentPage
        this.para.page = currentPage
        var _this=this;
//      优惠券列表
        this.couponList(_this.token(),_this.para,function(data){
          _this.vouchersList=data.data.auction_vouchers;
          _this.Length = _this.vouchersList.length

          _this.total = data.data.total;
          if(_this.total >=_this.display){
            _this.Show = true
          }else{
            _this.Show = false
          }

          for (let i = 0, len = _this.Length; i < len; i++) {
            if ((+new Date() > +new Date(_this.vouchersList[i].event.ended_at)) || _this.vouchersList[i].trade_id) {
              _this.vouchersList[i].notUsed = true;
            } else {
              _this.vouchersList[i].notUsed = false;
            }
          }
        })
      },
    },
    mounted() {
      this.pagechange(this.para.page);
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/sass-statement.scss"
  @import "../../assets/sass/vouchers/index.scss"
</style>
<style type="text/css" scoped>
  /*.add_vou{
    width: 970px;
    height: 150px;
    background: #fff;
    margin-bottom: 20px;
    padding-left: 20px;
  }
  .add_vou p{
    line-height: 150px;
    position: relative;
  }
  .add_vou p span{
    color: #666;
    margin-right: 10px;
  }
  .add_vou p input{
    width: 305px;
    height: 36px;
    border: solid 1px #cecece;
    padding-left: 8px;
  }
  .add_vou p b{
    width: 118px;
    height: 36px;
    display: inline-block;
    background: #BB1E7B;
    text-align: center;
    line-height: 36px;
    color: #FFF;
    border: none;
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    top: 60px;
    left: 410px;
    border-radius: 10px;
  }*/

</style>

