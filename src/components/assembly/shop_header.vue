<template>
  <div id="mainhead">
    <div class="content">
      <logo></logo>
      <div class="process">
        <div class="item my_cart" :class = "Buy >=1 ? 'active' : ''">
          <p class="around">1</p>
          <p class="text">{{ $t('message.shopHeader.mycart') }}</p>
        </div>
        <p class="line line_1" :class = "Buy >=2 ? 'active' : ''"></p>
        <div class="item confirm_trade" :class = "Buy >=2 ? 'active' : ''">
          <p class="around">2</p>
          <p class="text">{{ $t('message.shopHeader.treadCreate') }}</p>
        </div>
        <p class="line line_2" :class = "Buy >=3 ? 'active' : ''"></p>
        <div class="item pay_mode" :class = "Buy >=3 ? 'active' : ''">
          <p class="around">3</p>
          <p class="text">{{ $t('message.shopHeader.pay') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '../../components/assembly/logo.vue'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
      }
    },
    props: {
      'Buy': {
        default: 1
      }
    },
    components: {
      logo
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/cart/index.scss"
</style>
<style scoped>
  #mainhead{
    margin-bottom:0px !important;
    background: #fff !important;
  }
</style>

