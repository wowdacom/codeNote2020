<template>
  <div id="app">
    <svg></svg>
    <div ref="target" class="target"></div>
    <div class="box"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'app',
  data () {
    return {
      target_node: null
    }
  },
  components: {
  
  },
  mounted () {

    let vm = this
    const width = 100;
    const boxHeight = 100;
    const svg = d3.select('svg').attr('width',width).attr('height',boxHeight);
    let target_node = this.$refs['target'].getBoundingClientRect();

    let nodes = []
    nodes.push([target_node.x + 5, target_node.y + 5]);
    nodes.push([5, 5]);

    // Append the nodes to the svg element
    for (let i = 0; i < nodes.length; i++) {
      svg
        .append('circle')
        .attr('cx', nodes[i][0])
        .attr('cy', nodes[i][1])
        .attr('r', 5)
        .style('fill', 'green');
    }

    // Create a horizontal link from the first node to the second
    const link = d3.linkHorizontal()({
      source: nodes[0],
      target: nodes[1]
    });

    // Append the link to the svg element
    svg
      .append('path')
      .attr('d', link)
      .attr('stroke', 'black')
      .attr('fill', 'none');

    window.addEventListener('scroll', vm.handleScroll)

  },
  methods: {
    handleScroll () {
      console.log(window.pageYOffset)
      let vm = this
      const svg = d3.select('svg')
      let target_node = this.$refs['target'].getBoundingClientRect();

      let nodes = []
      nodes.push([target_node.x + 5, window.pageYOffset + target_node.y + 5]);
      nodes.push([5, 5]);

      // Append the nodes to the svg element
      for (let i = 0; i < nodes.length; i++) {
        svg
          .append('circle')
          .attr('cx', nodes[i][0])
          .attr('cy', nodes[i][1])
          .attr('r', 5)
          .style('fill', 'green');
      }

      // Create a horizontal link from the first node to the second
      const link = d3.linkHorizontal()({
        source: nodes[0],
        target: nodes[1]
      });

      // Append the link to the svg element
      svg
        .append('path')
        .attr('d', link)
        .attr('stroke', 'black')
        .attr('fill', 'none');
    }
  },
  computed: {
    target_nodes () {

    }
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
  svg {
    width: 100%;
    height: 100%;
    border: solid 1px red;
  }
  .target {
    width: 10px;
    height: 10px;
    background-color: green;
    border-radius: 50%;
    position: fixed;
    left : 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .box {
    width: 100%;
    height: 100vh;
  }
}
</style>
