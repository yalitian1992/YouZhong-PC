<template>
<div>
	<headTop></headTop>
	<normalHead></normalHead>
	<div style="width: 100%;height: 100%;background: #fff;margin-top: -23px;padding-top: 25px;padding-bottom: 40px;">
	  <div id="crumbs" class="content" style="margin-top: 55px; background: #fff;border: none;">
				<router-link :to="{path:'/index'}" class="product_ico house_tag" style="font-size: 12px;color: #777;width: 28px;line-height: 16px;background:none;" >{{ $t('message.brands.first') }}</router-link>
				 <div class="ico next_ico" style="color: #777;font-size: 12px;background: none;"> > </div>
				    <!--<a class="text list" href="<%= item.url %>" ></a>-->
				    <p class="text" >{{ $t('message.brands.whole') }}<em class="ico"></em></p>
	</div>
	<div class="index_brand" style="margin-top: 26px;">
	        <div class="b_toplist">
	            <h1>{{ $t('message.brands.title') }}</h1>
	            <ul>
	                <li style="cursor: pointer;" v-for="(item, index) in hotList" >
	                	<router-link :to="{path:'/auction/products',query:{brandId:item.id}}" target="_blank">
	                        <div class="loaded">
	                           <img :src="imgBaseUrl() +item.pic" alt="">
	                        </div>
	                        <div class="b_listfoot">
	                            <h2 style="font-size: 18px;font-weight: normal;">{{item.name}}</h2>
	                            <p>{{ item.description}}</p>
	                        </div>
	                     </router-link>
	                </li>
	            </ul>
	        </div>
	    <div class="b_center">
	            <h1>{{ $t('message.brands.whole') }}</h1>
	            <span >
	             </span>
	            <div class="b_text" >
	                <span >{{ $t('message.brands.letterSelection') }}</span>
	                <a v-for="(item, index) in brandData"  style="cursor: pointer;" href="javascript:void(0)"  @click="goAnchor('#'+item.text)" >{{item.text}}</a>
	            </div>
	            <div class="Alphabet_list">
	                <ul>
	                    <li v-for="(item, index) in brandData" :id="item.text" >
	                        <span>{{item.text}}</span>
	                        <div class="Product" >

	                        	<router-link  v-for="(n, index) in item.list" :to="{path:'/auction/products',query:{brandId:n.id}}" target="_blank" :key="item.id">
		                        {{n.name}} {{n.chinese}}
		                        </router-link>
	                        </div>
	                    </li>

	                </ul>
	            </div>
	            <div class="gotop">
	                <a @click="goback" style="cursor:pointer；">{{ $t('message.brands.goTop') }}</a>
	            </div>
	        </div>
	    </div>
		<div class="clearfloat"></div>
		</div>
	    <footErs></footErs>
	</div>
