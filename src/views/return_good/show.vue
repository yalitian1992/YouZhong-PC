<template>
  <div>
    <headTop></headTop>
    <searchTop></searchTop>
    <div class="content mt40">
      <div class="main">
        <div class="content content_success">
          <div class="form_header">{{ $t('message.returnGoodFrom.titleShow') }}</div>
          <div class="label_background">
            <label class="error_info title_first">{{ $t('message.returnGoodFrom.ShowA') }}</label><br><br>
            <label class="error_info title_btn">{{ $t('message.returnGoodFrom.ShowB') }}{{telephone}}{{ $t('message.returnGoodFrom.ShowC') }}</label>
          </div>
          <div class="content_underline">

            <hr>
          </div>
          <form v-if="paytype == 'express'" class="form form_success">
            <ul>
              <li class="receiver_name infomation">
                <span class="pre_title"></span>&nbsp;{{ $t('message.returnGoodFrom.name') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>{{ unit.return_name || '' }}</label>
              </li>
              <li class="phone infomation">
                <span class="pre_title"></span>&nbsp;{{ $t('message.returnGoodFrom.phone') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>{{ unit.return_phone || '' }}</label>
              </li>
              <li class="detail_address infomation">
                <span class="pre_title"></span>&nbsp;{{ $t('message.returnGoodFrom.Address') }}&nbsp;&nbsp;&nbsp;
                <label>{{ unit.return_province || '' }}{{ unit.return_city || '' }}</label>
              </li>
              <li class="postcode infomation">
                <span class="pre_title"></span>&nbsp;{{ $t('message.returnGoodFrom.bank') }}&nbsp;&nbsp;&nbsp;
                <label>{{ unit.return_branch || '' }}</label>
              </li>
              <li class="bank_card infomation">
                <span class="pre_title"></span>&nbsp;{{ $t('message.returnGoodFrom.banknum') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>{{ unit.return_account || '' }}</label>
              </li>
            </ul>
          </form>
          <form class="form form_online_success" v-else>
            <ul>
              <li class="phone infomation">
                <span class="pre_title"></span>&nbsp;{{ $t('message.returnGoodFrom.phone') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>{{ unit.return_phone }}</label>
              </li>
            </ul>
          </form>
        </div>
        <div class="content know_info">
          <div class="form_header">{{ $t('message.returnGoodFrom.notice') }}</div>
          <div class="know_fonts">
            {{ $t('message.returnGoodFrom.noticeText') }}
          </div>
          <div class="know_title">
            {{ $t('message.returnGoodFrom.noticeTextb') }}
          </div>
          <div class="know_fonts">
            {{ $t('message.returnGoodFrom.noticeTextC') }}
          </div>
          <div class="know_fonts">
            {{ $t('message.returnGoodFrom.noticeTextD') }}<router-link :to="{path: '/index'}" style="color: #BB1E7B">www.ihaveu.com</router-link>{{ $t('message.returnGoodFrom.noticeTextE') }}<router-link :to="{path: '/index'}" style="color: #BB1E7B">www.ihaveu.com</router-link>{{ $t('message.returnGoodFrom.noticeTextF') }}
          </div>

          <div class="know_fonts know_last_fonts">
            {{ $t('message.returnGoodFrom.noticeTextH') }}{{telephone}}{{ $t('message.returnGoodFrom.noticeTextG') }}
          </div>
        </div>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import searchTop from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import {telephone} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
  //import {} from '../../assets/js/contacts/create.js'
  export default {
    i18n,
    data() {
      return {
        unit:{},
        paytype:'',
        telephone
      }
    },
    components: {
      headTop,
      searchTop,
      footErs
    },
    methods: {

    },
    mounted() {
      var _this = this;
      this.returnGoodShow(this.token(),{unit_id:this.$route.query.unitId},function(respone){
        _this.unit = respone.data;
        _this.paytype = respone.data.payment_service
      })
    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/return_good/returnship"
</style>
<style type="text/css" scoped>
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video{
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }
</style>
