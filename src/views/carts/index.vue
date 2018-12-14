<template>
  <div>
    <headTop></headTop>
    <shopHeader :Buy="Buy"></shopHeader>
    <div style="padding:140px 0" v-if="loading ==0">
      <img class="loadImg" src="../../assets/images/base/loading.svg" alt="">
    </div>
    <div v-else>
      <div class="content" :class="cartsInfo.length == 0?'hide':''">
        <div class="content_title">
          <p class="products">{{ $t('message.carts.product') }}</p>

          <p class="price">{{ $t('message.carts.price') }}</p>

          <!-- <p class="count">数量</p> -->

          <p class="sum">{{ $t('message.carts.Subtotal') }}</p>

          <p class="operate">{{ $t('message.carts.status') }}</p>
        </div>
        <div class="cart_item yellow">
          <div class="item_top">
            <div class="origin">
              <div class="icon"><p class="user_center_ico"></p></div>
              <p class="text">{{ $t('message.carts.baoyou') }}</p>
            </div>

          </div>
          <div class="failure" v-for="(cart,index) in cartsInfo">
            <div class="item" :cart-id="cart.id" :count="1" :product-id="cart.product_id"
                 :discount="cart.product.discount" :unsold_count="cart.sku.amount" :sku-id="cart.sku_id" delivery="0">

              <div class="select" :published="cart.product.published" :unsold_count="cart.sku.amount">
                <input class="check_box" :class=" cart.sku.amount ==0 || !cart.product.published ? 'hide' :''"
                       type="checkbox" name="" value="" checked>
              </div>
              <div class="product_info" :class=" index+1 == cartsInfo.length ?  'no_border' : '' ">
                <div class="image">
                  <router-link :to="{name:'show',params:{id:cart.product.id}}" target="_blank" :title="cart.product.name">
                    <img :src="imgBaseUrl() + cart.product.major_pic+'.m220.jpg'" :onerror="defaultImg(0)" style="width:100%; height:100%"/>
                  </router-link>
                </div>
                <div class="info">
                  <router-link :to="{name:'show',params:{id:cart.product.id}}" target="_blank" class="name">
                    {{cart.product.name}}
                  </router-link>
                  <div class="color_size">
                    <p class="color" v-if="cart.product.color_name">{{ $t('message.carts.color') }}：{{ cart.product.color_name }}</p>
                    <p class="line" v-if="cart.product.color_name && (cart.sku.name)"></p>
                    <p class="size" v-if="cart.sku.name">{{ $t('message.show.size') }}：{{cart.sku.name}}</p>
                  </div>
                  <div class="clearfix"></div>

                </div>
                <div class="pay">
                  <p class="discount">{{currency}}{{ cart.product.discount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') }}</p>
                  <p class="price" v-if="cart.product.price > cart.product.discount">
                    {{currency}} {{ cart.product.price.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') }}<span></span></p>
                </div>
                <div>
                  <p class="sum_value">{{currency}} {{cart.product.discount}}</p>
                </div>
                <div class="del_content" :class=" cart.sku.amount==0 || !cart.product.published ? 'del_background' :''">
                  <p class="user_center_ico del_ico"></p>
                </div>
                <div class="del_title">
                  <div class="arrow_up">
                    <em></em>
                    <span></span>
                  </div>
                  <div class="text_content">
                    <div class="fonts_del">{{ $t('message.carts.yesRemove') }}?</div>
                    <div class="yes_no_button">
                      <div class="yes_button">{{ $t('message.carts.yes') }}</div>
                      <div class="no_button">{{ $t('message.carts.no') }}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="background_mask" :class=" cart.sku.amount ==0 || !cart.product.published ? '' :'hide'">
              <div class="failure_font">
                {{ $t('message.carts.failure') }}
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="item_bottom">
            <input class="check_box" type="checkbox" name="" value="" checked>

            <p class="select_all">{{ $t('message.carts.Select') }}</p>

            <p class="del_text"><span class="user_center_ico del_ico"></span>&nbsp;&nbsp;<span class="delete_title">{{ $t('message.carts.remove') }}</span>
            </p>

            <div class="del_title">
              <div class="arrow_up">
                <em></em>
                <span>{{ $t('message.carts.shanchu') }}</span>
              </div>
              <div class="text_content">
                <div class="fonts_del">{{ $t('message.carts.yesRemove') }}?</div>
                <div class="yes_no_button">
                  <div class="yes_button">{{ $t('message.carts.yes') }}</div>
                  <div class="no_button">{{ $t('message.carts.no') }}</div>
                </div>
              </div>
            </div>

            <p class="submit active">{{ $t('message.carts.Settlement') }}</p>
            <div class="show_price">
              <div class="top">{{ $t('message.carts.common') }}<span class="small"></span>{{ $t('message.carts.piece') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('message.carts.total') }}：&nbsp;<span
                class="big"></span></div>
              <div class="bottom">
                {{ $t('message.carts.total2') }}：&nbsp;<span class="total_price"></span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('message.carts.freight') }}：&nbsp;<span class="total_delivery"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="empty" :class="cartsInfo.length == 0?'':'hide'" style="height: 120px">
        <p class="empty_ico"></p>

        <p class="empty_text">{{ $t('message.carts.goShipping') }}</p>
        <router-link class="go_page" :to="{path:'/index'}" style="margin-left: 100px;">{{ $t('message.trades.shop') }} ></router-link>
      </div>
      <div class="no_empty" :class="cartsInfo.length == 0?'hide':''">
        <p class="no_text">{{ $t('message.carts.goShipping') }}</p>
        <router-link class="go_on" :to="{path:'/index'}">{{ $t('message.carts.continues') }}</router-link>
      </div>
    </div>
    <footErs></footErs>
  </div>

</template>
<script>
  import headTop from '../../components/assembly/headTop.vue'
  import footErs from '../../components/assembly/foot.vue'
  import shopHeader from '../../components/assembly/shop_header.vue'
  import {imgBaseUrl,currency} from '../../../config/config'
  import i18n from '../../assets/js/il8n.js'
  export default {
    i18n,
    data() {
      return {
        Buy: 1,
        cartsInfo: [],
        ntalk_cartprice: 0,
        ntalk_items: [],
        imgBaseUrl,
        currency,
        loading:0
      }
    },
    components: {
      headTop,
      footErs,
      shopHeader
    },
    methods: {
      initItems: function ($dom) {
        var params = this.sum_params($dom);
        this.select_all($dom);
        this.assign_text($dom, params);
        this.check_submit($dom, params);
      },
      //总价格 数量 运费 关税 总计
      sum_params: function ($dom) {
        var items_sum_discount = 0,
          items_count = 0,
          items_sum_tax = 0,
          items_delivery;
        var _vuethis = this;
        $.each($dom.find('.item'), function (m, n) {
          var discount = $(n).attr('discount') * 1,
            product_id = $(n).attr('product-id'),
            count = $(n).attr('count') * 1;
          if ($(n).find('.check_box').is(':checked') && $(n).find('.select').attr('unsold_count') != 0 && $(n).find('.select').attr('published')) {
            items_count += count;

            items_sum_discount += discount * count;
            items_sum_tax += discount * count;
            //----------小能数据，1.购物车所需商品信息------------
            _vuethis.ntalk_items.push({
              id: product_id,
              count: count
            });
          }
        });
        items_delivery = 0;
        items_sum_tax = items_sum_tax.toFixed();
        //----------小能数据，2.购物车所需商品总价------------
        _vuethis.ntalk_cartprice += items_sum_discount;
        return {
          total_count: items_count,
          total_discount: items_sum_discount,
          total_tax: items_sum_tax,
          total_delivery: items_delivery,
          total_price: items_sum_discount * 1 + items_delivery * 1//取消关税小于50免征，总价为商品折扣价+关税价格+运费
        }
      },
      //判断全部选中
      select_all: function ($dom) {
        var select_all = true;
        $.each($dom.find('.item'), function (m, n) {
          if (!$(n).find('.check_box').is(':checked')) {
            select_all = false;
          }
        });
        $dom.find('.item_bottom .check_box').prop('checked', select_all);
      },
      //赋值
      assign_text: function ($dom, params) {
        var $show_price = $dom.find('.show_price');
        //数量
        $show_price.find('.small').html(params.total_count);
        //总计
        $show_price.find('.big').html(this.currency + params.total_price.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
        //总价
        $show_price.find('.total_price').html(this.currency + params.total_discount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
        //运费
        $show_price.find('.total_delivery').html(this.currency + params.total_delivery);
      },
      //立即结算 状态
      check_submit: function ($dom, params) {
        var active = true;
        //无货 库存不足等
        $.each($dom.find('.item'), function (i, k) {
          if ($(k).find('.check_box').is(':checked') && $(k).find('.select').attr('unsold_count') != 0 && $(k).find('.select').attr('published')=='true') {
            active = false;
          }
        });
        if(params.total_count == 0){
          active = false;
        }else{
          active = true;
        }
        if (active) {
          $dom.find('.submit').addClass('active');
        } else {
          $dom.find('.submit').removeClass('active');
        }
      },
      checkEmpty: function (dom) {
        var cart_item = dom.parents('.cart_item'),
          cart_item_length = cart_item.siblings().length,
          content = cart_item.parents('.content');
        dom.remove();
        cart_item.find('.item:last .product_info').addClass('no_border');
        var item_length = cart_item.find('.item').length;
        if (item_length == 0 && cart_item_length >= 1) {
          cart_item.remove();
        }
        if (item_length == 0 && $('.cart_item').length < 1) {
          content.addClass('hide');
          $('.empty').removeClass('hide');
          $('.no_empty').addClass('hide');
        }
      }
    },
    mounted(){
      var _this = this;
      _this.cartsList(_this.token(), {page:1,page_size:100},function (respone) {
        _this.loading = 1;
        _this.cartsInfo = respone.data.retail_carts;
        $(".yes_button,.del_ico,.del_text,.no_button,.submit").off( "click");
        _this.$nextTick(function () {
          _this.initItems($('.cart_item'));
          $('.check_box').on('change', function () {
            var $parent = $(this).parent(),
              $cart_item = $parent.parents('.cart_item');
            if ($parent.hasClass('item_bottom')) {
              var checked = $(this).is(':checked');
              $.each($cart_item.find('.item'), function (i, k) {
                var $check_box = $(k).find('.check_box');
                if ($check_box.is(':checked') != checked) {
                  $check_box.prop('checked', !$check_box.is(':checked'));
                }
              });
            }
            _this.initItems($cart_item);
          });
          $('.yes_button').on('click', function () {
            if ($(this).parents().hasClass('item_bottom')) {
              var ids = [];
              $.each($(this).parents('.cart_item').find('.item'), function (i, k) {
                if ($(k).find('.check_box').is(':checked')) {
                  ids.push($(k).attr('cart-id'));
                  _this.checkEmpty($(k));
                }
              });
              let idsJson=ids.join(',');
              if(idsJson){
                _this.deleteCarts(_this.token(), {ids:ids.join(',')}, function () {});
                $('.del_title').hide();
                _this.initItems($('.cart_item'));
              }

            } else {
              if ($(this).parents('.item').find('.select').attr('unsold_count') == 0 || !$(this).parents('.item').find('.select').attr('published')) {
                $(this).parents('.item').next().remove();
              }
              var cart_id = $(this).parents('.item').attr('cart-id'),
                index = $(this).parents('.cart_item').index();
              _this.deleteCarts(_this.token(), {ids:cart_id}, function () {});
              _this.checkEmpty($(this).parents('.item'));
              _this.initItems($($('.cart_item')[index - 1]));

            }
          });
          //delete show
          $('.del_ico').on('click', function () {
            $(this).parent().next().show();
            if ($(this).parents(".item_bottom").find(".check_box").is(':checked')) {
              $(this).parent().next().show();
            }
          });
          $('.del_text').on('click', function () {
            if ($(this).parents(".item_bottom").find(".check_box").is(':checked')) {
              $(this).next().show();
            }
          });
          //delete hide
          $('.no_button').on('click', function () {
            $(this).parents('.del_title').hide();
          });
          //立即结算
          $('.submit').on('click', function () {
            if (!$(this).hasClass('active')) {
              return;
            }
            var ids = [];
            var carts=[];
            $.each($(this).parents('.cart_item').find('.item'), function (i, k) {
              if ($(k).find('.check_box').is(':checked') && $(k).find('.select').attr('unsold_count') != 0 && $(k).find('.select').attr('published')=='true') {
                ids.push({
                  id: $(k).attr('product-id'),
                  sku_id: $(k).attr('sku-id')
                });
                carts.push($(k).attr('cart-id'))
              }
            })
            _this.$router.push({path: '/trades_create', query: {ids: JSON.stringify(ids),carts:carts.join(',')}})
          });
        })
      })
    }
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/sass/cart/index"
</style>
<style scoped>
  .next_val {

    display: inline-block;
    position: absolute;
    margin-top: 50px;
    margin-left: -138px;

  }

  .next_val a {
    border: solid 1px #DDDDDD;
    padding: 8px;
  }

  .next_val span {
    width: 29px;
    height: 30px;
    display: inline-block;
    background: url(~@/assets/images/p_logo.png);
    float: left;
    margin-right: 5px;
  }
  .loadImg{
    width:80px;
    height:80px;
    display: block;
    margin:auto;
  }
</style>
