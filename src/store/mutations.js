/*
  直接更新对象的多个方法
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RSET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPINFO,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'
export default {
  [RECEIVE_ADDRESS] (state, {address}) { // 地址赋值
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) { // 视频分类赋值
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) { // 商店列表
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userinfo}) { // 商店列表
    state.userinfo = userinfo
  },
  [RSET_USER_INFO] (state) { // 重置用户信息
    state.userinfo = {}
  },
  [RECEIVE_SHOPGOODS] (state, {goods}) { // 商店食品
    state.goods = goods
  },
  [RECEIVE_SHOPINFO] (state, {info}) { // 商店信息
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) { // 商店评价
    state.ratings = ratings
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) { // 减少食物数量
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 将food从cartFood中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) { // 增加食物数量
    if (!food.count) {
      // 通过点运算符新增加属性，没有绑定监听,需要使用vue的set函数来使新属性也有监听
      Vue.set(food, 'count', 1)
      // 将food添加到cartFood中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [CLEAR_CART] (state) {
    // 清除food中的count
    // eslint-disable-next-line no-return-assign
    state.cartFoods.forEach((food) => food.count = 0)
    // 移除购物车中的食品
    state.cartFoods = []
  }
}
