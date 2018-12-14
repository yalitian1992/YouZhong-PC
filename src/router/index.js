import App from '../App.vue'
import index from '../views/index.vue'
import user_center from '../views/user_center/index.vue'
import trades from '../views/trades/index.vue'
import contacts_create from '../views/contacts/create.vue'
import contacts_update from '../views/contacts/update.vue'
import carts from '../views/carts/index.vue'
import products from '../views/products/index.vue'
import show from '../views/products/show.vue'
import brands from '../views/brands/index.vue'
import login from '../views/login/index.vue'
import register from '../views/register/index.vue'
import trades_create from '../views/trades/create.vue'
import vouchers from '../views/vouchers/index.vue'
import contacts from '../views/contacts/index.vue'
import change_password from '../views/change_password'
import zhengpinbaozhang from '../views/helps/zhengpinbaozhang'
import ruhegoumai from '../views/helps/ruhegoumai'
import zhekouzhengce from '../views/helps/zhekouzhengce'
import fukuanfangshi from '../views/helps/fukuanfangshi'
import yonghuxieyi from '../views/helps/yonghuxieyi'
import VIPzhengce from '../views/helps/VIPzhengce'
import tuihuoshuoming from '../views/helps/tuihuoshuoming'
import shouhoufuwu from '../views/helps/shouhoufuwu'
import fapiaoshuoming from '../views/helps/fapiaoshuoming'
import pay from '../views/trades/pay.vue'
import trades_show from '../views/trades/show.vue'
import return_goodFrom from '../views/return_good/create.vue'
import return_goodShow from '../views/return_good/show.vue'
import forgot from '../views/forgot_password/index.vue'
import paypalLoding from '../views/trades/paypalloading.vue'
import down from '../views/brands/down.vue'
import error from '../views/error/error.vue'
export default[
  {
    path: '',
    component: index
  },{
    path: '/index',   //首页
    component: index
},{
    path: '/user_center',     //个人中心 - 账户管理
    component: user_center
  },{
    path: '/trades',     //个人中心 - 我的订单
    component: trades
  },{
    path: '/vouchers',     //个人中心 — 我的代金券
    component: vouchers
  },{
    path: '/contacts',      //个人中心 — 收货地址
    component: contacts
  },{
    path: '/change_password',     //个人中心 — 修改密码
    component: change_password
  },{
    path: '/contacts_create', //添加收货地址
    component: contacts_create
  },{
    path: '/contacts_update', //修改收货地址
    component: contacts_update
  }, {
    path: '/carts', //购物车
    component: carts
  },{
    path: '/auction/products',//商品列表页
    component: products
  },{
    path: '/auction/brands',//品牌列表页
    component: brands
  },{
    path: '/trades_create',//确认订单
    component: trades_create
  },{
    path: '/zhengpinbaozhang',   //购物须知-正品保障
    component: zhengpinbaozhang
  },{
    path: '/ruhegoumai',   //购物须知-如何购买
    component: ruhegoumai
  },{
    path: '/zhekouzhengce',  //购物须知-折扣政策
    component: zhekouzhengce
  },{
    path: '/fukuanfangshi',    //购物须知-付款方式
    component: fukuanfangshi
  },{
    path: '/VIPzhengce',   //购物须知-VIP政策
    component: VIPzhengce
  },{
    path: '/tuihuoshuoming',   //购物须知-退货说明
    component: tuihuoshuoming
  },{
    path: '/shouhoufuwu',    //购物须知—售后服务
    component: shouhoufuwu
  },{
    path: '/fapiaoshuoming',    //购物须知—发票说明
    component: fapiaoshuoming
  },{
    path: '/yonghuxieyi',    //购物须知—用户协议
    component: yonghuxieyi
  },{
    path: '/pay',//支付
    component: pay
  },{
    path: '/trades_show',//订单详情
    component:trades_show
  },{
    path: '/auction/products/:id',//商品详情页
    name: 'show',
    component: show
  },{
    path: '/login',//登录页
    component: login
  },{
    path: '/register',//注册页
    component: register
 },{
    path: '/return_goodFrom',//填写退货信息
    component: return_goodFrom
  },{
    path: '/return_goodShow',//退货信息页
    component: return_goodShow
  },{
    path: '/forgot',//忘记密码
    component: forgot
  },{
    path: '/paypalLoding',//loading
    component: paypalLoding
  },{
    path: '/down',//loading
    component: down
  },{
    path: '/error',//错误页面
    component: error
  }
]
