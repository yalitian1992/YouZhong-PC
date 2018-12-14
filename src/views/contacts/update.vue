<template>
  <div>
    <headTop></headTop>

    <div id="mainhead">
      <div class="content">
        <logo></logo>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <div class="form_header">{{ $t('message.createAddress.titleCreate') }}</div>
        <form class="form">
          <ul>
            <li class="receiver_name">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.name') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input class="name_input border_input" maxlength="30" name="name" v-model="address.contact.name"/>&nbsp;&nbsp;
            </li>
            <li class="address">
            	<!--省市县-->
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.address') }}&nbsp;&nbsp;&nbsp;
              <label class="lbl_select state_label">
                <select class="select_box province" name="province" v-model="address.contact.province" @change="provinceSelect">
                  <option value="">{{ $t('message.createAddress.province') }}</option>
                  <option v-for="(item, index) in provinceArray" :value="item.name">{{item.name}}</option>
                </select>
              </label>
              <label class="lbl_select state_label">
                <select class="select_box city" name="city" v-model="address.contact.city" @change="citiesSelect">
                  <option value="">{{ $t('message.createAddress.city') }}</option>
                  <option v-for="(item, index) in cityArray" :value="item.name">{{item.name}}</option>
                </select>
              </label>
              <label class="lbl_select state_label">
                <select class="select_box area" name="town" v-model="address.contact.town">
                  <option value="">{{ $t('message.createAddress.town') }}</option>
                  <option v-for="(item, index) in townArray" :value="item.name">{{item.name}}</option>
                </select>
              </label>
            </li>
            <li class="detail_address">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.add') }}&nbsp;&nbsp;&nbsp;
              <input class="detail_address_input border_input" maxlength="50" value="" name="address"
                     v-model="address.contact.address"/>&nbsp;&nbsp;
              <!-- <span class="ico alert"></span> -->
            </li>
            <li class="postcode">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.postcode') }}&nbsp;&nbsp;&nbsp;
              <input type="tel" class="postcode_input border_input" maxlength="6" name="postcode"
                     v-model="address.contact.postcode"/>&nbsp;&nbsp;
              <!-- <span class="ico alert"></span> -->
            </li>
            <li class="telephone">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.phone') }}&nbsp;&nbsp;&nbsp;
              <input class="telephone_input border_input" maxlength="12" :placeholder="$t('message.createAddress.phoneRuler')" name="mobile"
                     v-model="address.contact.phone"/>&nbsp;&nbsp;
            </li>
            <li class="select_address">
              <div class="setBtn">
                <input name="" type="checkbox" value="" v-model="checked"/>{{ $t('message.createAddress.def') }}
              </div>
            </li>
          </ul>
          <div class="button_area">
            <input class="submit save_btn" type="submit" :value="$t('message.createAddress.saveaddress')">
          </div>
        </form>
      </div>
    </div>
    <footErs></footErs>
  </div>
</template>
<style lang="sass" scoped>
  @import "../../assets/sass/contacts/create"
</style>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import logo from '../../components/assembly/logo.vue'
  import footErs from '../../components/assembly/foot.vue'
  //import {} from '../../assets/js/contacts/create.js'
  import i18n from '../../assets/js/il8n'
  export default {
    i18n,
    data() {
      return {
        address: {
          contact: {
            "name": "",
            "province": "",
            "city": "",
            "town": "",
            "address": "",
            "postcode": "",
            "phone": "",
          }
        },
        checked: false,
        id: this.$route.query.id,
        provinceArray:[],
        cityArray:[],
        townArray:[],
        provinceNumber:'',
        cityNumber:'',
        townNumber:'',
        numMsg:false

      }
    },
    components: {
      headTop,
      logo,
      footErs
    },
    watch:{
      'provinceArray':function(){
        if(this.numMsg){
          alert(3)
          this.address.contact.province = this.provinceNumber
        }
      },
      'provinceNumber':function(){
        if(this.provinceNumber){
          this.numMsg= true;
        }else{
          this.numMsg= false;
        }
      }
    },
    methods: {
      provinceSelect: function(){
        var provinces =  this.provinceArray;
        this.address.contact.city = "";//清空市区数据
        this.address.contact.town = "";
        this.townArray=[];
        this.cityArray =[];//end
        if(this.address.contact.province){
          for(var i=0; i<provinces.length; i++){
            if(provinces[i].name == this.address.contact.province){
              this.cityArray= provinces[i].cities;
              this.provinceNumber ="";
              if(this.cityNumber){
                this.address.contact.city = this.cityNumber;
              }
            }
          }

        }
      },
      citiesSelect: function(){
        this.townArray=[];
        this.address.contact.town = '';
        if(this.address.contact.city){
          var cities = this.cityArray;
          for(var i=0; i<cities.length; i++){
            if(cities[i].name == this.address.contact.city){
              this.townArray = cities[i].towns;
              if(this.townNumber){
                this.address.contact.town = this.townNumber;
              }
              this.townNumber = "";
              this.cityNumber ="";
            }

          }
        }
      },
    },
    mounted() {
      var _this = this;
      _this.provincesCities(function(responce){
        _this.provinceArray = responce.data.auction_contacts.countries[0].provinces;
      })
      _this.saveDetails(_this.token(), _this.$route.query.id, function (date) {
        _this.checked = date.data.auction_contacts.is_default || false;
        _this.address.contact.name = date.data.auction_contacts.name;
        _this.provinceNumber = date.data.auction_contacts.province
        _this.cityNumber = date.data.auction_contacts.city;
        _this.townNumber = date.data.auction_contacts.town;
        _this.address.contact.address = date.data.auction_contacts.address;
        _this.address.contact.postcode = date.data.auction_contacts.postcode;
        _this.address.contact.phone = date.data.auction_contacts.phone;
      })
      $('.form').validate({
          rules: {
            name: {
              required: true
            },
            address: {
              required: true
            },
            postcode: {
              required: true,
              maxlength:6,
              minlength:6,
              digits: true
            },
            mobile: {
              required: true,
              minlength: 11,
            },
            province: {
              required: true
            },
            city: {
              required: function () {
                return $('select[name="province"]').val() != '';
              }
            },
            town: {
              required: function () {
                return $('select[name="city"]').val() != '';
              }
            }
          },
          messages: {
            name: {
              required: _this.$t('message.createAddress.rulesName')
            },
            address: {
              required: _this.$t('message.createAddress.rulesAaddress')
            },
            postcode: {
              required: _this.$t('message.createAddress.rulesPostcode'),
              maxlength:_this.$t('message.createAddress.rulesPostcode'),
              minlength:_this.$t('message.createAddress.rulesPostcode'),
              digits: _this.$t('message.createAddress.rulesPostcode')
            },
            mobile: {
              required: _this.$t('message.createAddress.rulesPhone'),
              minlength: _this.$t('message.createAddress.rulesPhone')
            },
            province: {
              required: _this.$t('message.createAddress.rulesProvince')
            },
            city: {
              required: _this.$t('message.createAddress.rulesProvince')
            },
            town: {
              required: _this.$t('message.createAddress.rulesProvince')
            }
          },
          submitHandler: function () {
            _this.address.contact.is_default = _this.checked;
            _this.updateContact(_this.token(), _this.id, _this.address, function (response) {
              _this.$router.go(-1)
            });
          },
          errorPlacement: function(error, element) {
            if (element.hasClass('select_box')) {
              error.appendTo(element.parent().parent());
            } else {
              error.appendTo(element.parent());
            }
          },
          errorClass: 'alert_title'
        })
    }
  }
</script>
