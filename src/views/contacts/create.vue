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
        <div class="form_header">{{ $t('message.createAddress.title') }}</div>
        <form class="form">
          <ul>
            <li class="receiver_name">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.name') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" class="name_input border_input" maxlength="30" name="name" v-model="addressDate.contact.name" />&nbsp;&nbsp;
            </li>
            <li class="address">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.address') }}&nbsp;&nbsp;&nbsp;
              <label class="lbl_select state_label">
                <select class="select_box province" name="province" v-model="countryIndex" @change="checkCountry">
                  <option value="">{{ $t('message.createAddress.province') }}</option>
                  <option v-for="(country,index) in countries.provinces" :value="index+1" >{{country.name}}</option>
                </select>
              </label>
              <label class="lbl_select state_label">
                <select class="select_box city" name="city" v-model="cityIndex" @change="checkCity">
                  <option value="">{{ $t('message.createAddress.city') }}</option>
                  <option v-for="(city,index) in cities" :value="index+1" @change="">{{city.name,index}}</option>
                </select>
              </label>
              <label class="lbl_select state_label">
                <select class="select_box area" name="town" v-model="townIndex" @change="checkTown">
                  <option value="">{{ $t('message.createAddress.town') }}</option>
                  <option v-for="(town,index) in towns" :value ='index+1'>{{town.name}}</option>
                </select>
              </label>
            </li>
            <li class="detail_address">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.add') }}&nbsp;&nbsp;&nbsp;
              <input type="text" class="detail_address_input border_input" maxlength="50" value="" name="address" v-model="addressDate.contact.address"/>&nbsp;&nbsp;
              <!-- <span class="ico alert"></span> -->
            </li>
            <li class="postcode">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.postcode') }}&nbsp;&nbsp;&nbsp;
              <input class="postcode_input border_input" maxlength="6" name="postcode" v-model="addressDate.contact.postcode"/>&nbsp;&nbsp;
              <!-- <span class="ico alert"></span> -->
            </li>
            <li class="telephone">
              <span class="pre_title">*</span>&nbsp;{{ $t('message.createAddress.phone') }}&nbsp;&nbsp;&nbsp;
              <input type="tel" class="telephone_input border_input" maxlength="12" :placeholder="$t('message.createAddress.phoneRuler')" name="mobile" v-model="addressDate.contact.phone"/>&nbsp;&nbsp;
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
        addressDate: {
          contact: {
            "name": "",
            "province": "",
            "city": "",
            "town": "",
            "address": "",
            "postcode": "",
            "phone": ""
          }
        },
        checked: true,
        countries:[],
        cities:[],
        towns:[],
        countryIndex:'',
        cityIndex:'',
        townIndex:''
      }
    },
    components: {
      headTop,
      logo,
      footErs
    },
    methods: {
      checkCountry:function(){
        this.cityIndex='';
        this.townIndex='';
        this.towns=[];
        this.cities=[];
        if(this.countryIndex){
          this.cities = this.countries.provinces[Number(this.countryIndex)-1].cities;
          this.addressDate.contact.province =this.countries.provinces[Number(this.countryIndex)-1].name;
        }
      },
      checkCity:function(){
        this.townIndex='';
        this.towns=[];
        if(this.cityIndex){
          this.towns = this.cities[Number(this.cityIndex)-1].towns;
          this.addressDate.contact.city = this.cities[Number(this.cityIndex)-1].name;
          this.townIndex='';
        }
      },
      checkTown:function(){
        if(this.townIndex >0){
          this.addressDate.contact.town = this.towns[Number(this.townIndex)-1].name;
        }

      }
    },
    mounted() {
      var _this=this;
      _this.provincesCities(function(responce){
        _this.countries = responce.data.auction_contacts.countries[0];
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
            minlength: 11
          },
          province: {
            required: true
          },
          city: {
            required: function(){
              return $('select[name="province"]').val() !='';
            }
          },
          town: {
            required: function(){
              return $('select[name="city"]').val() !='';
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
        submitHandler: function(){
          _this.addressDate.contact.is_default=_this.checked;
          _this.addSave(_this.token(),_this.addressDate,function (response) {
            if(_this.$route.query.url){
              _this.$router.replace({path: _this.$route.query.url,query:_this.$route.query.msg});
            }else{
              _this.$router.go(-1)
            }
          });
        },
        errorPlacement: function(error, element) {
          if (element.hasClass('select_box')) {
            error.appendTo(element.parent().parent());
          } else {
            error.appendTo(element.parent());
          }
        }
      });
    }
  }
</script>
