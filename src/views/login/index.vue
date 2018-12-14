<template>
  <div id="main">
    <loginHeader></loginHeader>
    <div class="main_content">
      <div class="middle_wrap" style="#EDEDED">
        <div class="login_middle">
          <div class="login_banner loaded">
            <img src="../../assets/images/new-img/login.png">
          </div>
          <form class="form" data-url="<%= redirect_url ||'/' %>">
            <p class="form_title">{{ $t('message.login.login') }}</p>

            <!-- <div class="account_alert loaded"><span class="account_alert_icon"></span></div> -->
            <div class="txt_content_email">
              <input type="text" class="account" :placeholder="$t('message.login.phone')" name="login" v-model="user.phone" />
            </div>
            <!-- <div class="password_alert show_account_alert loaded"><span class="password_alert_icon"></span></div> -->
            <div class="txt_content">
              <input class="password" :placeholder="$t('message.login.padd')" name="password" type="password" v-model="user.password" autocomplete="off"/>
            </div>
            <div class="check_font_show">
              <input class="forget_btn" name="" type="checkbox" value="" v-model="ckeck"/><span class="remember_account">{{ $t('message.login.jizhu') }}</span><span class="old_user">{{ $t('message.login.texts') }}</span>
            </div>
            <!-- <div class="login_button">登录</div> -->
            <input class="login_button" type="submit" :value=" $t('message.login.denglu')" style="background: #BB1E7B">
            <div class="forget_password">
              <router-link :to="{path: '/register',query:{url:this.$route.query.url,msg:this.$route.query.msg}}">{{ $t('message.login.noLogin') }}？<span class="free_resister" style="color: #BB1E7B">{{ $t('message.login.mianfei') }}</span></router-link>
              <router-link :to="{path: '/forgot',query:{url:this.$route.query.url}}" class="forget_link" >{{ $t('message.login.wangji') }}？</router-link>
            </div>
          </form>
        </div>
      </div>
      <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
      <loginFooter></loginFooter>
    </div>
  </div>
</template>

<script>
  import loginHeader from '../../components/assembly/loginHeader.vue'
  import loginFooter from '../../components/assembly/loginFooter.vue'
  import alertBox from '../../components/assembly/alert_box.vue'
  import md5 from 'js-md5';
  import i18n from '../../assets/js/il8n.js'
  export default {
    i18n,
		data() {
			return {
        user:{
          phone: "",
          password: ""
        },
				username:"",
				password:"",
        alertText:"",
        alertShow:false,
        ckeck:true
			}
		},
		components: {
      loginHeader,
      loginFooter,
      alertBox
		},
		methods: {

		},
		mounted() {
		  var _this = this;
      (function(){
        var $form = $('.form'),
          url = $form.data('url');
        //login
        $form.validate({
          rules: {
            login: {
              required: true
            },
            password: {
              required: true
            }
          },
          messages: {
            login: {
              required: _this.$t('message.login.recode')
            },
            password: {
              required: _this.$t('message.login.passcode')
            }
          },
          submitHandler: function(){
            _this.login(_this.user, function(response){
              if(response.status == 200){
                if (_this.ckeck){
                  localStorage.setItem('login', JSON.stringify(_this.user));
                }
                sessionStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('userPhone', _this.user.phone);
                if(_this.$route.query.url){
                  _this.$router.push({path: _this.$route.query.url,query:_this.$route.query.msg});
                }else{
                  _this.$router.push({path: '/index'});
                }
              }else{
                _this.alertText = response.msg;
                _this.alertShow = true;
              }
            });
          }
        });
      })();
		}
	}
</script>

<style lang="sass" scoped>
	@import "../../assets/sass/login/index.scss"
</style>

