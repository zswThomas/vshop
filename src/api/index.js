/*
接口请求模块
函数返回值为peomise对象
*/
import ajax from './ajax'
// 1.请求地理位置
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
// 2.请求食品分类列表
export const reqFoodType = () => ajax('/index_category')
// 3.根据经纬获取
export const reqShpos = (longitude,latitude) => ajax('/shops', {longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqShopbyKey = (keyword,geohash) => ajax('/search_shops',{keyword,geohash})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax('/captcha')
// 6、用户名密码登陆
export const reqLogin = () => ajax('/login_pwd')
// 7、发送短信验证码
export const reqTextCaptcha = () => ajax('/sendcode')
// 8、手机号验证码登陆
export const reqSns = () => ajax('/login_sns')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax('/userinfo')
// 10、用户登出
export const reqLoginOut = () => ajax('/loginout')