</template>
<script>
	import headTop from '../../components/assembly/headTop.vue'
	import normalHead from '../../components/assembly/normal_head.vue'
	import footErs from '../../components/assembly/foot.vue'
	import {imgBaseUrl} from '../../../config/config'
	import i18n from '../../assets/js/il8n.js'
	export default {
		i18n,
		data() {
			return {
			imgBaseUrl,      //图片域名
			hotList:[],
			brandData: {
		          a: {text: 'A', isShow: false, list: []},
		          b: {text: 'B', isShow: false, list: []},
		          c: {text: 'C', isShow: false, list: []},
		          d: {text: 'D', isShow: false, list: []},
		          e: {text: 'E', isShow: false, list: []},
		          f: {text: 'F', isShow: false, list: []},
		          g: {text: 'G', isShow: false, list: []},
		          h: {text: 'H', isShow: false, list: []},
		          i: {text: 'I', isShow: false, list: []},
		          j: {text: 'J', isShow: false, list: []},
		          k: {text: 'K', isShow: false, list: []},
		          l: {text: 'L', isShow: false, list: []},
		          m: {text: 'M', isShow: false, list: []},
		          n: {text: 'N', isShow: false, list: []},
		          o: {text: 'O', isShow: false, list: []},
		          p: {text: 'P', isShow: false, list: []},
		          q: {text: 'Q', isShow: false, list: []},
		          r: {text: 'R', isShow: false, list: []},
		          s: {text: 'S', isShow: false, list: []},
		          t: {text: 'T', isShow: false, list: []},
		          u: {text: 'U', isShow: false, list: []},
		          v: {text: 'V', isShow: false, list: []},
		          w: {text: 'W', isShow: false, list: []},
		          x: {text: 'X', isShow: false, list: []},
		          y: {text: 'Y', isShow: false, list: []},
		          z: {text: 'Z', isShow: false, list: []}
		        }
			}
		},
		components: {
			headTop,
			normalHead,
			footErs
		},
		methods: {
			goback:function(){
				document.body.scrollTop = 0;
			},
			goAnchor:function(selector){
				 var anchor = this.$el.querySelector(selector)
		        document.body.scrollTop = anchor.offsetTop; // chrome
		        document.documentElement.scrollTop = anchor.offsetTop; // firefox
			}

		},
		mounted() {
			sessionStorage.removeItem('alHttpData')
		 var _this = this;
		 var localList= JSON.parse(sessionStorage.getItem('brandList'));
			 if(localList!=null){
			 	  let brandList = localList;
		        for (let i = 0, len = brandList.length; i < len; i++) {
		          let brand = brandList[i];
		          if(brand.recommend=="hot"){
						_this.hotList.push(brand)
					}
		       _this.hotList=_this.hotList.slice(0,8)
		          switch (brand.initial) {
		            case 'A':
		              _this.brandData.a.list.push(brand);
		              break;
		            case 'B':
		              _this.brandData.b.list.push(brand);
		              break;
		            case 'C':
		              _this.brandData.c.list.push(brand);
		              break;
		            case 'D':
		              _this.brandData.d.list.push(brand);
		              break;
		            case 'E':
		              _this.brandData.e.list.push(brand);
		              break;
		            case 'F':
		              _this.brandData.f.list.push(brand);
		              break;
		            case 'G':
		              _this.brandData.g.list.push(brand);
		              break;
		            case 'H':
		              _this.brandData.h.list.push(brand);
		              break;
		            case 'I':
		              _this.brandData.i.list.push(brand);
		              break;
		            case 'J':
		              _this.brandData.j.list.push(brand);
		              break;
		            case 'K':
		              _this.brandData.k.list.push(brand);
		              break;
		            case 'L':
		              _this.brandData.l.list.push(brand);
		              break;
		            case 'M':
		              _this.brandData.m.list.push(brand);
		              break;
		            case 'N':
		              _this.brandData.n.list.push(brand);
		              break;
		            case 'O':
		              _this.brandData.o.list.push(brand);
		              break;
		            case 'P':
		              _this.brandData.p.list.push(brand);
		              break;
		            case 'Q':
		              _this.brandData.q.list.push(brand);
		              break;
		            case 'R':
		              _this.brandData.r.list.push(brand);
		              break;
		            case 'S':
		              _this.brandData.s.list.push(brand);
		              break;
		            case 'T':
		              _this.brandData.t.list.push(brand);
		              break;
		            case 'U':
		              _this.brandData.u.list.push(brand);
		              break;
		            case 'V':
		              _this.brandData.v.list.push(brand);
		              break;
		            case 'W':
		              _this.brandData.w.list.push(brand);
		              break;
		            case 'X':
		              _this.brandData.x.list.push(brand);
		              break;
		            case 'Y':
		              _this.brandData.y.list.push(brand);
		              break;
		            case 'Z':
		              _this.brandData.z.list.push(brand);
		              break;
		          }
		        }
		        for (let j in _this.brandData) {
		          if (_this.brandData[j].list.length != 0) {
		            _this.brandData[j].isShow = true;
		          }
		        }
					 $(document).on('scroll',function(){
					        if ($(document).scrollTop() >= (840)) {
					            $(".b_text").css({"position":"fixed","top":"-20px"})
					        }else{
					            $(".b_text").css("position","static")
					        }
					});
				}
			 }
		      
	}
</script>

<style lang="sass" scoped>
	@import "../../assets/sass/new_style/new-brande-show.scss";
</style>
<style scoped>
	.loaded{
		    width: 265px;
		    height: 138px;
		    overflow: hidden;
	}
</style>
