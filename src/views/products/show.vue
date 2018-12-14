<template>
	<div>
		<headTop></headTop>
		<normalHead :card ="card"></normalHead>
		<div style="width: 100%;height: 100%;background: #fff;margin-top: -23px;padding-top: 25px;padding-bottom: 40px;overflow: auto;">
			<div id="crumbs" class="content" style="margin-top: 60px;">
				<router-link :to="{path:'/index'}" class="product_ico house_tag" style="font-size: 12px;color: #777;width: 28px;line-height: 16px;background:none;">{{ $t('message.brands.first') }}</router-link>
				 <div class="ico next_ico" style="color: #777;font-size: 12px;background: none;"> > </div>
				    <router-link :to="{path:'/auction/products'}" class="product_ico house_tag" style="font-size: 12px;color: #777;width: 50px;line-height: 16px;background:none;">商品列表</router-link>
				    <p class="text" ><em class="ico"></em></p>
				    <a style="font-size: 12px;color: #777;">{{product.name}}</a>
				    <div class="ico next_ico" style="color: #777;font-size: 12px;background: none;"> > </div>
				    <p class="right show productTd" :productId="product.id">{{ $t('message.show.productnum') }}：{{product.id}}</p>
			</div>
			<div class="product_content" data-discount="2399" data-product-id="126997" data-product-count="4" data-location-id="1">
				<div class="s_main">
					<div class="show-top">
						<div class="show-left" style="width: 565px;height: 500px;margin-right: 50px">

							<div class="show-left">
								<div class="slidimg loaded">
									<img :src="'http://i0.ihaveu.com'+product.major_pic+'.m420.JPG'" :onerror="defaultImg(0)">
								</div>
								<div class="pic_zoom loaded hide">
									<img :src="imgBaseUrl()+product.major_pic" :onerror="defaultImg(0)" style="left: -395.242px; top: -148.622px;">
								</div>
								<div class="slide_small">
									<div class="border-btn btntop">
										<p class="bac_img"></p>
									</div>
									<div class="small_imgs">
										<div class="imgs loaded">
											<img  v-for="item in product.images" :src="'http://i0.ihaveu.com'+item.large+'.m48.JPG'" :onerror="defaultImg(0)" @mouseenter="intoPic(item.id,item.large)" :class="item.id==isShow?'active':''" >
										</div>
									</div>
									<div class="border-btn btnfoot">
										<p class="bac_img"></p>
									</div>
								</div>
							</div>
						</div>

						<div class="show-right">
							<div class="sright-top">
								<h1>{{brandname}}</h1>
								<p>{{product.name}}</p>
							</div>
							<div class="sr-center">
								<ul>
									<li>
										<span>{{ $t('message.show.price') }}</span>
										<p class="Price">
											<i>{{currency}}</i>{{product.discount}}
										</p>
										<p class="Discount">
											{{currency}}{{product.price}}
											<span></span>
										</p>
									</li>

									<li>
										<span>{{ $t('message.show.promotion') }}</span>
										<p>{{ $t('message.show.newProduct') }}</p>
									</li>

									<li style="margin-top: 26px;">
										<span style="line-height: 40px;">{{ $t('message.show.service') }}</span>
										<b>{{ $t('message.show.sevenDay') }}</b>
										<b>{{ $t('message.show.freeShipping') }}</b>
									</li>
								</ul>
							</div>
							<div class="sr-bottom">
								<ul>
									<li style="margin-top: 20px;" v-if="relateShow">
										<span>{{ $t('message.show.color') }}</span>
										<div class="colors" style="top: -4px">
											<b v-for="item in relateProducts">
							                <a class="val"  @click="relate(item.id)">

							                  <img :src="imgBaseUrl()+item.color_pic+'.m220.jpg'" :onerror="defaultImg(0)"/>
							                  <span class="ico"></span>
							                </a>
							                </b>
										</div>
									</li>
									<li class="size-li" style="margin-top: 30px;" v-if="sizeShow">
										<span style="float: left;">{{ $t('message.show.size') }}</span>
										<div style="float: left;float: left;max-width: 484px;">
										<p style="display: inline-block;margin-bottom: 5px;" class="val failed" v-for="item in skus" :size="item.id" @click="skusId(item.id)"  :class="{active:params.retail_cart.sku_id==item.id}" v-if="item.name&& item.amount>0">{{item.name}}</p>
										</div>
										<div class="clearfix"></div>
									</li>
									<li class="sli-last" style="margin-top: 23px;margin-bottom: 20px;">
										<span>{{ $t('message.show.wanxin') }}</span>
										<p>{{ $t('message.show.tishi') }}</p>
									</li>

								</ul>
								<div class="pro-btn" >
									<p class="add_cart " @click="addCart" v-if="soldOut">
										<span></span>{{ $t('message.show.addcaart') }}</p>
									<p class="purchase " @click="create" v-if="soldOut">{{ $t('message.show.shipping') }}</p>

									<p class="sold_out" :class="{'hide':soldOut}">{{ $t('message.show.soldOut') }}</p>

								</div>
							</div>
						</div>
					</div>
					<div class="Promotion" v-if="collocatShow">
						<h2>{{ $t('message.show.relevant') }}</h2>
						<ul>

						<a v-for="item in collocation" >
							<router-link :to="{name:'show',params:{id:item.id}}" target="_blank" >
								<li>
									<div><img :src="imgBaseUrl()+item.major_pic+'.m220.jpg'"  :onerror="defaultImg(0)"/></div>
									<p>{{item.name}}</p>
									<span>{{currency}}{{item.discount}}</span>
								</li>
							</router-link>
						</a>

						</ul>
					</div>
					<div class="show-tab">
						<ul class="tab-top">
							<li class="tab-active">{{ $t('message.show.details') }}</li>
							<li>{{ $t('message.show.size') }}</li>
							<li>{{ $t('message.show.brand') }}</li>
						</ul>
						<div class="tabs">
							<div class="details">

								<div class="details-head">
									<h2>PRODUCT INFO</h2>
									<p>{{ $t('message.show.prodductdetail') }}</p>
								</div>
								<div class="details-top">
									<ul class="details-list" v-for="item in valueList">
										<li><span> {{item.attribute_name}}：</span>{{item.content}}</li>
									</ul>
									<div class="border"></div>
									<div class="details-head">
										<h2>PRODUCT DETAILS</h2>
										<p>{{ $t('message.show.information') }}</p>
									</div>

									<div class="details-foot">
										<p style="line-height: 24px;">{{product.description}}</p>
										<!--  <p style="line-height: 24px;"></p> -->
										<ul>
											<li class="loaded" v-for="item in product.images">
												<img :src="imgBaseUrl()+item.large" :onerror="defaultImg(0)">
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="size">
								<div class="details-head" style="margin-bottom: 30px;">
									<h2>SIZE INFO</h2>
									<p>{{ $t('message.show.chima') }}</p>
								</div>
								<div class="sizes" style="margin-bottom: 40px;text-align: center;" v-if="sizePic">
									<img :src="imgBaseUrl()+product.spec_pic" :onerror="defaultImg(0)" />
								</div>
								<p  v-if="!sizePic">{{ $t('message.show.nochima') }}</p>
							</div>
							<div class="brand ">
								<div class="details-head">
									<h2>BRANDS</h2>
									<p>{{ $t('message.show.brand') }}</p>
								</div>
								<p style="line-height: 24px">{{brand.description}}</p>
							</div>
						</div>
					</div>
					<div class="tabright" v-if="browse">
						<h2>{{ $t('message.show.historical') }}</h2>
						<div class="ups">
							<ul class="h-ul">
								<a v-for="(item,index)  in historys"  >
									<router-link :to="{name:'show',params:{id:item.product_id}}"  target="_blank" style="cursor: pointer;width: 218px;height: 106px;">
									<li>
										<div class="loaded">
											 <img :src="imgBaseUrl()+item.pic+'.m220.jpg'">
										</div>
										<p>{{item.name}}</p>
										<span>{{currency}} {{item.discount}}</span>
									</li>
									</router-link>
								</a>
							</ul>
						</div>
						<div class="up-down" v-if="historybtn">
		                    <span class="h-up"></span>
		                    <span class="h-down"></span>
		                </div>
					</div>
				</div>
			</div>
			<div class="clearfloat" style="clear: both;"></div>
		</div>
		<footErs></footErs>
		<alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
	</div>
