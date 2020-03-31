<template>
  <div id="app">
    <img ref="logo" alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    let mydom = this.$refs.logo
    

    fromEvent(mydom, 'click')
      .pipe(scan(count => count + 1, 0))
      .subscribe(count => console.log(`Clicked ${count} times`));
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
