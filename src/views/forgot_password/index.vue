<template>
  <div>
    <div style="background: #fff; width: 100%">
      <loginHeader></loginHeader>
    </div>
    <div class="middle_wrap">
      <form class="form">
        <div class="find_password_content">
          <div class="fonts_passwords">{{ $t('message.forgetPassword.title') }}</div>
          <div class="mainBox">
            <div class="txt_content">
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
              <input type="password" id="password" class="password" :placeholder="$t('message.forgetPassword.password')" name="password" maxlength="20" v-model="userInfo.account.password" />
            </div>
            <div class="txt_content">
              <input type="password"  class="confirm_password" :placeholder="$t('message.forgetPassword.confirmPassword')" name="password_confirmation" maxlength="20" v-model="userInfo.account.password_confirmation"/>
            </div>
            <input class="register_button" type="submit" :value="$t('message.forgetPassword.submit')" style="cursor: pointer;">
          </div>
        </div>
      </form>
      <div class="bottom_bg"></div>
    </div>
    <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
    <loginFooter></loginFooter>
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
          },
          message_code: ""
        },
        captcha: "",
        image:baseUrl + '/rucaptcha',
        alertText:"",
        alertShow:false,
        times:''
      }
    },
    components: {
      loginHeader,
      loginFooter,
      alertBox
    },
    methods: {
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
      }
    },
    mounted() {
      var _this = this;
      (function(){
        _this.rucaptchachange()
        $(".sends").on("click",function(){
          var regs=/^1(3|4|5|7|8)[0-9]\d{8}/;
          if(!_this.userInfo.account.phone){ //手机验证
            _this.alertText = _this.$t('message.forgetPassword.rulesPhone');
            _this.alertShow = true;
            return false;
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
              _this.alertText = response.msg
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
              required:true
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
            captcha:{
              required: _this.$t('message.forgetPassword.captachNull')
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
            }
          },
          submitHandler: function(){
            _this.forgetPassword(_this.userInfo,function(response){
              _this.alertText = response.msg;
              _this.alertShow = true;
              if(response.status == 200){
                clearInterval(_this.times);
                setTimeout(function () {
                  _this.$router.push({ path: '/login'})
                },2000)
              }
            })
          }
        });
      })();
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/forgot_password/index"

</style>
<style type="scss" scoped>
  .find_password_content{
    padding:60px 0;
  }
  .find_password_content .fonts_passwords{
    margin-bottom:15px;
  }
  .mainBox{
    background: #fff;
    width: 315px;
    margin: 0  auto;
  }
  .txt_content input{
    margin-top: 10px;
    width: 315px;
    height: 45px;
    border: 1px solid #CCC;
    padding: 0 10px;
    font-size: 14px;
    margin-bottom: 5px;
  }
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
    height: 30px;
    background: #BB1E7B;
    color: #fff;
    border: none;
    margin-left: 10px;
  }
  .auto_valid {
    height: 75px;
    position: relative;
  }
  .auto_valid .valid_code {
    position: relative;
    margin-top: 22px;
    width: 315px;
    height: 45px;
    border: 1px solid #CCC;
    padding: 0 10px;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .auto_valid .valid_img {
    float: right;
    position: relative;
    top: -47px;
    right: 10px;
  }
  .auto_valid .valid_img img {
    width: 100px;
    height: 35px;
  }
</style>