</template>

<script>
	import headTop from '../../components/assembly/headTop.vue'
	import normalHead from '../../components/assembly/normal_head.vue'
	import footErs from '../../components/assembly/foot.vue'
	import { imgBaseUrl,currency } from '../../../config/config'
	import alertBox from '../../components/assembly/alert_box.vue'
	import i18n from '../../assets/js/il8n.js'

	export default {
		i18n,
		data() {
			return {
				goodId: 0, //id
				product: {}, //详情
				alertText:"",
				sizeShow:true,
				relateShow:true,
				collocatShow:true,
				skusShow:true,
				alertShow:false,
				sizePic:false,
				soldOut:true,//显示售完
				imgBaseUrl, //图片域名
				currency,
				brandname:'',
				params: { "retail_cart": { "product_id":null, "sku_id":null, "client":"pc"  } },
				createParams:[{id:this.$route.params.id,sku_id:""}],
				skus: {},
				relateProducts:{},//其他颜色
				collocation:{},//搭配商品
				Crumbs:{},
				isShow:'',
				brand:{},
				sessionData:null,
				sessionData1:[],
				sessionData2:[],
				valueList:{},
				historys:{},
				historybtn:false,
				browse:false,
        card:1
			}
		},
		components: {
			headTop,
			normalHead,
			footErs,
			alertBox
		},
		methods: {
			addCart: function() {
				var _this = this;
				if(_this.params.retail_cart.sku_id==null){
					_this.alertShow=true
					_this.alertText="请选择尺码"
				}else{
					this.addCarts(_this.token(),_this.params, function(data) {
							
					        if (data.status == 200) {
					          	_this.card += _this.card
								_this.alertShow=true
								_this.alertText=data.msg
					        } else if(data.status == 403) {
					          _this.goToLogin();
					        }else{
					        	 _this.alertShow=true
								_this.alertText=data.msg
					        }
						
					})
				}

			},
			//鼠标移入
			intoPic:function(id,url){
				this.isShow = id;
				this.product.major_pic=url
			},
			create: function() {
				if(this.createParams[0].sku_id==""){
					this.alertShow=true
					this.alertText="请选择尺码"
				}else{
					this.$router.push({path: '/trades_create', query: {ids:JSON.stringify(this.createParams)}})
				}




			},
			skusId:function(Id){
				this.params.retail_cart.sku_id=Id
				this.createParams[0].sku_id=Id
			},
			relate:function(id){

				this.$router.replace({name: 'show', params:{id:id}})
				this.details()
				document.body.scrollTop = 0;

			},
			//商品详情
			details:function(){
				var _this = this;
				this.goodsDetails(_this.$route.params.id, function(data) {

					_this.goodId = data.data.auction_product.brand_id //id
					_this.brandname= data.data.brand.name
						_this.product = data.data.auction_product
						_this.params.retail_cart.product_id=_this.product.id
						_this.skus = data.data.skus
						_this.collocation=data.data.match_products
						_this.brand=data.data.brand
							if(localStorage.sessionData){
								_this.sessionData1=JSON.parse(localStorage.sessionData);

								_this.sessionData={
											product_id:_this.product.id,
											pic:_this.product.major_pic,
											name:_this.product.name,
											discount:_this.product.discount
									}
								for(var i=0;i<_this.sessionData1.length;i++){
									
									console.log(_this.sessionData1[i].product_id==_this.sessionData.product_id)
									if(_this.sessionData1[i].product_id !=_this.sessionData.product_id){
										_this.sessionData1.push(_this.sessionData)
										_this.sessionData1.reverse()
										_this.sessionData1.slice(0,12)
										localStorage.sessionData=JSON.stringify(_this.sessionData1)
										break;
									}else{
										
										break;
									}
								}


								   }else{
								   	var num = 0;
										_this.sessionData={
											product_id:_this.product.id,
											pic:_this.product.major_pic,
											name:_this.product.name,
											discount:_this.product.discount
										}
										_this.sessionData1.push(_this.sessionData)
										localStorage.sessionData=JSON.stringify(_this.sessionData1)

								   }
							
//							for(var j=0;j<_this.sessionData.length;j++){
//								if(!_this.sessionData2[_this.sessionData1[j]){
//									
//								}
//							}

						let valueList = [];
							for (let i = 0, list = data.data.auction_values, len = list.length; i < len; i++) {
							  let isPush = true;
							  for (let j = 0, leng = valueList.length; j < leng; j++) {
							    if (valueList[j].attribute_name == list[i].attribute_name) {
							      valueList[j].content = valueList[j].content + '，' + list[i].content;
							      isPush = false;
							      break;
							    }
							  }
							  if (isPush) {
							    valueList.push({attribute_name: list[i].attribute_name, content: list[i].content});
							  }
							}
							_this.valueList = valueList;
						_this.relateProducts=data.data.relate_products
						if(_this.relateProducts==undefined){
							_this.relateShow=false
						}else{
							_this.relateShow=true
						}
						if(_this.collocation==undefined){
							_this.collocatShow=false
						}else{
							_this.collocatShow=true
						}
						for(var i=0 ;i<_this.skus.length;i++){
							if(_this.skus[i].amount!=0){
								_this.sizeShow=true
								break;
							}else{
								_this.sizeShow=false
							}
						}
//						if(_this.skus.length==0){
//							_this.sizeShow=false
//
//						}else{
//							_this.sizeShow=true
//						}
						if(_this.product.spec_pic==undefined){
							_this.sizePic=false
						}else{
							_this.sizePic=true
						}
						for(var i=0;i<_this.skus.length;i++){
							if(_this.skus[i].amount!=0){
								_this.soldOut=true
								break;
							}else{
								_this.soldOut=false
								//_this.sizeShow=false
							}
							if(_this.skus[i].name==undefined){
//								_this.soldOut=false
//								_this.sizeShow=false
							}
						}

					})
			},
			mianbao:function(){
				var _this = this;
				this.tree(function(data) {
					_this.Crumbs=data.data
					})
			}
		},
		mounted() {
			this.details()
			this.mianbao()
			var _this=this;
			_this.historys=JSON.parse(localStorage.sessionData);
			if(_this.historys){
				_this.browse=true
				if(_this.historys.length>6){
					_this.historybtn=true
				}
			}else{
				_this.browse=false
			}

//			var productData = sessionStorage.getItem('sessionData');
//			if(productData){
//				_this.sessionData+=productData
//				//sessionStorage.setItem('sessionData',JSON.stringify(_this.sessionData));
////				console.log(_this.sessionData)
//			}else{
//				_this.sessionData=productData
//			}
			setTimeout(function(){
				var $pic_zoom = $('.pic_zoom'),
					 $slide_zoom = $('.slide_img .zoom');

//
				$(".minus").on('click', function() {
				var val = parseInt($('.num').html());
				if($(this).hasClass('failed')) return;
				val--;
				$('.num').html(val);
			});
			//plus
			$(".plus").on('click', function() {
				var val = parseInt($(' .num').html());
				if($(this).hasClass('failed')) return;
				val++;
				$('.num').html(val);
			});
			$(".imgs").find("img").eq(0).css("margin", 0)
			var m = 0,
				n = 0,
				s = 1,
				m_len = ($(".imgs").find("img").length - 5) * 77;

			//点击上下按钮  实现小图滚动
			$(".btnfoot").on("click", function() {

				m -= 77;
				if(m >= -m_len) {
					$(".imgs").animate({ marginTop: m }, 600, function() {
						return false;
					})

				} else {
					m = -m_len
				}
			})
			$(".btntop").on("click", function() {
				m += 77;

				if(m <= 0) {
					$(".imgs").animate({ marginTop: m }, 600, function() {
						return false;
					})
				} else {
					m = 0;
				}

			})
			//历史记录点击滚动
			var h_len = ($(".h-ul").find("li").length - 6) * 106;
			$(".h-down").on("click", function() {
				m -= 106;
				if(m >= -h_len) {
					$(".h-ul").animate({ marginTop: m }, 600, function() {
						return false;
					})
				} else {
					m = -h_len
				}
			})
			$(".h-up").on("click", function() {
				m += 106;

				if(m <= 0) {
					$(".h-ul").animate({ marginTop: m }, 600, function() {
						return false;
					})
				} else {
					m = 0;
				}
			})
			//详情  尺码  品牌tab切换
			$(".tab-top").on("click", "li", function() {
				$(this).addClass('tab-active').siblings().removeClass('tab-active');
				$(".show-tab").children("div").eq($(this).index()).css("display", "block").siblings("div").css("display", "none")
			})
			$(".tab-top").on("click", "li", function() {
				$(this).addClass('tab-active').siblings().removeClass('tab-active');

				$(".tabs").children("div").eq($(this).index()).css("display", "block").siblings("div").css("display", "none")
			})
			//show product id
			$('.content .show').removeClass('hide');
			 $(".slidimg").on('mouseover', function(e){
			    $pic_zoom.removeClass('hide');
			    $slide_zoom.removeClass('hide');
			  });
			  $(".slidimg").on('mouseout', function(){
			    $pic_zoom.addClass('hide');
			    $slide_zoom.addClass('hide');

			  });
			$(".slidimg").on('mousemove', function(e){
		    var left = e.pageX - $(this).offset().left - $(this).find('.zoom').outerWidth()/2,
		        top = e.pageY - $(this).offset().top - $(this).find('.zoom').outerHeight()/2;
		    if(left < 0){
		      left = 0;
		    }else if(left > $(this).outerWidth() - $(this).find('.zoom').outerWidth()){
		      left = $(this).outerWidth() - $(this).find('.zoom').outerWidth();
		    }
		    if(top < 0){
		      top = 0;
		    }else if(top > $(this).outerHeight() - $(this).find('.zoom').outerHeight()){
		      top = $(this).outerHeight() - $(this).find('.zoom').outerHeight();
		    }
		    var big_left = ($pic_zoom.find('img').outerWidth() - $pic_zoom.outerWidth()) * left/($(this).find('.zoom').outerWidth() - $(this).outerWidth()),
		        big_top = ($pic_zoom.find('img').outerHeight() - $pic_zoom.outerHeight()) * top/($(this).find('.zoom').outerHeight() - $(this).outerHeight());
		    $(this).find('.zoom').css({
		      left: left + 'px',
		      top: top + 'px'
		    });
		    $pic_zoom.find('img').css({
		      left: big_left + 'px',
		      top: big_top + 'px'
		    });
		  });
			},1000)
//		setTimeout(function(){
//			let productTd=$(".productTd").attr("productid");
//			_this.sessionData.productTd=_this.product
//			sessionStorage.setItem('sessionData',JSON.stringify(_this.sessionData) );
//		},3000)
		}
	}
</script>

<style lang="sass" scoped>
	@import "../../assets/sass/products/new_show.scss";
</style>
<style scoped>
.small_imgs .imgs img:nth-child(1){
	margin-top: 0;
}
.sold_out{
	color: #fff;
	background: #ccc;
	border: none !important;
}
</style>
