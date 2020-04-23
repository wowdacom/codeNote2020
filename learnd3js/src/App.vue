<template>
  <div id="app">
<!-- 
    地圖加上地圖標記
    <MapAndMark></MapAndMark> -->
    <D3Basic></D3Basic>
  </div>
</template>

<script>
import MapAndMark from './components/MapAndMark'
import D3Basic from '@/components/D3Basic.vue';

export default {
  name: 'app',
  
  components: {
    MapAndMark,
    D3Basic
  },
  mounted () {

  },
  methods: {

  },
  computed: {

  }
}
</script>

<style lang="scss">
html, body {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

#app {

}
</style>
