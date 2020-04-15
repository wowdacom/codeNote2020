<template>
  <div class="hello">
    <svg id="my_canvas"></svg>
    <!-- 參考資料 https://observablehq.com/@d3/clustered-bubbles?collection=@d3/d3-force
    https://bl.ocks.org/mbostock/7881887
    想用這個 https://observablehq.com/@pjsier/force-layout-cells -->
  </div>
</template>

<script>
import * as d3 from 'd3'
import json from '../assets/json/data.json'

export default {
  name: 'HelloWorld',
  data () {
    return {
      width: 600,
      height: 600
    }
  },
  props: {
    msg: String
  },
  mounted () {
    const color = d3.scaleOrdinal(d3.range(10), d3.schemeCategory10)
    const vm = this
    const nodes = this.pack().leaves();
    const simulation = d3.forceSimulation(nodes)
      .force("x", d3.forceX(vm.width / 2).strength(0.01))
      .force("y", d3.forceY(vm.height / 2).strength(0.01))
      .force("collide", vm.forceCollide());

    const svg = d3.select(document.querySelector("#my_canvas"));
    const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => color(d.data.group))
      .call(vm.drag(simulation));

    node.transition()
        .delay((d, i) => Math.random() * 500)
        .duration(750)
        .attrTween("r", d => {
          const i = d3.interpolate(0, d.r);
          return t => d.r = i(t);
        });

    simulation.on("tick", () => {
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });

    // invalidation.then(() => simulation.stop());

  },
  methods: {
    pack () {
      let vm = this
      return d3.pack()
        .size([vm.width, vm.height])
        .padding(1)
      (d3.hierarchy(json)
        .sum(d => d.value))
    },
    forceCluster() {
      const strength = 0.2;
      let nodes;
      let vm = this
      let alpha = 0.4;
      function force(alpha) {
        const centroids = d3.nest().rollup(vm.centroid(nodes));
        console.log(centroids)
        const l = alpha * strength;
        for (const d of nodes) {
          const {x: cx, y: cy} = centroids.get(d.data.group);
          d.vx -= (d.x - cx) * l;
          d.vy -= (d.y - cy) * l;
        }
      }

      force.initialize = _ => nodes = _;

      return force;
    },
    forceCollide() {
      const alpha = 0.4; // fixed for greater rigidity!
      const padding1 = 2; // separation between same-color nodes
      const padding2 = 6; // separation between different-color nodes
      let nodes;
      let maxRadius;

      function force() {
        const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
        for (const d of nodes) {
          const r = d.r + maxRadius;
          const nx1 = d.x - r, ny1 = d.y - r;
          const nx2 = d.x + r, ny2 = d.y + r;
          quadtree.visit((q, x1, y1, x2, y2) => {
            if (!q.length) do {
              if (q.data !== d) {
                const r = d.r + q.data.r + (d.data.group === q.data.data.group ? padding1 : padding2);
                let x = d.x - q.data.x, y = d.y - q.data.y, l = Math.hypot(x, y);
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l, d.y -= y *= l;
                  q.data.x += x, q.data.y += y;
                }
              }
            } while (q = q.next);
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
          });
        }
      }

      force.initialize = _ => maxRadius = d3.max(nodes = _, d => d.r) + Math.max(padding1, padding2);

      return force;
    },
    centroid(nodes) {
      let x = 0;
      let y = 0;
      let z = 0;
      for (const d of nodes) {
        let k = d.r ** 2;
        x += d.x * k;
        y += d.y * k;
        z += k;
      }
      return {x: x / z, y: y / z};
    },
    drag (simulation) {
  
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
svg {
  width: 600px;
  height: 600px;
}
</style>
