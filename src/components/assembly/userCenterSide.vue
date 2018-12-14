<template>
  <div>
    <!-- 个人中心 -->
    <div class="left user_mode">
      <div class="title">{{ $t('message.user_center.user') }}</div>
      <router-link :to="{path:'/user_center'}" :class="{'active':active('/user_center')}"><span class="user_center_ico user_ico"></span>{{ $t('message.user_center.account') }}</router-link>
      <router-link :to="{path:'/trades'}" :class="{'active':active('/trades')}"><span class="user_center_ico order_ico"></span>{{ $t('message.user_center.order') }}</router-link>
      <router-link :to="{path:'/vouchers'}" :class="{'active':active('/vouchers')}"><span class="user_center_ico chit_ico"></span>{{ $t('message.user_center.vouchers') }}</router-link>
      <!--<a href="" class="hide"><span class="user_center_ico gift_ico"></span>我的礼品卡</a>-->
      <router-link :to="{path:'/contacts'}" :class="{'active':active('/contacts')}"><span class="user_center_ico addr_ico"></span>{{ $t('message.user_center.contacts') }}</router-link>
      <!--<a href="" class="hide"><span class="user_center_ico mear_ico"></span>我的尺码</a>-->
      <!--  <a href="/user_center/updata" class="<%= type == 'user_info' ? 'active' : '' %>"><span class="user_center_ico mear_ico"></span>账户信息</a> -->
      <router-link :to="{path:'/change_password'}" :class="{'active':active('/change_password')}"><span class="user_center_ico psw_ico"></span>{{ $t('message.user_center.passWord') }}</router-link>
      <!-- <a href="/tiny_score" class="<%= type == 'tiny_score' ? 'active' : '' %>"><span class="user_center_ico Calculus_ico"></span>微集分</a> -->
    </div>
  </div>
</template>
<script>
  import i18n from '../../assets/js/il8n.js'

  export default {
    i18n,
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
      active:function (urlpath) {
        return this.$route.path==urlpath
      }

    },
    mounted() {

    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/user_center/orders.scss"
</style>
<style type="text/css" scoped>
  .user_center_ico:hover{
    background-image: url('~@/assets/images/new-img/new.png') !important;
    background-size: 800px 353px;
  }
  .user_mode a.active {
    background: #BB1E7B;
    color: #fff;
  }
  .Calculus_ico{
    width: 17px;
    height: 16px;
    display: inline-block;
    background: url('~@/assets/images/new-img/moren.png')!important;
    background-size: 17px 16px;
    z-index: 100;
  }
  .user_mode a.active .Calculus_ico{
    background: url("~@/assets/images/new-img/active_cal.png")!important;
    background-size: 17px 16px;
  }
  .user_mode a:hover .Calculus_ico{
    background: url("~@/assets/images/new-img/moren.png")!important;
  }
  .user_mode a.active:hover .Calculus_ico{
    background: url("~@/assets/images/new-img/active_cal.png")!important;
    background-size: 17px 16px;
  }
</style>
