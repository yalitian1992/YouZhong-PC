<template>
  <div class="login_head">
    <router-link :to="{path:'/index'}">
      <span class="ico platform_logo" style="background-image: none;">
        <img src="../../assets/images/LOGO.png" alt="logo">
      </span>
    </router-link>
    <div class="head_list">
      <ul>
        <li>
          <b class="b_1"></b>
          <span>{{ $t('message.loginHeader.one') }}</span>
        </li>
        <li >
          <b class="b_2"></b>
          <span>{{ $t('message.loginHeader.two') }}</span>
        </li>
        <li >
          <b class="b_3"></b>
          <span>{{ $t('message.loginHeader.three') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {

      }
    },
    components: {
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style type="scss" scoped>
.login_head {
  margin: 0 auto;
  width: 1100px;
  height: 91px;
  padding: 10px 0px 10px 0px;
  background: #fff;
}
a {
  float: left;
}
.platform_logo {
  margin-top: 10px;
  display: inline-block;
  @include u_img(185, 66, -2, -18);
}
.head_list ul {
  padding-top: 10px;
}
  .head_list ul li{
    width: 140px;
    height: 54px;
    line-height: 54px;
    float: right;
    position: relative;
    margin-left: 100px;
  }
  .head_list ul li span{
    color: #333333;
    font-size: 16px;
  }
  .head_list ul li b{
    position: absolute;
    width: 54px;
    height: 54px;
    left: -60px;
    background-image: url('~@/assets/images/new-img/new.png');
    background-size: 800px 353px;
  }
  .b_1{
    background-position: -124px -222px;
  }
  .b_2{
    background-position: -245px -222px;
  }
  .b_3{
    background-position: -184px -222px;
  }
</style>
