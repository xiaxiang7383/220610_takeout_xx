<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">夏老板的外卖点餐系统</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{'on' : smsLoginFlg}" @click="smsLoginFlg=true">短信登录</a>
          <a href="javascript:;" :class="{'on' : !smsLoginFlg}" @click="smsLoginFlg=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{'on' : smsLoginFlg}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" @click.prevent="getCode"
                      class="get_verification" :class="{right_phone : rightPhone}">
                {{ countDown > 0 ? `已发送${countDown}s` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册夏老板外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{'on' : !smsLoginFlg}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="refreshCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a @click="goBack" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTips :alertText="alertText" v-show="isAlert" @closeTip="closeTip" />
  </section>
</template>
<script>
import AlertTips from "../../components/AlertTips/AlertTips";
import {reqSendCode, reqSmsLogin, reqLogin} from '../../api'
export default {
  name: 'Login',
  components: {AlertTips},
  data() {
    return {
      smsLoginFlg: true,
      phone: '',
      code: '',
      showPwd: false,
      name: '',
      pwd: '',
      captcha: '',
      countDown: 0,
      alertText: '',
      isAlert: false
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async getCode() {
      if (!this.countDown) {
        this.countDown = 30;
        this.timer = setInterval(() => {
          this.countDown--;
          if (this.countDown <= 0) {
            clearInterval(this.timer)
          }
        }, 1000);

        // ajax
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          this.showAlert(result.msg);
          if (this.countDown) {
            this.countDown = 0;
            clearInterval(this.timer);
            this.timer = undefined;
          }
        }
      }
    },
    refreshCaptcha() {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now();
    },
    showAlert(text) {
      this.isAlert = true;
      this.alertText = text;
    },
    closeTip() {
      this.isAlert = false;
      this.alertText = '';
    },
    async login() {
      let result;
      if (this.smsLoginFlg) {
        const {phone, rightPhone, code} = this;
        if (!phone) {
          this.showAlert('手机号码未输入');
          return;
        } else if (!rightPhone) {
          this.showAlert('手机号码输入不正确');
          return;
        } else if (!/^\d{6}$/.test(code)) {
          this.showAlert('验证码输入不正确');
          return;
        }
        result = await reqSmsLogin(phone, code);
      } else {
        const {name, pwd, captcha} = this;
        if (!name) {
          this.showAlert('用户名必须指定');
          return;
        } else if (!pwd) {
          this.showAlert('密码必须指定');
          return;
        } else if (!captcha) {
          this.showAlert('验证码必须指定');
          return;
        }
        result = await reqLogin(name, pwd, captcha);
      }

      // 停止计时
      if (this.countDown) {
        this.countDown = 0;
        clearInterval(this.timer);
        this.timer = undefined;
      }

      // 刷新图片验证码
      this.refreshCaptcha();

      if (result.code === 0) {
        const user = result.data;
        // 保存用户信息
        this.$store.dispatch('saveUserInfo', user);
        this.$router.replace('/profile');
      } else {
        const msg = result.msg;
        this.showAlert(msg);
      }
    }
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../.././common/stylus/mixins.styl"
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
        font-size 28px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
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
      > form
        > div
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
                color black

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
              transition background-color .3s, border-color .3s
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

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s
                &.right
                  transform translateX(30px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
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
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>
