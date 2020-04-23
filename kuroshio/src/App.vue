<template>
  <div id="app">
    <div class="cover">
      <h1>我是封面</h1>
    </div>
    <HelloWorld2 msg="Welcome to Your Vue.js App"/>
    <div class="more">
      <h1>更多資訊</h1>
    </div>
    <div class="more">
      <h1>更多資訊</h1>
    </div>
  </div>
</template>

<script>
import HelloWorld2 from './components/HelloWorld2.vue'

export default {
  name: 'App',
  components: {
    HelloWorld2
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

html, body, *, *::before, *::after {
  box-sizing: border-box;
}
#app {
  .cover {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .more {
      width: 100vw;
      height: 100vh;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
</style>
