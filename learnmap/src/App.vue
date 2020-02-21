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

    var projection = d3.geoMercator()
                      .center([121,24])
                      .scale(8000);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geoPath()
        .projection(projection);

    var g = svg.append("g");

    d3.json("/COUNTY_MOI_1081121.json").then(function(topology) {

      g.selectAll("path")
       .data(topojson.feature(topology, topology.objects.COUNTY_MOI_1081121).features)
       .enter().append("path")
       .attr("d", path);

    }).catch(function(err){
      

    })
  }
}
</script>

<style lang="scss">
#app {

}
</style>
