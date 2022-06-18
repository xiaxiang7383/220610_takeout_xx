<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
<!--      <HeadTop :title="position.name">-->
      <HeadTop title="江东区">
        <router-link to="/search" class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
        <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="header_login" slot="right">
          <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
          <span class="header_login_text" v-else><i class="iconfont icon-person"></i></span>
        </router-link>
      </HeadTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="typesArr.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(types, index) in typesArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(type, index) in types" :key="index">
                <div class="food_container">
                  <img :src="`${baseImgUrl}${type.image_url}`">
                </div>
                <span>{{ type.title }}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="../../common/images/msite_back.svg" alt="back" v-else>
      </nav>
      <ShopList/>
    </section>
  </div>
</template>
<script>
import HeadTop from '../../components/HeadTop/HeadTop'
import ShopList from "../../components/ShopList/ShopList";
import {mapState, mapActions} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'HomePage',
  components: {HeadTop, ShopList},
  data() {
    return {
      baseImgUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted() {
    this.getFoodTypes();
  },
  methods: {
    ...mapActions(['getFoodTypes'])
  },
  computed: {
    ...mapState(['position', 'types', 'userInfo']),
    typesArr() {
      const {types} = this;
      const arr = [];
      let minArr = [];
      types.forEach(t => {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(t);
      });
      return arr;
    }
  },
  watch: {
    types(newValue) {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        });
      });
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../.././common/stylus/mixins.styl"
.msite
  width 100%

  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-wrapper
        width 100%
        height 100%

        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap

          .link_to_food
            width 25%

            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0

              img
                display inline-block
                width 50px
                height 50px

            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666

      .swiper-pagination
        > span.swiper-pagination-bullet-active
          background #02a774
</style>
