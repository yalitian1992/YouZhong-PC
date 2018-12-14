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
            <div id="headerTop">{{ $t('message.zhekouzhengce.title') }}</div>
            <div id="ClassContent">

              <p class="P_top">{{ $t('message.zhekouzhengce.text1') }}</p>

              <p class="P_top">{{ $t('message.zhekouzhengce.text2') }}</p>
              <p class="P_top">{{ $t('message.zhekouzhengce.text3') }}</p>
              <div class="imgtop P_Bom">
                <img src="../../assets/images/help/couple.png" width="850" height="314">
              </div>
              <p class="P_top">{{ $t('message.zhekouzhengce.text4') }}</p>
              <p class="P_top">{{ $t('message.zhekouzhengce.text5') }}</p>
              <div class="imgtop P_Bom">
                <img src="../../assets/images/help/selectpic.png" width="850" height="314">
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
  @import "../../assets/sass/help/PayMothod.scss"
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
