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

            <div id="headerTop">{{ $t('message.shouhoufuwu.title') }}</div>
            <div id="ClassContent">
              <p class="P_top">{{ $t('message.shouhoufuwu.text1') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text2') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text3') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text4') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text5') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text6') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text7') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text8') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text9') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text10') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text11') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text12') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text13') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text14') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text15') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text16') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text17') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text18') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text19') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text20') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text21') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text22') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text23') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text24') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text25') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text26') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text27') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text28') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text29') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text30') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text31') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text32') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text33') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text34') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text35') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text36') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text37') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text38') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text39') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text40') }}</p>

              <p class="titleFont">{{ $t('message.shouhoufuwu.text41') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text42') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text43') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text44') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text45') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text46') }}</p>
              <p class="P_top">{{ $t('message.shouhoufuwu.text47') }}</p>
              <p class="P_Bom">{{ $t('message.shouhoufuwu.text48') }}</p>
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
