import {baseUrl} from '../../../config/config'
export default {
  data(){
    return {
    	baseUrl//配置路径
    }
  },
  install: function (Vue, options) {
    Vue.prototype.baseUrl = function () {
    	const url = ['http://i0.ihaveu.com', 'http://i1.ihaveu.com', 'http://i2.ihaveu.com', 'http://i3.ihaveu.com'];

				return url[Math.floor(Math.random()*4)]

    }
    /*设置默认图片*/
    Vue.prototype.defaultImg = function (option) {
      var defaultImg = '';
      switch (option) {
        case 0:
          defaultImg = 'this.src = "' + require('../../assets/images/loadError01.png') + '"';
          break;
        case 1:
          //defaultImg = 'this.src = "' + require('../../images/loadError02.png') + '"';
          break;
        case 2:
          // defaultImg = 'this.src = "' + require('../../images/head-photo.png') + '"';
          break;
      }
      return defaultImg;
    }

    /*个人中心头像*/
    Vue.prototype.defaultImgUser = function (option) {
      var defaultImg = '';
      switch (option) {
        case 0:
          defaultImg = 'this.src = "' + require('../../assets/images/user_head.png') + '"';
          break;
      }
      return defaultImg;
    }

//  判断数组是否含有某个元素
     Vue.prototype.isInArray = function (arr, value) {
      if (arr.indexOf && typeof(arr.indexOf) == 'function') {
        var index = arr.indexOf(value);
        if (index >= 0) {
          return true;
        }
      }
      return false;
    }
     //保留2位小数
		 Vue.prototype.twoInt = function (value) {
		      var value=Math.round(parseFloat(value)*100)/100;
					 var xsd=value.toString().split(".");
					 if(xsd.length==1){
					 value=value.toString();
					 return value;
					 }
					 if(xsd.length>1){
					 if(xsd[1].length<2){
					  value=value.toString()+"0";
					 }
					 return value;
					 }
		    }
    Vue.prototype.token = function () {
      let user = sessionStorage.getItem('user');
      if(user){
        let userInfoSess = JSON.parse(sessionStorage.getItem('user'));
        return userInfoSess.core_account.token;
      }else{
	      if(localStorage.getItem('login')){
          let user = JSON.parse(localStorage.getItem('login'))
          var _this = this;
          this.login(user, function(response) {
            if (response.status == 200) {
              sessionStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('loginStatus', true);
              localStorage.setItem('userPhone', user.phone);
              _this.$router.go(0)
            }
          })
        }
      }
    }
//  token失效
    Vue.prototype.goToLogin = function () {
      if(this.$route.path == '/login'){
        return
      }else{
        this.$router.replace({path: '/login', query: {url: this.$route.path, msg: this.$route.query}})
      }
    }

// 	 用户详情
    Vue.prototype.userDetails = function (token, success) {
      this.$http({
        method: "GET",
        url: baseUrl+"/auction/users/1",
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
        this.$router.replace({path: '/error'});
      })
    }
// 	 注册
    Vue.prototype.register = function (params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/core/accounts",
        params: params
      }).then(function (res) {
        var data=res.body
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //手机验证码
    Vue.prototype.phoneCode = function (params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/core/accounts/resend_activation_code",
        params: params
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       // this.$router.replace({path: '/error'});
      })
    }
    //忘记密码
    Vue.prototype.forgetPassword = function (params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/core/accounts/forget_password",
        params: params
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 修改账户信息
    Vue.prototype.modifyUser = function (token,id,params, success) {
      this.$http({
        method: "put",
        url: baseUrl+"/core/accounts/" + id,
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 登出
    Vue.prototype.loginOut = function (token,success) {
      this.$http({
        method: "delete",
        url: baseUrl+"/core/sessions/0",//接口必带0
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        }else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       // this.$router.replace({path: '/error'});
      })
    }
// 	商品搜索列表
    Vue.prototype.goodsList = function (params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/products",
        params: params
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          console.log(data.msg)
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 商品详情
    Vue.prototype.goodsDetails = function (id, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/products/" + id
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          alert(data.msg)
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 优惠券列表
    Vue.prototype.couponList = function (token,params,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/vouchers",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
       // alert(params)
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 添加优惠券
    Vue.prototype.addCoupon = function (token, params, success) {
      this.$http({
        method: "put",
        url: baseUrl+"/auction/vouchers/1",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	订单列表
    Vue.prototype.getTrade = function (token,params,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/trades",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
//  订单数量统计
    Vue.prototype.quantityTrade = function (token,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/trades/amounts",
        // params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //订单详情
    Vue.prototype.tradesInfo = function (token,id, params,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/trades/" + id + '.json',
        params:params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //创建订单
    Vue.prototype.creatTrade = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/trades",
        params: params,
        headers: {TOKEN: token,}
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	订单取消
    Vue.prototype.deleatTrade = function (token,id, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/trades/" + id + "/cancel",
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        }else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 查看物流
    Vue.prototype.getDelivery = function (token, params, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/trades/delivery_query",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 确认收货
    Vue.prototype.confirmTrade = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/trades/receive",
        params:params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }

// 	收货地址列表
    Vue.prototype.saveList = function (token,params,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/contacts",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 添加收货地址
    Vue.prototype.addSave = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/contacts",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 修改收货地址
    Vue.prototype.updateContact = function (token,id, params, success) {
      this.$http({
        method: "put",
        url: baseUrl+"/auction/contacts/" + id,
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        }else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 删除收货地址
    Vue.prototype.deleteSave = function (token,id, success) {
      this.$http({
        method: "delete",
        url: baseUrl+"/auction/contacts/"+id,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        }else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 收货地址详情
    Vue.prototype.saveDetails = function (token,id, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/contacts/" + id,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	收货地址省市区
    Vue.prototype.provincesCities = function (success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/contacts/options"
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          console.log(data.msg)
        }
      }, function (error) {
       // this.$router.replace({path: '/error'});
      })
    }
// 	 品牌收藏列表
    Vue.prototype.brandCollection = function (token,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/fanships",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {

      })
    }
// 	 创建品牌收藏
    Vue.prototype.addBrand = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/fanships",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 删除收藏品牌
    Vue.prototype.deleatBrand = function (token,id, success) {
      this.$http({
        method: "delete",
        url: baseUrl+"/aauction/fanships/:" + id,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	创建用户反馈
    Vue.prototype.feedback = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/core/reports",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {

      })
    }
// 	 添加购物车
    Vue.prototype.addCarts = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/retail/carts",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
      	var data = res.body;
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 删除购物车商品
    Vue.prototype.deleteCarts = function (token,params, success) {
      this.$http({
        method: "delete",
        url: baseUrl+"/retail/carts",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 购物车列表
    Vue.prototype.cartsList = function (token,params,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/retail/carts",
        params:params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
// 	 品牌列表
    Vue.prototype.brandList = function (success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/brands",
				params:{ page: 1, per_page: 10000}
      }).then(function (res) {
	      var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          alert(data.msg)
        }
      }, function (error) {

      })
    }
// 	 品牌详情
    Vue.prototype.brandDetails = function (id, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/brands/" + id
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          alert(data.msg)
        }
      }, function (error) {

      })
    }
// 	 首页轮播图片列表
    Vue.prototype.bannerList = function (success) {
      this.$http({
        method: "get",
        url: baseUrl+"/ad_seckill_theme"
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          console.log(data.msg)
        }
      }, function (error) {

      })
    }
// 	 登录
    Vue.prototype.login = function (params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/login",
        params: params
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       // this.$router.replace({path: '/error'});
      })
    }
// 	 主题列表
    Vue.prototype.themeList = function (success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/themes",
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          console.log(data.msg)
        }
      }, function (error) {

      })
    }

// 	 秒杀活动列表
    Vue.prototype.seckills = function (success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/seckills",
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          console.log(data.msg)
        }
      }, function (error) {

      })
    }
//主题/秒杀/首页列表
    Vue.prototype.ad_seckill_theme = function (params, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/ad_seckill_theme",
        params: params
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else {
          console.log(data.msg)
        }
      }, function (error) {

      })
    }
    //设置默认地址
    Vue.prototype.setDefAddress = function (token,id, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/contacts/" + id + "/set_default_contact",
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }

    /*获取默认地址*/
    Vue.prototype.getDefAddress = function (token,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/contacts/default_contact",
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }

    //确认订单页面的商品清单
    Vue.prototype.productsList = function (token,params,success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/trades/confirm_products_list",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }

    //订单退货
    Vue.prototype.returnGoods = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/units/return",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }

    //退货显示
    Vue.prototype.returnGoodShow = function (token,params, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/units/return_detail.json",
        params:params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //支付列表
    Vue.prototype.payInfo = function (token,params, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/trades/pay_list.json",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //支付宝支付
    Vue.prototype.tradesAlipay = function (token,params, success) {
      this.$http({
        method: "get",
        url: baseUrl+"/pay/alipays/new",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //货到付款
    Vue.prototype.tradesExpress = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/auction/trades/express",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          alert(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //paypal第一步
    Vue.prototype.tradesPaypal = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/pay/paypals",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //paypal第二步
    Vue.prototype.tradesExecute = function (token,params, success) {
      this.$http({
        method: "post",
        url: baseUrl+"/pay/paypals/execute",
        params: params,
        headers: {TOKEN: token}
      }).then(function (res) {
        var data = res.body;
        success(data);
      }, function (error) {
       this.$router.replace({path: '/error'});
      })
    }
    //面包屑
    Vue.prototype.tree = function (success) {
      this.$http({
        method: "get",
        url: baseUrl+"/auction/categories/tree"
      }).then(function (res) {
        var data = res.body;
        if (data.status == 200) {
          success(data);
        } else if(data.status == 403) {
          this.goToLogin();
        }else{
          console.log(data.msg);
        }
      }, function (error) {

      })
    }

    /*专题详情*/
		Vue.prototype.getTheme = function (id, success) {
		  this.$http({
		    method: "get",
		    url: baseUrl + "/auction/themes/" + id
		  }).then(function (res) {
		    var data = res.body;
		    if (data.status == 200) {
		      success(data);
		    } else {
		     console.log(data)
		    }
		  }, function (error) {

		  })
		}
  }
}
