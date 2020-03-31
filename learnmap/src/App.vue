<template>
  <div id="app">

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

    var projection = d3.geoMercator();

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geoPath()
        .projection(projection);

    var g = svg.append("g");

    d3.json("/COUNTY_MOI_1081121.json").then(function(topology) {

      projection
      .scale(4000)
      .center([121.5,25.2])
      let marks = [{long: 25.16343, lat: 121.77042},{long: 25.14761, lat: 121.81256},{long: 25.14023, lat: 121.82764}]

      g.selectAll("path")
       .data(topojson.feature(topology, topology.objects.COUNTY_MOI_1081121).features)
       .enter().append("path")
       .attr("d", path);

      d3.json("/Markers.json").then(function(marks){
        svg.selectAll('circle')
          .data(marks)
          .enter()
          .append('circle')
          .attr('class', 'marker')
          .attr('cx', function(d) { return projection([d.lat, d.long])[0]})
          .attr('cy', function(d) { return projection([d.lat, d.long])[1]})
          .attr('r', 4)
          .attr('fill', 'red')
          .on("mouseover", function(b){
                       console.log("binish", b)
                       d3.select(this).style("fill", "red").append('text')
                       .text("hi");
                   })
          .on("mouseout", function(){d3.select(this).style("fill", "blue");
                   });
      })

    }).catch(function(err){
      

    })
  }
}
</script>

<style lang="scss">
#app {
  .marker {
    fill: aqua;
    z-index: 1;
    position: relative;
  }
}
</style>
