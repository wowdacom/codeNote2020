<template>
    <div class="chart">
        <div id="mybox">

        </div>
        <div class="controller">
            <div @click="handleSwitch" :class="{active: isSwitchOn}" class="switch">
                <div class="switch_btn"></div>
            </div>
            <ul class="lists">
                <li :style="{'background-color': item.active ? '#EBEBE4' : item.color, 'color': item.active ? '#aaa' : '#000' }"  v-for="(item, index) in menu" :key="item.target" class="list">
                    <div  @click="handleChangeData(index)" class="list-btn">
                        {{ item.name }}
                    </div>
                    
                </li>
            </ul>
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
                myCSV: null,
                chartData: null,
                isSwitchOn: false,
                currentTarget: 'count',
                annotations: {

                },
                menu: [{
                    name: "死亡人數",
                    note: "自殺死亡人數(人)",
                    target: 'count',
                    active: true
                },{
                    name: "粗死亡率",
                    note: "粗死亡率 (單位：每十萬人口)",
                    target: 'roughEstimates',
                    active: false
                },{
                    name: "標準化死亡率",
                    note: "標準化死亡率 (單位：每十萬人口)",
                    target: 'standardEstimates',
                    active: false
                },{
                    name: "死因排名",
                    note: "國人死因排名",
                    target: 'rank',
                    active: false
                }]
            }
        },
        methods: {
            handleSwitch () {
                this.isSwitchOn =  !this.isSwitchOn
                if (this.isSwitchOn === true) {
                    this.currentTarget = this.menu.find(function(item){
                        return item.active === true
                    }).target
                }
            },
            updateChart(whichItem){
                let vm  =this
                let margin = {top: 20, right: 30, bottom: 40, left: 80},
                        width = document.getElementById('mybox').offsetWidth,
                        height = document.getElementById('mybox').offsetHeight;
                let svg = d3.select(".mybox-content")
                let xScale  = d3.scaleLinear()
                                .domain([d3.min(vm.chartData.map((item)=>item.year)) - 1,d3.max(vm.chartData.map((item)=>item.year)) + 1])         // This is what is written on the Axis: from 0 to 100
                                .range([margin.left, width - margin.right]);

                let yScaleOrigin  = d3.scaleLinear()
                                .domain([vm.getCeil(d3.max(vm.chartData.map((item)=>item[vm.currentTarget]))), 0])         // This is what is written on the Axis: from 0 to 100
                                .range([margin.top, height - margin.bottom]);

                let yScale  = d3.scaleLinear()
                                .domain([vm.getCeil(d3.max(vm.chartData.map((item)=>item[vm.menu[whichItem].target]))), 0])         // This is what is written on the Axis: from 0 to 100
                                .range([margin.top, height - margin.bottom]);

                svg.selectAll("g.y-axis")
                    .call(d3.axisLeft(yScale));

                let line = d3.line()
                        .x(function(d, i){
                            return xScale(d.year)
                        })
                        .y(function(d){
                            return yScale(d[vm.menu[whichItem].target])
                        })
                        .curve(d3.curveMonotoneX)

                // // Y axis label:
                svg.selectAll(".anchor-y").remove();
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("class", "anchor-y")
                    .attr("transform", "rotate(-90)")
                    .attr("y",  30)
                    .attr("x", -margin.top)
                    .text(vm.menu[whichItem].note);

                // 9. Append the path, bind the data, and call the line generator
                svg.selectAll(".line").remove();
                svg.append("path")
                    .datum(vm.chartData) // 10. Binds data to the line 
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("class", "line") // Assign a class for styling 
                    .attr("fill", "none")
                    .attr("stroke", "#ffab00")
                    .attr("d", line); // 11. Calls the line generator

                if (this.isSwitchOn === true) {
                    svg.selectAll(".dot")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("transform", function(d, i) {
                        console.log( )
                        return 'translate(0,' + ( yScale(d[vm.menu[whichItem].target]) - yScaleOrigin(d[vm.currentTarget]) )  + ')';
                    })
                    .attr("r", 5)
                    .attr("fill", "#ffab00")
                } else {
                    svg.selectAll(".dot").remove();
                    svg.selectAll(".dot")
                        .data(vm.chartData)
                        .enter().append("circle") // Uses the enter().append() method
                        .style("opacity","0") 
                        .attr("class", "dot") // Assign a class for styling
                        .attr("cx", function(d, i) {
                            return xScale(d.year);
                        })
                        .attr("cy", function(d) { return yScale(d[vm.menu[whichItem].target]) })
                        .attr("r", 5)
                        .attr("fill", "#ffab00")
                        .transition()
                        .duration(1500)
                        .ease(d3.easeLinear)
                        .style("opacity","1")
                }

 
            },
            handleChangeData(whichItem) {
 
                this.menu.forEach(function(d){d.active = false})
                this.menu[whichItem].active = true
                this.updateChart(whichItem)
            },
            initChart() {
                let vm = this
                this.myCSV.then(function(data) {

                    let margin,
                        width,
                        height,
                        svg,
                        xScale,
                        yScale,
                        line,
                        annotations,
                        makeAnnotations;

                    vm.chartData = data;

                    margin = {top: 20, right: 30, bottom: 40, left: 80},
                        width = document.getElementById('mybox').offsetWidth,
                        height = document.getElementById('mybox').offsetHeight;

                    svg = d3.select("#mybox")
                                .append("svg")
                                .attr("class", "mybox-content")
                                .attr("width", width)
                                .attr("height", height)

                    xScale  = d3.scaleLinear()
                                .domain([d3.min(vm.chartData.map((item)=>item.year)) - 1,d3.max(vm.chartData.map((item)=>item.year)) + 1])         // This is what is written on the Axis: from 0 to 100
                                .range([margin.left, width - margin.right]);

                    yScale  = d3.scaleLinear()
                                .domain([vm.getCeil(d3.max(vm.chartData.map((item)=>item.count))), 0])         // This is what is written on the Axis: from 0 to 100
                                .range([margin.top, height - margin.bottom]);

                    line = d3.line()
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
                        .attr("class", "x-axis")
                        .call(d3.axisBottom(xScale).ticks(vm.chartData.length/2).tickFormat(d3.format('.0f')).tickSize(0));

                    svg
                        .append("g")
                        .attr("transform", `translate(${margin.left},0)`)      // This controls the vertical position of the Axis
                        .attr("class", "y-axis")
                        .call(d3.axisLeft(yScale));
                    
                    // console.log(vm.chartData);
                    // Add X axis label:
                    svg.append("text")
                        .attr("text-anchor", "end")
                        .attr("class", "anchor-x")
                        .attr("x", width - 30)
                        .attr("y", height- 10)
                        .text("年 (西元)");

                    // Y axis label:
                    svg.append("text")
                        .attr("text-anchor", "end")
                        .attr("class", "anchor-y")
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

                    // annotations = [{
                    //     note: { label: "自殺率最高點"},
                    //     x: xScale(vm.chartData.find((item)=> item.count === d3.max(vm.chartData.map((item)=>item.count))).year),
                    //     y: yScale(d3.max(vm.chartData.map((item)=>item.count))),
                    //     dy: -10,
                    //     dx: -10,
                    //     subject: { radius: 500, radiusPadding: 10 }
                    //     }]

                    // makeAnnotations =  d3.annotation().annotations(annotations)
                    
                    // svg
                    //     .append("g")
                    //     .attr("class","annotation-group")
                    //     .call(makeAnnotations)
                });
            },
            getCeil (number) {
                let counter = 0, result = 0;
                result = number;
                while((result/10).toFixed(2) > 1) {
                    counter++;
                    result = result/10;
                    console.log((result/10).toFixed(2) > 0)
                }
                
                if(counter === 0){
                    return Math.ceil(result)
                } else {
                    result = Math.ceil(result) * Math.pow(10, counter);
                    return result
                }

            },
            paintList() {
                this.menu.forEach((d, i)=>{
                    d.color = d3.schemeSet3[i]
                })
            },
        },
        created () {
            this.paintList()
            this.myCSV = d3.csv("./suicide_rate.csv", function(d) {
                return {
                    year: +d["年 "].replace(" 年", ""), // convert "Year" column to Date
                    count: +d["自殺死亡人數"].replace(",", ""),
                    roughEstimates: +d["粗死亡率 (單位：每十萬人口)"],
                    standardEstimates: +d["標準化死亡率 (單位：每十萬人口)"], // convert "Length" column to number
                    rank: +d["國人死因排名"]
                };
            })
        },
        mounted () {

            //左右間的留白怎麼處理? https://observablehq.com/@d3/margin-convention 很完整的示範
            this.initChart()
            
        },
    }
</script>

<style lang="scss" scoped>
.chart {
    
    #mybox {
        margin: 50px auto 0;
        width: 100%;
        height: 400px;
        max-width: 768px;
    }
    .controller {
        display: flex;
        justify-content: space-between;
        margin: 0px auto;
        width: 100%;
         max-width: 768px;
        .switch {
            width: 47px;
            height: 30px;
            border-radius: 25px;
            border: solid 1px #aaa;
            margin-left: 60px;
            transition: all 1s;
            .switch_btn {   
                width: 30px;
                height: 100%;
                border-radius: 50%;
                background-color: #ccc;
                 border: solid 1px #aaa;
            }
            &.active {
                background-color: #2196F3;
                transition: all 1s;
                .switch_btn {
                    transform: translate(50%, 0);
                    background-color: white;
                     border: solid 1px #2196F3;
                }
            }
        }
        .lists {
            display: flex;
            flex-direction: column;
            list-style: none;
            .list {
                
                margin: 5px;
                cursor: pointer;
                border-radius: 5px;
                padding: 5px 10px;
                text-align: center;
                &:first-child {
                    margin-top: 0;
                }
            }
        }
    }
    
}
</style>