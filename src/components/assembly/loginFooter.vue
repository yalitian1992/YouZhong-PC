<template>
  <div>
    <div class="login_foot">
      <div class="copyright">
        <p class="hot_line">{{ $t('message.loginFooter.one') }}{{telephone}}</p>
        <p class="title"><span class="copy_right_icon">©</span>&nbsp;&nbsp;2016 ihaveu.com {{ $t('message.loginFooter.two') }}&nbsp;&nbsp;&nbsp;{{ $t('message.loginFooter.three') }}&nbsp;&nbsp;&nbsp;津B2-20100085</p>
        <span class="foot_ico ihaveu_logo"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {telephone} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        telephone
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
  .login_foot{
    height: 210px;
    background: #ffffff;
    overflow: hidden;
  }
  .login_foot .copyright {
    margin: 0 auto;
    width: 458px;
    background: #ffffff;
    left: 300px;
    padding: 27px 27px 0 27px;
    color: #aaaaaa;
  }
  .login_foot .copyright .hot_line {
    text-align: center;
    font-size: 14px;
  }
  .login_foot .copyright .title {
    text-align: center;
    font-size: 12px;
    margin-top: 19px;
  }
  .login_foot .copyright .title .copy_right_icon {
    font-size: 10px;
  }
  .login_foot .copyright .ihaveu_logo {
    display: inline-block;
    margin-top: 19px;
    margin-left: 180px;
    text-align: center;
    width: 94px;
    height: 31px;
    background-position: -238px -73px;
  }
</style>
