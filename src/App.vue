<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuideVue v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuideVue from './components/FooterGuide/FooterGuide.vue'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components: {FooterGuideVue},
  mounted() {
    this.getPosition();
    this.getUserInfo();
  },
  methods: {
    ...mapActions(['getPosition', 'getUserInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
