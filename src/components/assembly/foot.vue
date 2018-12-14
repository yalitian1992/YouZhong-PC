<template>
	<div>
	<footer id="mainfoot" style="margin-top: 0px; width: 100%;" >
	<!-- foot上部 -->
		<div class="footwarp_t" style="background: #F2F2F2;">
		<div class="warpt">
			<div class="ft_left">
					<h2 style="background: #F2F2F2">{{ $t('message.foot.phone') }}</h2>
					<!-- <p style="width: 344px;line-height: 20px;border: none;text-align: left;">因400电话系统升级，特此邀请您邮件 <b style="font-weight: 900;cursor: pointer;line-height: 0"><a href="mailto:dataservice@jiguang.cn" >service@ihaveu.net</a></b>告知我们相应问题，请您在邮件处表明：待解决问题及电话。我们会在第一时间回电！	</p> -->

					<h1 style="background: #F2F2F2">400-887-5699</h1>
					<time>{{ $t('message.foot.time') }}  9:30-18:30</time>
					<!-- <p><span class="contact">在线客服</span></p> -->
			</div>
			<div class="ft_center" style="border: none;">
					<h2 style="background: #F2F2F2">{{ $t('message.foot.Story') }}</h2>
					<p>{{ $t('message.foot.text') }}</p>
					<p><span>{{ $t('message.foot.lookme') }}：</span><i class="vx"></i><!-- <i class="vb"></i> --></p>
					<div class="wxs">
						<img  class="wxs"  src="../../assets/images/footer/weichat_code.jpg" alt="" />
						<span class="sp1">
						</span>
					</div>
					<!-- <div class="wbs">
						<img src="<%= sails.config.cdn_host %>/images/footer/vb.png?20151229154423" alt="" />
						<span class="sp1">
						</span>
					</div> -->

			</div>
			<div class="ft_right" style="border-left: solid 1px #cfcfcf;">
					<div>
						<h2 style="background: #F2F2F2;font-size: 18px;color: #222222;">{{ $t('message.foot.right') }}</h2>
						<img src="../../assets/images/two.png">
						<p>{{ $t('message.foot.right2') }}</p>
					</div>
			</div>
		</div>
	</div>
	<!-- foot底部 -->
		<div class="footwarp" style="padding-bottom: 20px">
			<div class="foot_top">
					<ul>
						<li style="height: 75px;">
							<b style="margin-top: 25px;"><img src="../../assets/images/new-img/b_z.png"></b>
							<span>100%{{ $t('message.foot.title') }}</span>
						</li>
						<li style="padding-left: 105px;width: 295px;height: 75px;">
							<b style="margin-top: 25px;"><img src="../../assets/images/new-img/b_bao.png"></b>
							<span>{{ $t('message.foot.title1') }}</span>
						</li>
						<li style="margin-left: 80px;width: 300px;height: 75px;">
							<b style="margin-top: 25px;"><img src="../../assets/images/new-img/7day.png"></b>
							<span>{{ $t('message.foot.title2') }}</span>
						</li>
					</ul>
			</div>

			<div class="foot_b">
			<div class="fwarp" style="height: 145px;">

				<div class="foot_left">
					<ul>
						<li style="padding-left: 0;border: none;cursor: pointer;"><a href="http://www.ihaveu.com/about/people">{{ $t('message.foot.name') }}</a></li>
						<li style="cursor: pointer;"><a href="http://www.ihaveu.com/index.html#subapp=believe&mid=320&page=1">{{ $t('message.foot.name1') }}</a></li>
						<li style="cursor: pointer;"><a href="http://www.ihaveu.com/about/contact">{{ $t('message.foot.name2') }}</a></li>
						<li style="cursor: pointer;"><a href="http://www.ihaveu.com/about/report">{{ $t('message.foot.name3') }}</a></li>
						<li style="cursor: pointer;"><a href="http://www.ihaveu.com/about/jobs">{{ $t('message.foot.name4') }}</a></li>
						<li style="cursor: pointer;"><a @click="releaseShow">{{ $t('message.foot.name5') }}</a></li>

					</ul>
					<p><span>{{ $t('message.foot.footText') }}&nbsp;©2017&nbsp;ihaveu.com&nbsp;{{ $t('message.foot.footText2') }}&nbsp;&nbsp;&nbsp;&nbsp;</span><span> {{ $t('message.foot.footText3') }}&nbsp;&nbsp;&nbsp;</span></p>
					<p><a href="http://www.miitbeian.gov.cn" style="color: #BBBBBB;">{{ $t('message.foot.footText4') }}</a></p>
					<p style="padding-bottom: 30px;"><a href="http://beian.gov.cn" style="color: #BBBBBB;">{{ $t('message.foot.footText5') }}<i></i></a></p>
				</div>
				<div class="foot_right">

					<a href="http://www.ihaveu.com/auction/mails/2636" style="display: block;"><img style="margin-left: 0;margin-top: 0;" src="../../assets/images/new-img/1.png"></a>
					<a href="https://www.95516.com/static/union/pages/index/index.html" style="display: block;"><img style="margin-top: 0;" src="../../assets/images/new-img/2.png"></a>
					<a href="https://credit.cecdc.com/CX20121222002107002162.html" style="display: block;"><img style="margin-top: 0;" src="../../assets/images/new-img/3.png"></a>
					<a href="http://www.ihaveu.com/auction/mails/2721" style="display: block;"><img style="margin-left: 0;" src="../../assets/images/new-img/4.png"></a>
					<a href="http://www.ectrustprc.org.cn/certificate.id/certificater.php?id=10095214" style="display: block;"><img src="../../assets/images/new-img/5.png"></a>
					<a href="http://na3.tjaic.gov.cn/netmonitor/query/ScrNetEntQuery/Display.do?show=1&id=7d14e80b7f0000011ec3c0e51d56b539-0-v-e-r-&ztLOID=8662f0af7f00000142ef47dfea838e58" style="display: block;"><img src="../../assets/images/new-img/6.png"></a>
				</div>

			</div>
    </div>
	</div>
  </footer>
  <div class="feedbacks" v-if="releases">
  		<div class="dialog_contents">
			<div class="feeb_top">
				<span class="xinxi"></span><p> {{ $t('message.foot.name5') }}<span>FEEDBACK</span></p>
			</div>
			<div class="feed_center">
				<p style="text-align: left;">{{ $t('message.foot.tianxie') }}：</p>
				<p style="margin-top: 20px;">
					 <textarea placeholder="字数不超过100字"  rows="6" cols="30" v-model="description"> </textarea>
				</p>
				<div class="feed_bottom">
					<p ><span class="tel"></span> {{telephone}}</p>
					<p style="margin-left: 40px;"><span class="emil"></span> <span style=" text-decoration: underline;line-height: 31px;">youzhong@ihaveu.net</span></p>
				</div>
				<div class="release" @click="release">
					{{ $t('message.foot.fabu') }}
				</div>
				<div class="clones" @click="releaseclonse">

				</div>
			</div>
		</div>
  </div>
