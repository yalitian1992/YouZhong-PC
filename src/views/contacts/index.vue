<template>
  <div>
    <headTop></headTop>
    <normalHead></normalHead>
    <div style="height: 40px;"></div>
    <div class="mains">
      <userSide></userSide>
      <div class="mains_right" data>
        <h2><span>{{ $t('message.contacts.name') }}</span><span>{{ $t('message.contacts.address') }}</span><span>{{ $t('message.contacts.phone') }}</span><span>{{ $t('message.contacts.status') }}</span><span></span></h2>
        <ul>
          <li data-id="1054976" v-for="(item,$index) in list" @mouseenter="setUp(item,$index)" @mouseleave="Show(false)">
            <span>{{item.name}}</span>
            <span>{{item.province + item.city + item.town + item.address}}</span>
            <span>{{item.phone}}</span>
            <span>
			        <router-link :to="{path: '/contacts_update',query:{id:item.id}}" style="font-size: 13px;color: #67A5E5">{{ $t('message.contacts.modify') }}</router-link>
              <a class="delets" @click="del_address($index)">{{ $t('message.contacts.del') }}</a>
            </span>
            <span v-if="item.is_default == true"><i style="color:#BB1E7B;border:dotted 1px #BB1E7B;">{{ $t('message.contacts.defaultAddress') }}</i></span>
            <span :class="{moren:true, active:(a==$index && item.is_default != true)}" @click="Change_state(item,$index)"><i>{{ $t('message.contacts.notdefault') }}</i></span>
          </li>
          <!--<li data-id="<%= brand.id %>" ><span>yali</span><span>北京市北京市东城区</span><span>18322329999</span><span>
            &lt;!&ndash;<a class="modify" href="/contacts/update/<%= brand.id %>?redirect_url=<%= encodeURIComponent(url) %>" style="font-size: 13px;color: #67A5E5">修改</a>&ndash;&gt;
            <router-link :to="{path: '/contacts_create'}" style="font-size: 13px;color: #67A5E5">修改</router-link>
            <a class="delets">删除</a></span><span class="moren"><i>设为默认地址</i></span>
          </li>-->
          <li class="add_shou">
            <i class="icos"></i>
            <router-link :to="{path: '/contacts_create'}">&nbsp;{{ $t('message.contacts.add') }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="foot" style="clear: both;">
      <footErs></footErs>
    </div>
    <alertBox :alertText="alertText" @clonse="alertShow = false" :alertShow="alertShow"></alertBox>
  </div>
</template>
<style lang="sass" scoped>
  @import "../../assets/sass/sass-statement.scss"
  @import "../../assets/sass/contacts/create.scss"
  @import "../../assets/sass/user_center/index.scss"
  @import "../../assets/sass/contacts/index.scss"
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
        list: [],
        is_default: '',      //默认地址
//        id: list[$index].id,
        a:'',
        alertText:"",
        alertShow:false,
        paraadd : {
          page: 1,
          per_page: 15
        }
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
      del_address: function($index){
        var _this = this;
        this.deleteSave(_this.token(),_this.list[$index].id,function(data){
          if(data.status == 200){
            _this.alertShow = true;
            _this.alertText = "删除成功"
            _this.SaveList();
          }
        })
      },
      setUp: function(item,$index){
        this.a = $index;
      },
      Show: function(False){
        this.a = null;
        return False;
      },

      SaveList: function(){
        var _this = this;
        this.saveList(_this.token(),_this.paraadd,function(data){
          _this.list = data.data.auction_contacts;
        })
      },
      Change_state: function(item,$index){
        var _this = this;
        this.setDefAddress(_this.token(),_this.list[$index].id,function(data){
          if(data.status == 200){
            _this.alertShow=true
            _this.alertText="设置成功！"
          }
          _this.list[$index].active=false;
          _this.SaveList();
        })
      }
    },
    mounted() {
      this.SaveList();

      //delete contact
      $('.delets').on('click', function(){
        app.delete_contact($(this).parents('li').data('id'), function(){
          window.location.reload();
        });
      });

    }
  }
</script>
