<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuideVue v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuideVue from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {FooterGuideVue}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