</div>
</template>
<script>
	import headTop from '../../components/assembly/headTop.vue'
	import normalHead from '../../components/assembly/normal_head.vue'
	import footErs from '../../components/assembly/foot.vue'
	import { myfun } from '../../assets/js/products_inddex.js'
	import {telephone} from '../../../config/config'
	import i18n from '../../assets/js/il8n.js'
	export default {
		i18n,
		data() {
			return {
				report:{"report":{"description":{}}},
				description:"",
				releases:false,
				telephone
			}
		},
		components: {

		},
		methods: {
			releaseShow:function(){
				this.releases=true
			},
			releaseclonse:function(){
				this.releases=false
			},
			release:function(){
				var _this=this;
				_this.report.report.description=_this.description
				this.feedback(_this.token(),_this.report,function(data){
					_this.releases=false
				})
			},
		},
		mounted() {
			$(".contact").css("cursor", "pointer");
			$(".vx").hover(function(){
				$(".wxs").css("display","block")
			},function(){
				$(".wxs").css("display","none")
			});
			$(".vb").hover(function(){
				$(".wbs").css("display","block")
			},function(){
				$(".wbs").css("display","none")
			});
		}
	}
</script>
<style scoped>
	.feedbacks{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 400;

	}
	.dialog_contents {
		display: block;
    width: 1000px;
    height: 560px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    left:50%;
    top: 50%;
    z-index: 50;
    opacity: 1;
    position: relative;
    margin: -280px 0 0 -500px;
	}
	.actions{
		margin-top: 80px;
		background: #BB1E7B;
		color: #fff;
		padding: 8px 12px;
		border-radius: 3px;
		cursor: pointer;
	}
	.feeb_top{
		position: absolute;
		top: 30px;
		left: 28px;
		font-size: 18px;
		font-weight: bold;
		padding-left: 35px;
	}
	.feeb_top span{
		font-size: 14px;
		font-weight: normal;
	}
	.feed_center{
		position: absolute;
		left: 160px;
		top: 100px;
	}
	.feed_center p textarea{
		width: 664px;
		height: 220px;
		border: solid 1px #ccc;
		padding: 10px;
	}
	.feed_bottom p{
		float: left;
		color: #666;
		margin-top: 10px;
	}
	.release{
		background: #615D5D;
		display: inline-block;
		padding: 5px 10px;
		color: #fff;
		font-size: 14px;
		border-radius: 3px;
		position: absolute;
		bottom: -100px;
		right: 0;
		cursor:pointer;
	}
	.clones{
		width: 30px;
		height: 30px;
		background: url(~@/assets/images/clones.png);
		position: absolute;
		right: -120px;
		top: -72px;
		cursor:pointer;
	}
	.xinxi{
		display: inline-block;
		width: 30px;
		height: 30px;
		background: url(~@/assets/images/xinxi.png);
		position: absolute;
		left: 0;
		top: -4px;
	}
	.tel{
		display: inline-block;
		width: 30px;
		height: 26px;
		background: url(~@/assets/images/tel.png);
	}
	.emil{
		display: inline-block;
		width: 30px;
		height: 26px;
		background: url(~@/assets/images/emil.png);
		position: absolute;

	}
</style>
<style lang="sass">
	@import "../../assets/sass/new_style/new_foot.scss"
</style>

