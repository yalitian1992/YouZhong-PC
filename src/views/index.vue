<template>
	<div>
		<headTop></headTop>
		<normalHead></normalHead>
		<!--<p>{{ $t("message.hello") }}</p>-->

		<div class="main_wrapper" style="background: #FFFFFF">
			<div class="content" style="background: #FFFFFF">
				<div class="w_main" style="margin-top: 45px;">
					<div class="main_top">
						<div class="main_top_left">
							<ul class="uls">
								<li v-for="item in bannerdata">
									<a @click="goNextPage(item)">
										<img :src="imgBaseUrl() +item.pic" :onerror="defaultImg(0)">
									</a>
								</li>
							</ul>
							<ol class="ols">
								<li v-for="item in bannerdata.length"></li>
							</ol>
						</div>
						<div class="main_top_right">
							<!--<p   @click="changeLanguage">{{languageTitle}}</p>-->
							<div class="m_t">
								<p><span>{{ $t('message.index.seckill') }}&nbsp;&nbsp;SALE</span>
									<router-link :to="{path:'/auction/products',query:{keyword:'闪购'}}" target="_blank">
										{{ $t('message.index.morekill') }}&nbsp;&nbsp;>
									</router-link>
								</p>
							</div>
							<div class="list_1">
								<a style="background: #fff;cursor: pointer;" @click="searchCriteria(flashBuy[0])">
									<img :src="imgBaseUrl() +flashBuy[0].pic" :onerror="defaultImg(0)">
									<div class="m2_foot" style="background: #fff;">
										<div class="m2_left">
											<p>{{flashBuy[0].title}} </p>
											<p>{{flashBuy[0].subtitle}} </p>
										</div>
										<div class="m2_right" style="margin-top: 19px;">
											<span>{{flashBuy[0].price_gt}}<small>{{ $t('message.index.yuan') }}</small></span>
										</div>
									</div>
								</a>
							</div>
							<div class="list_2">
								<a @click="searchCriteria(flashBuy[1])" style="cursor: pointer;">
									<img :src="imgBaseUrl() +flashBuy[1].pic||null" :onerror="defaultImg(0)">
									<div class="m2_foot" style="background: #fff;">
										<div class="m2_left">
											<p>{{flashBuy[1].title}}</p>
											<p>{{flashBuy[1].subtitle}}</p>
										</div>
										<div class="m2_right" style="margin-top: 19px;">
											<span> {{flashBuy[1].price_gt}} <small>{{ $t('message.index.yuan') }}</small></span>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div class="main_center">
						<div class="main_center_left" style="cursor: pointer;" @click="searchCriteria(auctionThemes[0])">
							<div class="c_lp">
								<p>{{auctionThemes[0].title}}</p>
							</div>
							<div class="main_center_top">
							</div>
							<div class="main_center_img">
								<img :src="imgBaseUrl()+auctionThemes[0].pic" :onerror="defaultImg(0)" style="width: 550px;height: 400px;">
								<div class="img_foot">
									<p>{{auctionThemes[0].subtitle}}</p>
								</div>
							</div>
						</div>
						<div class="main_center_right" style="cursor: pointer;" @click="searchCriteria(auctionThemes[1])">
							<div class="main_center_top c_right">
								<div>
									<p>{{auctionThemes[1].title}}</p>
								</div>
							</div>
							<div class="main_right_img">
								<img :src="imgBaseUrl()+auctionThemes[1].pic" :onerror="defaultImg(0)" style="width: 550px;height: 400px;">
								<div class="img_foot">
									<p>{{auctionThemes[1].subtitle}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="main_bottom">
						<div class="main_bottom_l" style="cursor: pointer;" @click="searchCriteria(auctionThemes[2])">
							<div class="main_bottom_f">
								<p>{{auctionThemes[2].title}}</p>
							</div>
							<div class="main_bottom_imgs">
								<img :src="imgBaseUrl()+auctionThemes[2].pic" :onerror="defaultImg(0)" style="width: 350px;height: 284px;">
								<div class="main_b_f ">
									<p>{{auctionThemes[2].subtitle}}</p>
								</div>
							</div>
						</div>
						<div class="main_bottom_c " @click="searchCriteria(auctionThemes[3])" style="cursor: pointer;">
							<div class="main_bottom_f">
								<p>{{auctionThemes[3].title}}</p>
							</div>
							<div class="main_bottom_imgs">
								<img :src="imgBaseUrl()+auctionThemes[3].pic" :onerror="defaultImg(0)" style="width: 350px;height: 284px;">
								<div class="main_b_f">
									<p>{{auctionThemes[3].subtitle}}</p>
								</div>
							</div>
						</div>
						<div class="main_bottom_r" @click="searchCriteria(auctionThemes[4])" style="cursor: pointer;">
							<div class="main_bottom_f">
								<p>{{auction.title}}</p>
							</div>
							<div class="main_bottom_imgs">
								<img :src="imgBaseUrl() +auction.pic" :onerror="defaultImg(0)" style="width: 350px;height: 284px;">
								<div class="main_b_f">
									<p>{{auction.subtitle||""}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="main_footer">
						<div style="padding-top: 20px;" v-for="(item, index) in hotList">
							<router-link :to="{path:'/auction/products',query:{brandId:item.id}}" target="_blank">
								<img :src="imgBaseUrl() +item.pic" style="margin: 0 auto;display: block;">
								<span>{{item.chinese}}</span>
							</router-link>
						</div>

						<router-link :to="{path:'/auction/brands'} " target="_blank" class="more">{{ $t('message.index.morebrand') }}&nbsp;></router-link>

					</div>
				</div>
				<div class="ihave">
					<ul class="scroll_contents" @click="goback">
						<li class="scroll_top" data-index='0' style="display: none;">
							<p></p>
						</li>
					</ul>
				</div>
			</div>

		</div>
		<footErs></footErs>
		<alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>

	</div>
</template>
<style lang="sass" scoped>
	@import "../assets/sass/new_style/new_index.scss"
</style>
<script>
	import headTop from '../components/assembly/headTop.vue'
	import normalHead from '../components/assembly/normal_head.vue'
	import footErs from '../components/assembly/foot.vue'
	import alertBox from '../components/assembly/alert_box.vue'
	import {imgBaseUrl} from '../../config/config'
	import i18n from '../assets/js/il8n.js'
	export default {
		 i18n,
		data() {
			return {
//				hello: this.$t('message.hello'),
				languageTitle: '中文',
				bannerdata: {pic:""}, //轮播图
				alertText:"",
				imgBaseUrl,      //图片域名
				alertShow:false,
				flashBuy: [{ "pic": '' }, { "pic": '' }], //闪购
				flash: { theme_type: 0 },
				flashDate: [],
				brandLists: [],
				hotList: [],
				auctionThemes: [{ 'title': '',"pic": '' }, { 'title': '' ,"pic": ''}, { 'title': '' ,"pic": ''}, { 'title': '' ,"pic": ''}, { 'title': '' ,"pic": ''}],
				auction: {},
				where: { "where": { "brand_id": {}, "unsold_count": { "gteq": {} }, "price": { "gt": {}, "lt": {} } }, "name": "latest", "page": "1",  "per_page": "40", "order": {}, "keyword": {} }
			}
		},
		components: {
			headTop,
			normalHead,
			footErs,
			alertBox
		},
		methods: {
			searchCriteria: function(data) {
			console.log(data)
			if(data.link_url){
				window.location.href = data.link_url;
			}else{
				this.$router.push({ path: '/auction/products', query: { where: data.search_params }})
			}
//				this.where.keyword = data.keyword
//				if(data.brand_id!=''){
//					this.where.where.brand_id = data.brand_id
//				}
//				this.where.where.target = data.target
//				this.where.where.unsold_count.gteq = data.unsold_count_gteq
//				this.where.where.price.gt = data.price_gt
//				this.where.where.price.lt = data.price_lt
				//this.where.where.category1_id=data.category1_id	//分类
//				this.where=data
//				this.$router.push({ path: '/auction/products', query: { where: this.where } })
			},
			goback: function() {
				document.body.scrollTop = 0;
			},
			goNextPage: function (item) {

				  switch (item.link_type) {
				    case 1:
				      let _this = this;
				      //_this.searchCriteria(item.auction_theme.search_params)
				      _this.$router.push({ path: '/auction/products', query: { where: item.auction_theme.search_params }})
				      break;
				    case 2:
				      this.$router.push({name: 'show', params:{id:item.link_url}})
				      break;
				    case 3:
				      window.location.href = item.link_url;
				      break;
				  }
			},
			changeLanguage:function(){
				if(this.languageTitle === "中文") {
		          this.languageTitle = "EN"
		          this.$i18n.locale = "zh-CN";
		        }else if(this.languageTitle === "EN") {
		          this.languageTitle = "中文"
		          this.$i18n.locale = "en-US";
		        }
			}
		},
		mounted() {

			let lang =  navigator.browserLanguage?navigator.browserLanguage:navigator.language
			var _this = this
			var host = window.location.host

			//首页
			this.bannerList(function(data) {

				_this.bannerdata = data.data.auction_pic_ads
				if(data.data.pc_flash_buy.length>=2){
					_this.flashBuy = data.data.pc_flash_buy
				}

				if(data.data.auction_themes.length>=5){
					_this.auctionThemes = data.data.auction_themes
				}
				if(_this.auctionThemes[4]) {
					_this.auction = _this.auctionThemes[4]
				}

			})
			this.brandList(function(data) {
				_this.brandLists = data.data.auction_brands
				for(var i = 0; i < _this.brandLists.length; i++) {
					if(_this.brandLists[i].recommend == "hot") {
						_this.hotList.push(_this.brandLists[i])
					}
				}
				sessionStorage.setItem('brandList', JSON.stringify(_this.brandLists));
				_this.hotList = _this.hotList.slice(0, 5)

			})
			setTimeout(function() {
				//首页淡入淡出轮播图
				//初始样式控制
				var size = $(".uls li").size();
				$(".uls li").eq(0).show();
				$(".ols li").eq(0).addClass("ol_first");
				//自动播放函数
				var i = 0;
				var t = setInterval(move, 3500);

				function move() {
					i++;
					if(i == size) {
						i = 0;
					}
					$(".ols li").eq(i).addClass("ol_first").siblings().removeClass("ol_first");
					$(".uls li").eq(i).fadeIn(600).siblings().fadeOut(600);

				}
				//鼠标移入清楚定时器
				$(".uls").hover(function() {
					clearInterval(t);
				}, function() {
					t = setInterval(move, 3500)
				})
				$(".ols").on("click", "li", function() {

					var m = $(this).index();

					i = m;
					$(".ols li").eq(m).addClass("ol_first").siblings().removeClass("ol_first");
					$(".uls li").eq(m).fadeIn(10).siblings().fadeOut(10);
					return false;
				})

				var window_scroll_top = $(window).scrollTop(),
					scroll_height = parseInt($(window).height() / 2 - $('.scroll_contents').height() / 2, 10),
					windowWidth = $(window).width(),
					top_0 = $('.uls').offset().top,
					top_1 = $('.ihave').offset().top - scroll_height;
				$(window).scroll(function() {

					window_scroll_top = $(this).scrollTop();
					if(window_scroll_top >= (top_0 + 150)) {
						$('.scroll_top').show();
						$('.scroll_top').addClass('no');
						if(windowWidth >= 1440) { //&& window_scroll_top >= (top_0 + 150)
							$('.left_float_windows').show();
							$('.left_float_windows').addClass('no');
						}
					} else {
						$('.scroll_top').removeClass('no');
						$('.scroll_top').hide();
						$('.left_float_windows').removeClass('no');
						$('.left_float_windows').hide();
					}
				});

			}, 1000)
		}
	}
</script>
