<template>
	<div>
		<div id="main">
	<div class="main_content">
    <loginHeader></loginHeader>
		 <div class="middle_wrap">
      <div class="login_middle">
        <div class="login_banner loaded">
          <img src="../../assets/images/new-img/login_banner.png?20151229154423">
        </div>
        <form class="form" data-url="<%= redirect_url || '/' %>">
          <p class="form_title">{{ $t('message.register.title') }}</p>
          <div class="txt_content_email">
            <input class="account" :placeholder="$t('message.forgetPassword.phone')" name="phone" type="tel" maxlength="11" v-model="userInfo.account.phone" />
          </div>
          <div>
            <div class="auto_valid finishedcode">
              <input type="text" maxlength="8" class="valid_code" :placeholder="$t('message.forgetPassword.captach')" name="captcha" v-model="captcha"/>
              <span class="refresh_icon"></span>
              <div class="valid_img" @click="rucaptchachange"><img :src="image"/></div>
            </div>
          </div>
          <div class="txt_content newsCode">
            <input type="tel" id="code" class="code" :placeholder="$t('message.forgetPassword.code')" name="code"  maxlength="6" v-model=userInfo.message_code>
            <button class="sends" type="button" style="">{{ $t('message.forgetPassword.sends') }}</button>
          </div>
          <div class="txt_content">
            <input type="password" id="password" class="password" :placeholder="$t('message.register.place')" name="password" v-model="userInfo.account.password" />
          </div>
          <div class="txt_content">
            <input type="password" class="confirm_password" :placeholder="$t('message.forgetPassword.confirmPassword')" name="password_confirmation" v-model="userInfo.account.password_confirmation"/>
          </div>
          <!--<div class="txt_content hide">-->
            <!--<input type="text" class="user_name" placeholder="姓名" name="name" v-model="userInfo.user.name"/>-->
          <!--</div>-->
          <!--<div class="txt_content hide">-->
            <!--<input class="spread_code" placeholder="推广码(选填)" name="coupon"/>-->
          <!--</div>-->

          <div class="agree_item">
            <input class="forget_btn" name="" type="checkbox" v-model="regist" @change="check(regist)"/>
            <span class="remember_account">{{ $t('message.register.agreen') }}<router-link :to="{path:'/yonghuxieyi'}" target="_blank"><span class="youzhong_item">{{ $t('message.register.item') }}</span></router-link></span>
          </div>
          <input class="register_button" type="submit" :value="$t('message.register.submit')" :class = "{bg:!regist}" style="cursor: pointer;">
        </form>

      </div>
    </div>
    <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
    <loginFooter></loginFooter>
	</div>
</div>
	</div>
