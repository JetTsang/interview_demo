<template>
  <!-- <storage-counter-view></storage-counter-view> -->
  <layout-img></layout-img>
</template>

<script>
// import StorageCounterView from './views/StorageCounterView.vue'
import LayoutImg from './views/LayoutImg.vue'

export default {
  name: 'App',
  components: {
    // StorageCounterView,
    LayoutImg
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
