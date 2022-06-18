import ajax from './ajax'

const BASEURL = '/api';

//1、根据经纬度获取位置详情
export const reqGetPosition = (geohash) => ajax(`${BASEURL}/position/${geohash}`);
//2、获取食品分类列表
export const reqGetFoodTypes = () => ajax(`${BASEURL}/index_category`);
//3、根据经纬度获取商铺列表
export const reqGetShops = (latitude, longitude) => ajax(`${BASEURL}/shops`, {latitude, longitude});
//4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (keyword, geohash) => ajax(`${BASEURL}/search_shops`, {keyword, geohash});
//5、获取一次性验证码
export const reqGetCaptcha = () => ajax(`${BASEURL}/captcha`);
//6、用户名密码登陆
export const reqLogin = (name, pwd, captcha) => ajax(`${BASEURL}/login_pwd`, {name, pwd, captcha}, 'POST');
//7、发送短信验证码
export const reqSendCode = (phone) => ajax(`${BASEURL}/sendcode`, {phone});
//8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(`${BASEURL}/login_sms`, {phone, code}, 'POST');
//9、根据会话获取用户信息
export const reqUserinfo = () => ajax(`${BASEURL}/userinfo`);
//10、用户登出
export const reqQuit = () => ajax(`${BASEURL}/logout`);

export const reqShopMenu = () => ajax('/menu');

export const reqShopRatings = () => ajax('/ratings');

export const reqShopInfo = () => ajax('/info');
