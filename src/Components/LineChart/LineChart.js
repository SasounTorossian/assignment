import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./LineChart.css"
import dataObject from "./data.json"

const LineChart = () => {

    const d3Chart = useRef()

    useEffect(() => {
        const data = dataObject.Data.Data

        data.forEach(function(d) {d.time = new Date(d.time * 1000)})

        const margin = {"top": 50, "right": 50, "bottom": 50, "left": 25, "axis": 55}
        const width = 635 + margin.right + margin.left
        const height = 567 + margin.top + margin.bottom
        let timeFormat = d3.timeFormat("%I:%M %p %a %Y")
        
        let svg = d3.select("svg")
                    .attr("width", width)
                    .attr("height", height)
        
        let chart = d3.select("svg")

        let xMin = d3.min(data, function(d){ return Math.min(d.time) })
        let xMax = d3.max(data, function(d){ return Math.max(d.time) })

        let yMin = d3.min(data, function(d){ return Math.min(d.low) })
        let yMax = d3.max(data, function(d){ return Math.max(d.high) })

        let xScale = d3.scaleTime()
                        .domain([xMin, xMax])
                        .range([margin.left, width - margin.right])

        let xAxisScale = d3.scaleTime()
                            .domain([xMin, xMax])
                            .range([margin.left, width - margin.axis])

        let yScale = d3.scaleLinear()
                        .domain([yMin, yMax])
                        .range([height - margin.top, margin.bottom]);

        let yAxis = d3.axisRight(yScale)
                        .tickValues(yScale.domain())

        let xAxis = d3.axisBottom(xAxisScale)
                        .ticks(5)
                        .tickPadding(5)
                        .tickFormat(timeFormat);

        chart.selectAll("line")
                .data(data)
                .enter()
                .append("svg:line")
                .attr({
                    "x1": function(d,i) { return xScale(d.time); },
                    "x2": function(d,i) { return xScale(d.time); },
                    "y1": function(d,i) { return yScale(d.high); },
                    "y2": function(d,i) { return yScale(d.low); },
                    "stroke": "black" 
                })

        chart.selectAll("rect")
                .data(data)
                .enter()
                .append("svg:rect")
                .attr({
                    "width": 10,
                    "x": function(d,i) { return xScale(d.time); },
                    "y": function(d,i) { return yScale(Math.max(d.open, d.close)); },
                    "height": function(d,i) { return yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)); },
                    "fill": function (d) { return d.open > d.close ? "red" : "green" },
                    "stroke": "black"
                });
        
        chart.append('g')
            .call(yAxis)
            .attr('transform', 'translate(' + (width - margin.axis) + ', 0)');

        chart.append('g')
            .call(xAxis)
            .attr('transform', 'translate(0, ' + (height - margin.bottom) + ')');
        
        // const timeStamps = [...new Set(data.map(dataPoint => dataPoint.time))]

        // console.log(timeStamps);

        // const margin = {top: 50, right: 30, bottom: 30, left: 30}
        // const width = parseInt(d3.select("#LineChart").style("width"))
        // const height = parseInt(d3.select("#LineChart").style("height"))

        // // Set up chart
        // const svg = d3.select(d3Chart.current)
        //                 .attr("width", width)
        //                 .attr("height", height)
        //                 .style("background-color", "red")
        //                 .append("g")
        //                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // const x = d3.scaleTime()
        //             .domain(d3.extent(timeStamps, function(d){return d.date} ))
        //             .range([0, width])

        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")

        // const max = d3.max(timeStamps, function(d){return d.date})

        // const y = d3.scaleLinear()
        //             .domain([0, max])
        //             .range([height, 0])

        // svg.append("g")
        //     .call(d3.axisLeft(y))

        // svg.append("path")
        //     .datum(timeStamps)
        //     .attr("fill", "none")
        //     .attr("stroke", "white")
        //     .attr("stroke-wdth", 3)
        //     .attr("d", d3.line()
        //                 .x(function(d){return x(d.date)})
        //                 .y(function(d){return y(d.count)}))

    })

    return (
        <div id="LineChart">
            <svg ref={d3Chart}></svg>
        </div>
    )
}

export default LineChart