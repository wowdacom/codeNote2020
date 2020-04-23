<template>
    <div class="chart">
        <div id="mybox">

        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'

    export default {
        data() {
            return {
                chartData: null
            }
        },
        methods: {
            name() {
                
            }
        },
        mounted () {
            let vm = this
            d3.csv("/suicide_rate.csv", function(d) {
                return {
                    year: +d["年 "].replace(" 年", ""), // convert "Year" column to Date
                    count: +d["自殺死亡人數"].replace(",", ""),
                    roughEstimates: +d["粗死亡率 (單位：每十萬人口)"],
                    standardEstimates: +d["標準化死亡率 (單位：每十萬人口)"], // convert "Length" column to number
                    rank: +d["國人死因排名"]
                };
            }).then(function(data) {
                vm.chartData = data;
                let width = document.getElementById('mybox').offsetWidth;
                let height = document.getElementById('mybox').offsetHeight;
                let marginLeft = 10
                let marginRight = 10
                let marginTop = 10
                let marginBottom = 10

                let svg = d3.select("#mybox")
                            .append("svg")
                            .attr("width", width)
                            .attr("height", height)

                let x  = d3.scaleLinear()
                            .domain([d3.min(vm.chartData.map((item)=>item.year)) - 1,d3.max(vm.chartData.map((item)=>item.year)) + 1])         // This is what is written on the Axis: from 0 to 100
                            .range([0, width - marginLeft - marginRight]);

                let y  = d3.scaleLinear()
                            .domain([d3.max(vm.chartData.map((item)=>item.count)), 0])         // This is what is written on the Axis: from 0 to 100
                            .range([0, height - marginTop - marginBottom]);

                svg
                    .append("g")
                    .attr("transform", `translate(${marginLeft + 50},${height - marginBottom - 30})`)      // This controls the vertical position of the Axis
                    .call(d3.axisBottom(x).ticks(vm.chartData.length));

                svg
                    .append("g")
                    .attr("transform", `translate(${marginLeft + 50},${marginTop - 30})`)      // This controls the vertical position of the Axis
                    .call(d3.axisLeft(y));
                // console.log(vm.chartData);
                // Add X axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", width - 30)
                    .attr("y", height)
                    .text("X axis title");

                // Y axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -marginLeft+20)
                    .attr("x", -marginTop)
                    .text("Y axis title")

            });
        },
    }
</script>

<style lang="scss" scoped>
.chart {
    #mybox {
        margin: 50px auto;
        width: 50%;
        height: 500px;
    }
}
</style>