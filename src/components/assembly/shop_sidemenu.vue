<template>
  <div>
    <!--购物须知——侧导航-->
    <div class="left_menu">
      <div class="title">
        <p>{{ $t('message.gouwuxuzhi.title') }}</p>
      </div>
      <ul class="list">
        <!--<li class="oversea_delivery loaded">
          <div class="loaded">
            <span class="help_ico oversea_delivery_title"></span>
          </div>
          <div class="link_list">
            <router-link :to="{path: '/xinshoushuoming'}" :class="{'active':active('/xinshoushuoming')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.xinshoushuoming') }}</router-link>
            <router-link :to="{path: '/guanshuishuoming'}" :class="{'active':active('/guanshuishuoming')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.guanshuishuoming') }}</router-link>
            <router-link :to="{path: '/haiwaizhifufangshi'}" :class="{'active':active('/haiwaizhifufangshi')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.haiwaizhifufangshi') }}</router-link>
            <router-link :to="{path: '/wuliupeisong'}" :class="{'active':active('/wuliupeisong')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.wuliupeisong') }}</router-link>
            <router-link :to="{path: '/haiwaituihuanzhengce'}" :class="{'active':active('/haiwaituihuanzhengce')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.haiwaituihuanzhengce') }}</router-link>
            <router-link :to="{path: '/changjianwenti'}" :class="{'active':active('/changjianwenti')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.changjianwenti') }}</router-link>
          </div>
        </li>-->
        <li class="home_delivery loaded">
          <span class="help_ico home_delivery_title"></span>

          <div class="link_list">
            <router-link :to="{path: '/ruhegoumai'}" :class="{'active':active('/ruhegoumai')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.ruhegoumai') }}</router-link>
            <router-link :to="{path: '/fukuanfangshi'}" :class="{'active':active('/fukuanfangshi')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.fukuanfangshi') }}</router-link>
            <router-link :to="{path: '/VIPzhengce'}" :class="{'active':active('/VIPzhengce')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.VIPzhengce') }}</router-link>
            <router-link :to="{path: '/zhekouzhengce'}" :class="{'active':active('/zhekouzhengce')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.zhekouzhengce') }}</router-link>
            <router-link :to="{path: '/zhengpinbaozhang'}" :class="{'active':active('/zhengpinbaozhang')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.zhengpinbaozhang') }}</router-link>
            <router-link :to="{path: '/fapiaoshuoming'}" :class="{'active':active('/fapiaoshuoming')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.fapiaoshuoming') }}</router-link>
            <router-link :to="{path: '/tuihuoshuoming'}" :class="{'active':active('/tuihuoshuoming')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.tuihuoshuoming') }}</router-link>
            <router-link :to="{path: '/shouhoufuwu'}" :class="{'active':active('/shouhoufuwu')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.shouhoufuwu') }}</router-link>

            <!--<router-link :to="{path: '/guoneituihuanzhengce'}" :class="{'active':active('/guoneituihuanzhengce')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.haiwaituihuanzhengce') }}</router-link>-->
          </div>
        </li>
        <li class="about_us loaded">
          <span class="help_ico about_us_title"></span>

          <div class="link_list">
            <!--  <a class="<%= action_name == 'aboutuxuan' ? 'active' : '' %>" href="/helps/aboutuxuan" name="AboutUxuan.html"><span class="help_ico arrow"></span>关于U选</a> -->
            <!--<a href="http://www.ihaveu.com/index.html#subapp=believe&mid=320&page=1"  target="_blank"><span class="help_ico arrow"></span>用户协议</a>-->
            <router-link :to="{path: '/yonghuxieyi'}" :class="{'active':active('/yonghuxieyi')}"><span class="help_ico arrow"></span>{{ $t('message.gouwuxuzhi.yonghuxieyi') }}</router-link>
            <!-- <a class="<%= action_name == 'lianxiwomen' ? 'active' : '' %>" href="/helps/lianxiwomen" name="RelationMe.html"><span class="help_ico arrow"></span>联系我们</a> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/help/shopInstruction.scss"
</style>

<script>
  import i18n from '../../assets/js/il8n.js'

  export default {
    i18n,
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
      active:function (urlpath) {
        return this.$route.path==urlpath
      }
    },
    mounted() {

    }
  }
</script>
