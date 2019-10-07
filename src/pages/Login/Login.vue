<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" @click.prevent="getCode"
                      :class="{right_phone:rightPhone}">{{computeTime>0?`已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="username">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text"></span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                      @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" @click="$router.back()" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </div>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqPwdLogin} from '../../api'
export default {
  name: 'Login',
  components: {AlertTip},
  data () {
    return {
      loginWay: true, // true代表短信登录，否则为密码登录
      phone: '', // 手机号
      code: '', // 短信验证码
      username: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 图形验证码
      showPwd: false, // 是否显示密码
      computeTime: 0, // 发送验证码倒计时
      alertText: '', // 警告文本
      alertShow: false // 是否显示警告
    }
  },
  computed: {
    rightPhone () {
      // 正则匹配电话格式
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 获取验证码
    getCode () {
      if (!this.computeTime) {
        // 发送验证码倒计时
        this.computeTime = 30
        this.intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
        // 发送ajax请求，向指天定手机发送验证码
      }
    },
    // 显示提示框
    ShowAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 登录信息格式检验
    async login () {
      let result
      // 表单
      if (this.loginWay) { // 短信验证码登录
        const {rightPhone, phone, code} = this
        if (!this.rightPhone) {
          // 手机号码不正确
          alert(rightPhone, phone, code)
          this.ShowAlert('请输入正确的手机号')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码是否是数字
          this.ShowAlert('请输入正确的验证码')
          return
        }
      } else { // 密码登录
        const {username, pwd, captcha} = this
        if (!this.username) {
          // 用户名不可为空
          this.ShowAlert('请输入的用户名')
          return
        } else if (!this.pwd) {
          // 密码不可为空
          this.ShowAlert('请输入的密码')
          return
        } else if (!this.captcha) {
          // 验证码不可为空
          this.ShowAlert('请输入的验证码')
          return
        }
        // 发送ajax请求进行密码登录
        result = await reqPwdLogin({username, pwd, captcha})
      }
      // 根据请求结果数据进行处理
      if (result.code === 0) {
        const user = result.data
        // 登录成功，则获取用户信息
        this.$store.dispatch('recordUser', user)
        // 将用户信息保存至state
        // 页面跳转至用户界面
        this.$router.replace('/profile')
        // 停止计时器
        if (this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      } else {
        // 登录失败，则获取失败信息
        const msg = result.msg
        // 更新验证码
        this.getCaptcha()
        // 显示错误信息
        this.ShowAlert(msg)
      }
    },
    // 关闭提示框
    closeTip () {
      this.alertText = ''
      this.alertShow = false
    },
    // 获取验证码
    getCaptcha (event) {
      // 重新指定img的src值，在最后加上data参数保证每一次的请求都不同，避免了因为缓存而造成的显示问题
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color #02a774
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(25px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 15px
        left 15px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
