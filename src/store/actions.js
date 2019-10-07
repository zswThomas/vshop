/*
 通过mutation更新状态对象的逻辑行为
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RSET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPGOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqLogOut,
  reqShpos,
  reqUserInfo,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类
  async getFoodCategorys ({commit, state}) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShpos(latitude, longitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步用户信息
  recordUser ({commit}, userinfo) {
    commit(RECEIVE_USER_INFO, {userinfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userinfo = result.data
      commit(RECEIVE_USER_INFO, {userinfo})
    }
  },
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogOut()
    if (result.code === 0) {
      commit(RSET_USER_INFO)
    }
  },
  // 获取商店信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_SHOPINFO, {info})
    }
  },
  // 获取商店评价
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新之后，调用回调函数
      callback && callback()
    }
  },
  // 获取商店食品
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_SHOPGOODS, {goods})
      // 数据更新之后，调用回调函数
      callback && callback()
    }
  },
  // 同步更新food中的count
  updateFoodCount ({commit}, {isadd, food}) {
    if (isadd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
