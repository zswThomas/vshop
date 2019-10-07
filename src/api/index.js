/*
接口请求模块
函数返回值为peomise对象
*/
import ajax from './ajax'
// const BASE = 'http://localhost:4000'
const BASE = '/api' // 跨域
// 1.请求地理位置
export const reqAddress = (geohash) => ajax(`${BASE}/position/${geohash}`)
// 2.请求食品分类列表
export const reqFoodCategorys = () => ajax(BASE + '/index_category')
// 3.根据经纬获取
export const reqShpos = (longitude, latitude) => ajax(BASE + '/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqShopbyKey = (keyword, geohash) => ajax(BASE + '/search_shops', {keyword, geohash})
// 5、获取一次性验证码
// export const reqCaptcha = () => ajax(BASE + '/captcha')
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqTextCaptcha = (phone) => ajax(BASE + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSms = (phone, code) => ajax(BASE + '/login_sns', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE + '/userinfo')
// 10、用户登出
export const reqLogOut = () => ajax(BASE + '/logout')

// 获取商家信息
export const reqShopInfo = () => ajax('/info')
// 获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
// 获取商家商品数组
export const reqShopGoods = () => ajax('/goods')
