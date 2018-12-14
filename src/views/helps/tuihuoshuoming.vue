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
            <div id="headerTop" >{{ $t('message.tuihuoshuoming.head') }}</div>
            <div id="ClassContent">
              <p class="titleFont">{{ $t('message.tuihuoshuoming.text1') }}</p>

              <p class="P_top">{{ $t('message.tuihuoshuoming.text2') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text3') }}:</p>

              <p class="titleFont">{{ $t('message.tuihuoshuoming.text4') }}</p>

              <p class="P_top">{{ $t('message.tuihuoshuoming.text5') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text6') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text7') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text8') }};</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text9') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text10') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text11') }}</p>

              <p class="P_top" style="color: purple">{{ $t('message.tuihuoshuoming.text2') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text13') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text14') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text15') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text16') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text17') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text18') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text19') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text20') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text21') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text22') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text23') }}</p>

              <p class="titleFont">{{ $t('message.tuihuoshuoming.text24') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text25') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text26') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text27') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text28') }}</p>

              <p class="P_top" style="color: purple">{{ $t('message.tuihuoshuoming.text29') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text30') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text31') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text32') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text33') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text34') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text35') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text36') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text37') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text38') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text39') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text40') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text41') }}</p>

              <p class="titleFont">{{ $t('message.tuihuoshuoming.text42') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text43') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text44') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text45') }}</p>
              <div class="imgtop P_Bom">
                <img src="../../assets/images/help/trades.png" width="850" height="294">
              </div>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text46') }}</p>
              <div class="imgtop P_Bom">
                <img src="../../assets/images/help/returngoods.png" width="850" height="380">
              </div>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text47') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text48') }}</p>

              <p class="titleFont">{{ $t('message.tuihuoshuoming.text49') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text50') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text51') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text52') }}</p>

              <p class="titleFont">{{ $t('message.tuihuoshuoming.text53') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text54') }}</p>
              <p class="P_top">{{ $t('message.tuihuoshuoming.text55') }}</p>
              <div class="imgtop P_Bom">
                <img src="../../assets/images/help/table.png" width="850" height="440">
              </div>
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