</template>
<script>
  import loginHeader from '../../components/assembly/loginHeader.vue'
  import loginFooter from '../../components/assembly/loginFooter.vue'
  import alertBox from '../../components/assembly/alert_box.vue'
  import {baseUrl} from '../../../config/config'
  import i18n from '../../assets/js/il8n'
	export default {
    i18n,
		data() {
			return {
        baseUrl,
        userInfo:{
          account:{
            phone: "",
            password: "",
            password_confirmation: "",
            client: "pc"               //客户端类型
          },
          message_code: ""
        },
        captcha: "",
        image:baseUrl + '/rucaptcha',
        alertText:"",
        alertShow:false,
        regist:true,
        times:''
			}
		},
		components: {
      loginHeader,
      loginFooter,
      alertBox
		},
		methods: {
		  //刷新图形验证码
      rucaptchachange:function(){
        this.image = baseUrl + '/rucaptcha?num='+Math.random()
      },
      time: function () {
        var _this = this;
        var num = 60;
        this.times = setInterval(function () {
          num--;
          $(".sends").text(num + _this.$t('message.forgetPassword.minuts'))
          if (num < 0) {
            clearInterval(_this.times);
            $(".sends").attr("disabled", false).css("background", "#BB1E7B");
            $(".sends").text(_this.$t('message.forgetPassword.sends'));
            return false
          }
        }, 1000)
      },
      check:function(check){
        if(check){
          $('.register_button').attr('disabled',false)
        }else{
          $('.register_button').attr('disabled',true)
        }
      }
		},
		mounted() {
		  var _this = this;
      (function(){
        $(".sends").on("click",function(){
          var regs=/^1(3|4|5|7|8)[0-9]\d{8}/;
          if(!_this.userInfo.account.phone){ //手机验证
            _this.alertText = _this.$t('message.forgetPassword.rulesPhone');
            _this.alertShow = true;
            return false
          }else if(!regs.test(_this.userInfo.account.phone)){
            _this.alertText = _this.$t('message.forgetPassword.rulesPhones');
            _this.alertShow = true;
            return false
          }
          if(!_this.captcha){//图片验证码
            _this.alertText = _this.$t('message.forgetPassword.rulescaptach');
            _this.alertShow = true;
            return false;
          }
          _this.time();
          $(".sends").css("background","#ccc").attr("disabled",true)
          //发送验证码
          _this.phoneCode({phone:_this.userInfo.account.phone,_rucaptcha:_this.captcha},function (response) {
            if(response.status != 200){
              _this.alertText = response.msg;
              _this.alertShow = true;
              _this.rucaptchachange();
              clearInterval(_this.times);
              $(".sends").attr("disabled", false).css("background", "#BB1E7B");
              $(".sends").text(_this.$t('message.forgetPassword.sends'));
              return false
            }
          })
        })
        //Cookies.set('uxuan_user_id', 0); 啥意思
        var $form = $('.form'),
          url = $form.data('url');
        jQuery.validator.addMethod("isMobile", function(value, element) {
          var length = value.length;
          var mobile = /^1[34578]\d{9}$/;
          return this.optional(element) || (length == 11 && mobile.test(value));
        }, _this.$t('message.forgetPassword.rulesPhones'));
        jQuery.validator.addMethod("isPassword", function(value, element) {
          var reg = /^\S+$/gi;
          return this.optional(element) || (reg.test(value));
        }, _this.$t('message.forgetPassword.rulerPass'));
        $form.validate({
          rules: {
            phone:{
              required:true,
              isMobile:true
            },
            captcha:{
              required:true,
            },
            code:{
              required:true
            },
            password: {
              required: true,
              isPassword:true,
              rangelength:[6,20]
            },
            password_confirmation: {
              required: true,
              equalTo: '#password'
            }
          },
          messages: {
            phone: {
              required: _this.$t('message.forgetPassword.phoneNull'),
              isMobile: _this.$t('message.forgetPassword.rulesPhones')
            },
            code:{
              required: _this.$t('message.forgetPassword.codeNull')
            },
            password: {
              required: _this.$t('message.forgetPassword.passwordNull'),
              rangelength:_this.$t('message.forgetPassword.passwordLength'),
              isPassword:_this.$t('message.forgetPassword.reg')
            },
            password_confirmation: {
              required: _this.$t('message.forgetPassword.confirmNull'),
              equalTo: _this.$t('message.forgetPassword.equalTo')
            },
            captcha: {
              required: _this.$t('message.forgetPassword.captachNull')
            }

          },
          submitHandler: function(){
            if (!$('.forget_btn').is(':checked')) {
              return false;
            }
            clearInterval(_this.times);
            _this.register(_this.userInfo,function(response){
              if(response.status == 200){
                _this.login({phone:_this.userInfo.account.phone,password:_this.userInfo.account.password}, function(response){
                  if(response.status == 200){
                    localStorage.setItem('login',JSON.stringify({phone:_this.userInfo.account.phone,password:_this.userInfo.account.password}))
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                    localStorage.setItem('loginStatus', true);
                    localStorage.setItem('userPhone', _this.userInfo.account.phone);
                    if(_this.$route.query.url){
                      _this.$router.push({path: _this.$route.query.url,query:_this.$route.query.msg});
                    }else{
                      _this.$router.push({path: '/index'});
                    }
                  }
                });
              }else if(response.status ==603){
                _this.alertText = response.msg;
                _this.alertShow = true;
                localStorage.removeItem('login')
                sessionStorage.removeItem('user');
                localStorage.setItem('loginStatus', false);
                clearInterval(_this.times);
                setTimeout(function () {
                  _this.$router.replace({ path: '/login',query:{url:_this.$route.query.url}})
                },2000)
              }else{
                _this.alertText = response.msg;
                _this.alertShow = true;
              }
            })
          }
      });
      })();
		}
	}
</script>

<style lang="sass" scoped>
	@import "../../assets/sass/register/index.scss"
</style>
<style scoped>
.newsCode{
  margin-top: 20px;
  position: relative;
}
.newsCode #code{
  width: 190px;
  height: 45px;
  display: block;
  margin-bottom: 5px;
  margin-top:22px;
}

.newsCode .sends{
  cursor: pointer;
  padding: 0 10px;
  margin-top: 8px;
  position:absolute;
  top: 0;
  right: 0;
}

.bg{
  background: #9b9a9c !important;
}
</style>
