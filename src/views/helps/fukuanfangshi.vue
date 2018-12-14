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
            <div id="headerTop">{{ $t('message.fukuanfangshi.title') }}</div>
            <div id="ClassContent">
              <p class="P_top">{{ $t('message.fukuanfangshi.text1') }}</p>

              <p class="P_top">{{ $t('message.fukuanfangshi.text2') }}</p>

              <p class="P_top">{{ $t('message.fukuanfangshi.text3') }}</p>

              <div class="imgtop P_Bom">
                <img src="../../assets/images/help/zhifu.png" width="850" height="520">
              </div>
              <p class="P_top">{{ $t('message.fukuanfangshi.text4') }}</p>
              <p class="P_top">{{ $t('message.fukuanfangshi.text5') }}</p>
              <p class="P_top"><span style="color:red">{{ $t('message.fukuanfangshi.text6') }}</span>{{ $t('message.fukuanfangshi.text7') }}</p>

              <p class="titleFont">{{ $t('message.fukuanfangshi.text8') }}</p>
              <p class="P_top">{{ $t('message.fukuanfangshi.text9') }}</p>
              <p class="P_top">{{ $t('message.fukuanfangshi.text10') }}</p>
              <p class="P_top">{{ $t('message.fukuanfangshi.text11') }}</p>
              <p class="P_top">{{ $t('message.fukuanfangshi.text12') }}</p>

              <p class="P_top">{{ $t('message.fukuanfangshi.text13') }}</p>
              <p class="P_top">{{ $t('message.fukuanfangshi.text14') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/help/Custom.scss"
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
