<template>
	<div>
<div id="topnav">
  <div class="content">
   <router-link :to="{path:'/index'}" ><!-- <span class="ico header_ico"></span> -->欢迎来到优众网!</router-link>
    <ul class="right">
      <li class="bdn"><router-link :to="{path:'/login'}"><span>请登录</span></router-link></a></li>
      <li><router-link :to="{path:'/register'}"><span>免费注册</span></router-link></li>
      <li><router-link :to="{path:'/trades'}"><span>我的订单</span></router-link></li>
      <li><router-link :to="{path:'/user_center'}"><span>个人中心<em class="ico down_ico hide"></em></span></router-link></li>
      <li><a href="/helps/xinshoushuoming"><span>购物须知</span></a></li>
      <li class="bdn last">
              <a style="cursor: default;"><span><em class="ico ntalker_ico"></em>{{telephone}}</span></a>
      </li>
    </ul>
  </div>
</div>
<div id="mainhead">
  <div class="content" style="position: relative;">
    <router-link :to="{path:'/index'}" style="display: inline-block;margin-top: 25px;">
          <img src="../../assets/images/LOGO.png" alt="logo">
        </router-link>
    <div class="right" style="position: absolute;right: 0;top: 15px;">
      <form class="search" action="/products" method="get" style="line-height: 100%;">
        <span class="ico"></span>
        <input type="text" placeholder="请输入内容" name='keyword'>
        <input type="submit" class="go_search" value="搜索"/>
      </form>
      <div class="cart_area">
      <a href="/carts" class="go_cart"><span class="cartico ico"></span><span>我的购物车</span><span
          class="numbs"></span></a>
      </div>
    </div>
  </div>
</div>
	<div class="main">
	<div class="content">
		<span class="error_icon"></span>

		<div class="text_area">
			<span class="title"></span>
			<p>别着急，<router-link :to="{path:'/index'}">点击这里 </router-link>就可以找到出路</p>
		</div>
	</div>
</div>
	<alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
    <footErs></footErs>
</div>
</template>

<script>
	import footErs from '../../components/assembly/foot.vue'	
	import alertBox from '../../components/assembly/alert_box.vue'
	import {telephone} from '../../../config/config'
	export default {
		data() {
			return {
        		alertText:"",
        		alertShow:false,
        		telephone
			}
		},
		components: {
	     	footErs,
			alertBox
		},
		methods: {

		},
		mounted() {
		
      
		}
	}
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/error/error"
</style>
<style>
	.main .content .error_icon {
		    margin-left: 36px;
		    display: block;
		    background-image: url(/images/error/error.png?201710171121);
		    width: 414px;
		    height: 162px;
		    background-size: 414px 162px;
		}
	.main .content .text_area .title {
		    margin-left: 184px;
		    display: inline-block;
		    background-image: url(/images/error/error_title.png?201710171121);
		    width: 118px;
		    height: 29px;
		    background-size: 118px 29px;
		    margin-top: 24px;
		}
</style>