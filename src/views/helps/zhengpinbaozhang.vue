<template>
  <div>
    <headTop></headTop>
    <normalHead></normalHead>
    <div style="height: 40px;"></div>
    <div class="main">
      <div class="content">
        <sideMenu></sideMenu>
        <div class="iframe_content">
          <div id="RrightContent">
            <div id="headerTop">{{ $t('message.zhengpinbaozhang.title') }}</div>
            <div id="ClassContent">
              <!--<p class="titleFont">正品保障</p>-->
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text1') }}</p>
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text2') }}</p>
              <p class="titleFont">{{ $t('message.zhengpinbaozhang.text3') }}</p>
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text4') }}</p>
              <p class="titleFont">{{ $t('message.zhengpinbaozhang.text5') }}</p>
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text6') }}</p>
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text7') }}</p>
              <p class="P_top"><span style="color:red">{{ $t('message.zhengpinbaozhang.text8') }}</span>{{ $t('message.zhengpinbaozhang.text9') }}</p>
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text10') }}</p>
              <p class="P_top">{{ $t('message.zhengpinbaozhang.text11') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/help/new.scss"
  @import "../../assets/sass/help/shopInstruction.scss"
</style>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import normalHead from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import sideMenu from '../../components/assembly/shop_sidemenu.vue'
  import i18n from '../../assets/js/il8n.js'

  export default {
    i18n,
    data() {
      return {

      }
    },
    components: {
      headTop,
      normalHead,
      footErs,
      sideMenu
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
