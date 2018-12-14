<template>
<div>
	<div id="topnav" style="background: #EEEEEE;">
	  <div class="content">
      <router-link :to="{path:'/index'}" target="_blank">{{ $t('message.headTop.title') }}</router-link>
	    <ul class="right" style="margin-top: -1px;">

	  	    <li class="bdn" v-if="!userlogin"><router-link :to="{path:'/login'}"><span>{{ $t('message.headTop.login') }}</span></router-link></li>
	  		  <li v-if="!userlogin"><router-link :to="{path:'/register'}"><span>{{ $t('message.headTop.resige') }}</span></router-link></li>

	  	    <li id="username" class="bdn" v-if="userlogin">
            <router-link :to="{path:'/user_center'}">
              <span>{{userName || userPhone}}</span>
            </router-link>
          </li>
	  	    <li v-if="userlogin"><a class="logout" @click="outlogin"><span>[{{ $t('message.headTop.out') }}]</span></a></li>

	      <li>
          <!--<a href="/trades"><span>我的订单</span></a>-->
          <router-link :to="{path:'/trades'}"><span>{{ $t('message.headTop.trades') }}</span></router-link>
        </li>
	      <li>
          <!--<a href="/user_center"><span>个人中心<em class="ico down_ico hide"></em></span></a>-->
          <router-link :to="{path:'/user_center'}"><span>{{ $t('message.headTop.home') }}<em class="ico down_ico hide"></em></span></router-link>
        </li>

	      <li>
          <!--<a href="/helps/xinshoushuoming" target="_blank"><span>购物须知</span></a>-->
          <router-link :to="{path:'ruhegoumai'}"><span>{{ $t('message.headTop.shipping') }}</span></router-link>
        </li>
	      <li class="bdn ntalker" data-ntalker-name="<%=user_name%>" data-ntalker-level="<%=user_level%>">
	          <!-- <a onclick="NTKF.im_openInPageChat('kf_9241_1461918201981')"><span><em class="ico ntalker_ico"></em>在线客服</span></a> -->
	          <a style="cursor: default;"><span><em class="ico ntalker_ico"></em>{{telephone}}</span></a>
	      </li>

	    </ul>
  </div>
</div>
</div>
</template>

<script>
  import loginHeader from '../../components/assembly/loginHeader.vue'
  import loginFooter from '../../components/assembly/loginFooter.vue'
  import alertBox from '../../components/assembly/alert_box.vue'
  import {telephone} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        userName:'',
        userPhone:'',
        telephone,
        userlogin:false,
        remember:'',
        loginInfo:'',
        userInfoLocal:{},
        userInfoSess:{},
        loginChange:''
      }
    },
    components: {

    },
    methods: {
      outlogin:function(){
        var _this = this;
        _this.loginOut(this.token(),function(){
          localStorage.removeItem('login')
          sessionStorage.removeItem('user');
          localStorage.setItem('loginStatus', false);
          _this.$router.push({ path: '/login'})
        })
      }
    },
    mounted() {
      var _this = this;
      if(localStorage.getItem('loginStatus') == 'true'){
        _this.loginChange = localStorage.getItem('userPhone')
        _this.userlogin = sessionStorage.getItem('user');
        if(_this.userlogin){
          let oldPhone = JSON.parse(sessionStorage.getItem('user')).phone
          if(_this.loginChange == oldPhone){
            _this.userInfoSess = JSON.parse(sessionStorage.getItem('user'));
            _this.userName = this.userInfoSess.auction_user.name;
            _this.userPhone = JSON.parse(sessionStorage.getItem('user')).phone
          }else{
            if (localStorage.getItem('login')) {
              let user = JSON.parse(localStorage.getItem('login'))
              var _this = this;
              this.login(user, function (response) {
                if (response.status == 200) {
                  sessionStorage.setItem('user', JSON.stringify(response.data));
                  localStorage.setItem('loginStatus', true);
                  localStorage.setItem('userPhone', user.phone);
                  _this.$router.go(0)
                } else {
                  _this.$router.replace({path: '/login', query: {url: path, msg: query}})
                }
              })
            } else {
              this.$router.replace({path: '/login', query: {url: path, msg: query}})
            }
          }
        }else{
          if(localStorage.getItem('login')){
            let user = JSON.parse(localStorage.getItem('login'))
            _this.login(user, function(response) {
              if (response.status == 200) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
                _this.$router.go(0)
              }else{
                _this.userlogin =''
                localStorage.removeItem('login')
              }
            })
          }
        }
      }else{
        localStorage.removeItem('login')
        sessionStorage.removeItem('user');
        _this.userlogin =''
      }

    }
  }
</script>

<style scoped>
	.right{
		margin-top: 5px;
	}
</style>
