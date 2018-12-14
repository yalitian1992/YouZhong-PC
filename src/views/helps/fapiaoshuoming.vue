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
            <div id="headerTop">{{ $t('message.fapiaoshuoming.title') }}</div>
            <div id="ClassContent">

              <p class="titleFont">{{ $t('message.fapiaoshuoming.text1') }}</p>

              <div class="imgtop">
                <img src="../../assets/images/help/addpro1.png" width="850" height="574">
              </div>

              <p class="titleFont">{{ $t('message.fapiaoshuoming.text2') }}</p>

              <p class="titleFont_page">{{ $t('message.fapiaoshuoming.text3') }}：</p>

              <p class="PageBtn">{{ $t('message.fapiaoshuoming.text4') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/help/shopInstruction.scss"
  @import "../../assets/sass/help/InvoiceExplain.scss"
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
