<template>
	<div class="down">
	<div class="main" style="height: 945px;">
			<div class="ihaveu_nav" style="height: 61.4px;">
				<router-link :to="{path:'/index'}"  style="height:inherit;width:inherit;">
				
					<div style="height:inherit;width:inherit;"></div>
				
				</router-link>
			</div>
			<div class="download_link" style="margin-left: 563.58px; margin-top: 334.57px;">
				<div class="ios_app" data-href="http://www.baidu.com" style="height: 53.4392px;">
					<a style="height:60px;width:200px;" href="https://itunes.apple.com/us/app/you-zhong/id506299184?mt=8&amp;uo=4">
					<div style="height:inherit;width:inherit;"></div>
					</a>
				</div>
				<div class="android_app" style="height: 53.4392px; margin-top: 18.0842px;">
					<a style="height:60px;width:200px;" href="http://m.ihaveu.com/cdn/android/ihaveu_latest.apk">
					<div style="height:inherit;width:inherit;"></div>
				</a>
				</div>
			</div>
		</div>
		</div>
</template>

<script>

	export default {
		
		data() {
			return {
			}
		},
		components: {
			
		},
		methods: {
			
		},
		mounted() {
			
			setTimeout(function() {
				

			}, 1000)
		}
	}
</script>
<style scoped>
		html, body { height:100%; background-color: #ffffff;}
		body { 
			margin:0; padding:0; 
			overflow:hidden; 
			text-align: center;
			/*background-image: url('resource/app_background.jpg?r=201703081705');*/
			background-repeat:no-repeat;
			background-size: cover;
			 }
		.main {
			width: inherit;
			height: inherit;
			max-width: 1920px;
			margin-left: auto;
			margin-right: auto;
			overflow:hidden; 
			/*background-image: url('resource/for_dowmload_app.jpg?r=201703081705');*/
			background-repeat:no-repeat;
			background-size: cover;
			}
		.ihaveu_nav {
			width: 16%;
		}
		.download_link {
			width: 10.5%;
		}
		.down{
			background-image: url(~@/assets/images/down.png);
		}
</style>