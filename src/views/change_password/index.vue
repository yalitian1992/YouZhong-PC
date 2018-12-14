<template>
  <div>
    <headTop></headTop>
    <normalHead></normalHead>
    <div style="height: 40px;"></div>
    <div class="content mt40">
      <userSide></userSide>
      <div class="right_content">
        <div class="change_password_title">{{ $t('message.password.title') }}</div>
        <div class="change_password_content">
          <div class="text_name_area">
            <ul>
              <li>{{ $t('message.password.pwd') }}</li>
              <li>{{ $t('message.password.pwdNew') }}</li>
              <li>{{ $t('message.password.pwdagain') }}</li>
            </ul>
          </div>
          <form class="text_field_area">
            <div class="input_wrap">
              <input type="password" v-model="acc.account.old_password" name="old_password" id="current_password" maxlength="20"/>
            </div>
            <div class="input_wrap">
              <input type="password" v-model="acc.account.password" name="password" id="password" maxlength="20"/>
            </div>
            <div class="input_wrap">
              <input type="password" v-model="con_password" name="confirm_password" id="confirm_new_password" maxlength="20"/>
            </div>
            <input class="change_password_confirm_button" type="submit" @click="Modify_pwd(acc.account.old_password,acc.account.password,con_password)" :value="$t('message.password.tip')">
          </form>
        </div>
      </div>
    </div>
    <footErs></footErs>
    <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
  </div>
</template>

<style lang="sass" scoped>
  @import "../../assets/sass/sass-statement.scss"
  @import "../../assets/sass/change_password/index.scss"
</style>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import normalHead from '../../components/assembly/normal_head.vue'
  import footErs from '../../components/assembly/foot.vue'
  import userSide from '../../components/assembly/userCenterSide.vue'
  import alertBox from '../../components/assembly/alert_box.vue'

  import i18n from '../../assets/js/il8n.js'


  export default {
    i18n,
    data() {
      return {
        id:'',
        alertText:"",
        alertShow:false,
        acc:{
          account:{
            old_password: '',
            password: ''
          }
        },
        con_password: '',

      }
    },
    components: {
      headTop,
      normalHead,
      footErs,
      userSide,
      alertBox
    },
    methods: {
      Modify_pwd: function(oldpwd,pwd,con_pwd){
        var _this = this;
        /*let old,password1,password2 = ''
        old = oldpwd
        password2 = con_pwd
        password1 = pwd*/

        if(pwd == con_pwd){
          this.modifyUser(_this.token(),_this.id,{
            account:{
              old_password: oldpwd,
              password: pwd
            }},function(data){
            if(data.status == 200){
              _this.alertShow=true
              _this.alertText=data.msg
            }else{
              _this.alertShow=true
              _this.alertText=data.msg
            }
          })
        }
      }
    },
    mounted() {
//      jQuery('form').validate();
      var $form = $('.text_field_area');
      $form.validate({
        rules: {
          old_password: {
            required: true,
//            minlength: 6
            rangelength:[6,20]
          },
          password: {
            required: true,
            rangelength:[6,20]
          },
          confirm_password: {
            required: true,
            rangelength:[6,20],
            equalTo: '#password'
          }
        },
        messages: {
          old_password: {
            required: this.$t('message.password.old_password'),
            rangelength: this.$t('message.password.passlengthtip')
          },
          password: {
            required: this.$t('message.forgetPassword.passwordNull'),
            rangelength: this.$t('message.password.passlengthtip')
          },
          confirm_password: {
            required: this.$t('message.forgetPassword.confirmNull'),
            rangelength: this.$t('message.password.passlengthtip'),
            equalTo: this.$t('message.password.equ')
          }
        },
        submitHandler: function(form){
          var params_array = [];
          $.map($(form).serializeArray(), function(i, k){
            //return i.name = 'account[' + i.name + ']';
            if(i.name != 'confirm_password'){
              params_array.push('core_account[' + i.name + ']=' + i.value);
            }
          });
        }
      });
      if(sessionStorage.getItem('user')){
        this.id = JSON.parse(sessionStorage.getItem('user')).auction_user.id;
      }
    }
  }
</script>
