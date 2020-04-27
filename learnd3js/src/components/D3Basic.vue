<template>
    <div class="chart">
        <div id="mybox">

        </div>
    </div>
</template>

<script>
import * as d3Base from 'd3'
import { annotation } from 'd3-svg-annotation'

// attach all d3 plugins to the d3 library
const d3 = Object.assign(d3Base, { annotation })

    export default {
        data() {
            return {
                chartData: null,
                annotations: {

                }
            }
        },
        methods: {
            name() {
                
            }
        },
        mounted () {

            //左右間的留白怎麼處理? https://observablehq.com/@d3/margin-convention 很完整的示範
            //
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

                let margin = {top: 20, right: 30, bottom: 40, left: 80},
                    width = document.getElementById('mybox').offsetWidth,
                    height = document.getElementById('mybox').offsetHeight;

                let svg = d3.select("#mybox")
                            .append("svg")
                            .attr("class", "mybox-content")
                            .attr("width", width)
                            .attr("height", height)

                let xScale  = d3.scaleLinear()
                            .domain([d3.min(vm.chartData.map((item)=>item.year)) - 1,d3.max(vm.chartData.map((item)=>item.year)) + 1])         // This is what is written on the Axis: from 0 to 100
                            .range([margin.left, width - margin.right]);

                let yScale  = d3.scaleLinear()
                            .domain([5000, 0])         // This is what is written on the Axis: from 0 to 100
                            .range([margin.top, height - margin.bottom]);

                let line = d3.line()
                            .x(function(d, i){
                                return xScale(d.year)
                            })
                            .y(function(d){
                                return yScale(d.count)
                            })
                            .curve(d3.curveMonotoneX)

                svg
                    .append("g")
                    .attr("transform", `translate(0,${height - margin.bottom})`)      // This controls the vertical position of the Axis
                    .call(d3.axisBottom(xScale).ticks(vm.chartData.length).tickFormat(d3.format('.0f')).tickSize(0));

                svg
                    .append("g")
                    .attr("transform", `translate(${margin.left},0)`)      // This controls the vertical position of the Axis
                    .call(d3.axisLeft(yScale));
                
                // console.log(vm.chartData);
                // Add X axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", width - 30)
                    .attr("y", height- 10)
                    .text("年 (西元)");

                // Y axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("transform", "rotate(-90)")
                    .attr("y",  30)
                    .attr("x", -margin.top)
                    .text("自殺死亡人數 (人)")

                // 9. Append the path, bind the data, and call the line generator 
                svg.append("path")
                    .datum(vm.chartData) // 10. Binds data to the line 
                    .attr("class", "line") // Assign a class for styling 
                    .attr("fill", "none")
                    .attr("stroke", "#ffab00")
                    .attr("d", line); // 11. Calls the line generator

                svg.selectAll(".dot")
                    .data(vm.chartData)
                    .enter().append("circle") // Uses the enter().append() method
                    .attr("class", "dot") // Assign a class for styling
                    .attr("cx", function(d, i) {
                        return xScale(d.year);
                    })
                    .attr("cy", function(d) { return yScale(d.count) })
                    .attr("r", 5)
                    .attr("fill", "#ffab00")

                let annotations = [{
                        note: { label: "自殺率最高點"},
                        x: xScale(vm.chartData.find((item)=> item.count === d3.max(vm.chartData.map((item)=>item.count))).year),
                        y: yScale(d3.max(vm.chartData.map((item)=>item.count))),
                        dy: -10,
                        dx: -10,
                        subject: { radius: 500, radiusPadding: 10 }
                        }]

                let makeAnnotations =  d3.annotation().annotations(annotations)
                
                svg
                    .append("g")
                    .attr("class","annotation-group")
                    .call(makeAnnotations)
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