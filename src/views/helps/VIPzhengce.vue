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
            <div id="headerTop">{{ $t('message.VIPzhengce.title') }}</div>
            <div id="ClassContent">
              <p class="titleFont">{{ $t('message.VIPzhengce.text1') }}</p>

              <p class="P_top P_Bom">{{ $t('message.VIPzhengce.text2') }}</p>

              <p class="P_top">{{ $t('message.VIPzhengce.text3') }}</p>

              <p class="P_Content">{{ $t('message.VIPzhengce.text4') }}</p>

              <p class="P_top">{{ $t('message.VIPzhengce.text5') }}</p>

              <p class="P_Content">{{ $t('message.VIPzhengce.text6') }}</p>

              <p class="P_Content">{{ $t('message.VIPzhengce.text7') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text8') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text9') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text10') }}</p>

              <p class="P_top">{{ $t('message.VIPzhengce.text11') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text12') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text13') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text14') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text15') }}</p>
              <P class="P_Content">{{ $t('message.VIPzhengce.text16') }}</P>

              <P class="P_top">{{ $t('message.VIPzhengce.text17') }}</P>
              <p class="P_Content">{{ $t('message.VIPzhengce.text18') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text19') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text20') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text21') }}</p>

              <p class="P_top">{{ $t('message.VIPzhengce.text22') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text23') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text24') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text25') }}</p>

              <p class="P_top">{{ $t('message.VIPzhengce.text26') }}</p>

              <p class="P_Content">{{ $t('message.VIPzhengce.text27') }}</p>
              <p class="P_Content">{{ $t('message.VIPzhengce.text28') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/help/SaleReturn.scss"
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
