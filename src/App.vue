<template>
  <div id="app">
    <!-- <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div"  v-bind:swipe-options="{ direction:'horizontal', threshold: 50 }">             -->
          <router-view></router-view>         
    <!-- </v-touch> -->
  </div>
</template>

<script>
import '@/assets/css/tool.css'
export default {
  name: 'App',
  methods: {
      onSwipeLeft () {
        this.$router.go(-1)
      }
  }
}
</script>

<style>

</style>
