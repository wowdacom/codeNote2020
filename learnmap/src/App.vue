<template>
  <div id="app">
    <svg class="my-svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from "topojson-client";

export default {
  name: 'app',
  data () {
    return {
      mapDataSet: null,
      mapInfo: {
        width: 960,
        height: 500
      }
    }
  },
  components: {

  },
  mounted () {

    var width = 960,
        height = 500;

    var tooltip = d3.select('#app').append('div')
            .attr('class', 'hidden tooltip');

    var projection = d3.geoMercator();

    var svg = d3.select(".my-svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geoPath()
        .projection(projection);

    var g = svg.append("g");

    d3.json("./COUNTY_MOI_1081121.json").then(function(topology) {

      projection
      .scale(7000)
      .center([121.5,23.5])
      let marks = [{long: 25.16343, lat: 121.77042},{long: 25.14761, lat: 121.81256},{long: 25.14023, lat: 121.82764}]

      g.selectAll("path")
       .data(topojson.feature(topology, topology.objects.COUNTY_MOI_1081121).features)
       .enter().append("path")
       .attr("d", path);

      d3.json("./Markers.json").then(function(marks){
        svg.selectAll('circle')
          .data(marks)
          .enter()
          .append('circle')
          .attr('class', 'marker')
          .attr('cx', function(d) { return projection([d.lat, d.long])[0]})
          .attr('cy', function(d) { return projection([d.lat, d.long])[1]})
          .attr('r', 4)
          .attr('fill', 'red')
          .on('mousemove', function(d) {
                    var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
                    tooltip.classed('hidden', false)
                        .attr('style', 'left:' + (mouse[0] + 15) +
                                'px; top:' + (mouse[1] - 35) + 'px')
                        .html(d.name);
                })
                .on('mouseout', function() {
                    tooltip.classed('hidden', true);
                });
      })

    }).catch(function(err){
      

    })
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  background-color: #90bfc5;
  display: flex;
  // justify-content: center;
  // align-items: center;
  svg {
    position: relative;
    .marker {
      fill: aqua;
      z-index: 1;
      position: relative;
      cursor: pointer;
    }
  }
  
  .hidden {
        display: none;
  }
  div.tooltip {
      color: #222;
      background-color: #fff;
      padding: .5em;
      text-shadow: #f5f5f5 0 1px 0;
      border-radius: 5px;
      opacity: 0.9;
      position: absolute;
      border: solid 1px white;
      
  }
}
</style>
