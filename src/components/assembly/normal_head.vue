<template>
  <div id="mainhead">
    <div class="content" style="height: 100px;">

      <!--  顶部搜索框，购物车 -->
      <div class="youzhong">
        <router-link :to="{path:'/index'}" style="display: inline-block;">
          <img src="../../assets/images/LOGO.png" alt="logo">
        </router-link>
        <div class="s_form"  style="float: right;">
          <div class="text">
            <div class="btn_area__defaultkeyword" id="btn_area__defaultkeyword">
              <label for="btn_area__keyword" id="btn_area__defaultkeyword__item"
                     style="padding-left: 5px;margin-top: 8px;font-size: 14px;color: #777;">
                <span><%= keyword %></span>

              </label>
            </div>

            <input type="text" name='inputText' id="btn_area__keyword" style="padding-left: 4px;" v-model="inputText" placeholder="闪购" @keyup.enter="search(inputText)">

            <div class="go_car" id="go_cars" @click="search(inputText)"></div>

          </div>

          <router-link :to="{path:'/carts'}" style="margin-left:30px;">
            <div style="background: #bb1E7B; margin-left:0px;" class="buttons">
              <i>
              </i>
              <span style="line-height: 32px;font-size: 14px;color: #fff;">

          		  {{ $t('message.normal_head.carts') }}
               <b class="numbs" >({{listnum}})</b>
          </span>

            </div>
          </router-link>
        </div>

      </div>
    </div>
    <div id="tab_bar" style="background: #222222;">
      <div class="tab_bar_bg" style="background: #222222;">
        <ul class="bar_content" style="background: #222222;">
          <li class="first">
            <router-link :to="{path:'/index'}">
              {{ $t('message.nav.shouye') }}
            </router-link>
          </li>
          <li >
            <router-link :to="{path:'/auction/brands'}">
              品牌
            </router-link>
          </li>
          <li v-for="(item1,index) in navListmenu.menu">
            <a @click="search(item1.title)">{{item1.title}}<span class="arr_ico"></span></a>
            <div class="contener" style="border-color: #BB1E7B">
              <div class="left w510 ">

                <div class="dib mr100" v-for="(item2,index1) in navListmenu.menu[index].submenu.list">
                  <a class="title" @click="search(item1.title,item2.main.title)">{{item2.main.title}}</a>
                  <span v-for="(item3,index1) in navListmenu.menu[index].submenu.list[index1].list">
                 	<a @click="search(item1.title,item3.title)">{{item3.title}}</a>
	            </span>

                </div>

              </div>
              <!--<div class="vertical_line"></div>

              <div class="right w250">
                <a target="_blank" class="title">{{item1.submenu.promotion.main.title }}</a>
                <span v-for="(item4,index1) in navListmenu.menu[index].submenu.promotion.list">
									<router-link :to="{path:'/auction/products',query:{keyword:item1.title}}" target="_blank">
					           		{{item4.title}}
					           		</router-link>
					          </span>
                <router-link :to="{path:'/auction/products',query:{keyword:navListmenu.menu[index].submenu.promotion.emphasis.title}}" target="_blank" style="border-color: #BB1E7B;color: #BB1E7B;"
                             class="imgBtn">
                  <p class="big">{{navListmenu.menu[index].submenu.promotion.emphasis.title}}</p>
                  <p class="link">
                    查看全部商品<span class="ico arrow_right"></span></p>
                </router-link>
              </div>-->

            </div>

          </li>
          <li class="first">
            <router-link :to="{path:'/down'}">
              App下载
            </router-link>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import nav from '../../assets/js/nav.json'
  import nav2 from '../../assets/js/nav2.json'
  import i18n from '../../assets/js/il8n.js'
  export default {
    i18n,
    props: ['msg'],
    data() {
      return {
        navListmenu: {},
        inputText: "",
        listnum:0,
        userToken:'',
        Selected:[],
        where:{ "where": { "brand_id": [], "unsold_count": {"gt": {}}, "price": { "gt": {}, "lt": {} } }, "name": "", "page": 1, "per_page": 40, "order": {}, "keyword": {} }
      }
    },
    components: {},
    props: {
      'card': {
        default: 1
      }
    },
    watch:{
      'userToken':function(){
        if(sessionStorage.getItem('user')){
          var _this = this;
          _this.cartsList(_this.token(),{page:1,page_size:100},function(respone) {
            _this.listnum=respone.data.retail_carts.length
          })
        }
      },
      'card':function(){
        var _this = this;
        _this.cartsList(_this.token(),{page:1,page_size:100},function(respone) {
          _this.listnum=respone.data.retail_carts.length
        })
      }
    },
    methods: {
      goback: function () {
        document.body.scrollTop = 0;
      },
      search:function(key,key2){
        if(key=='男士'){
          this.where.where.target='男'
          this.Selected[0]={ "name": '性别', "id": key}

        }else if(key=='女士'){
          this.where.where.target='女'
          this.Selected[0]={ "name": '性别', "id": key}
        }else if(key==''){
          this.where.keyword='闪购'
        }else if(key=="精致生活"){
          this.where.where.target={}

          this.Selected[0]={ "name": '分类', "id": key }
        }else if(key=="东方奢侈品"){
          this.where.where.target={}
          this.where.where.category1_id=203
          this.Selected[0]={ "name": '分类', "id": key }
        }else{
          this.where.keyword=key
        }
        if(key2){
          this.where.keyword=key2
          this.$emit('searchs',key,key2 );

        }else{
          this.where.keyword=key
          this.$emit('searchs',key );
        }
        console.log(this.where)
        this.$router.push({ path: '/auction/products', query: { where: JSON.stringify(this.where) } })
        this.storages()
      },
      storages: function() { //本地存储
        var alHttpData = {
          Selected: this.Selected
        }
        sessionStorage.setItem('alHttpData', JSON.stringify(alHttpData));
      }
    },
    mounted() {

      if(i18n.locale=='zh-CN'){
        this.navListmenu = nav
      }else if(i18n.locale=='zh-hk'){
        this.navListmenu = nav2
      }

      var _this=this;
      if(sessionStorage.getItem('user')){
        _this.userToken = JSON.parse(sessionStorage.getItem('user')).core_account.token
      }
      setTimeout(function(){
        $.each($('.contener'), function(i, k){
          var length_1 = $(k).find('.dib.mr100').length,
            length_2 = $(k).find('.dib.mr70').length,
            length_3 = length_1 + length_2 - 1,
            length_4 = $(k).find('.right.w250').length;
          //$(k).css('width', length_1 * 100 + length_2 * 220 + length_3 * 40 + length_4 * 296 );
          $(k).css('width', length_1 * 100 + length_2 * 220 + length_3 * 40  );
          if(_this.$route.query.keyword){
            $("#btn_area__keyword").attr('placeholder',_this.$route.query.keyword)
          }

        });
      },500)
    }
  }
</script>
<style scoped scoped>
  .bar_content li a {
    color: #fff;
    line-height: 44px;
  }
  .contener{

  }
</style>

<style lang="sass">
  @import "../../assets/sass/new_style/new_normal_header.scss"
</style>
