/**
 *
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 *
 */

//const baseUrl = 'http://test-api-server.ihaveu.com';
const baseUrl = '/api';
const currency="￥";
//const imgBaseUrl = 'http://dww.ihaveu.com:20080/';
const payUrl = 'http://test-pc.ihaveu.com/'
const telephone='400-887-5699'
const url = ['http://i0.ihaveu.com', 'http://i1.ihaveu.com', 'http://i2.ihaveu.com', 'http://i3.ihaveu.com'];
const imgBaseUrl=function(){
	//return url[Math.floor(Math.random()*4)]
	return 'http://dww.ihaveu.com:20080/'
}
export {
  imgBaseUrl,
  currency,
  baseUrl,
  payUrl,
  telephone
}
