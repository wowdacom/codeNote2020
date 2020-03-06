<template>
  <div id="app">
    <div id="pressure-me">
      {{ force }}
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Pressure from 'pressure'

export default {
  name: 'app',
  data () {
    return {
      force: 0
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    let vm = this
    Pressure.set('#pressure-me', {
      change: function(force){
        console.log(force)
        vm.force = force;
      }
    });
  }
}
</script>

<style lang="scss">
#app {
  #pressure-me {
    background-color: rgb(208, 255, 0);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    cursor: pointer;
    margin: 100px auto;
  }
}
</style>
