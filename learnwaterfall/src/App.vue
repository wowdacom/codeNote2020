<template>
  <div id="app">
    <Waterfall/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Waterfall from "./components/Waterfall.vue";

export default {
  name: 'app',
  components: {
    Waterfall
  },
  mounted () {

  }
}
</script>

<style lang="scss">
#app {
  .my-grid {
    // width: 100%;
    // .item {
    //   width: 30%;
    //   border: solid 1px red;
    // }
  }
}
</style>
