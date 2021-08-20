import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./LineChart.css"
import dataObject from "./data.json"

const LineChart = () => {

    const d3Chart = useRef()

    useEffect(() => {
        const data = dataObject.Data.Data
        console.log(data);

        data.forEach(function(d) { d.time = new Date(d.time * 1000); });

        const margin = {top: 50, right: 50, bottom: 30, left: 50}
        const width = parseInt(d3.select("#LineChart").style("width"))
        const height = parseInt(d3.select("#LineChart").style("height"))

        // Set up chart
        const svg = d3.select(d3Chart.current)
                        .attr("width", 1300)
                        .attr("height", 600)
                        .style("background-color", "grey")
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // x axis
        const x = d3.scaleTime()
                    .domain(d3.extent(data, function(d){return d.time} ))
                    .range([0, width])

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // y axis
        var yMin = d3.min(data, function(d){ return Math.min(d.low); });
        var yMax = d3.max(data, function(d){ return Math.max(d.high); });

        console.log(yMax);

        const y = d3.scaleLinear()
                    .domain([yMin, yMax])
                    .range([height - margin.top, 0])

        svg.append("g")
            .call(d3.axisLeft(y))

        svg.selectAll("vertLines")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.time))})
            .attr("x2", function(d){return(x(d.time))})
            .attr("y1", function(d){return(y(d.low))})
            .attr("y2", function(d){return(y(d.high))})
            .attr("stroke", "black")
            .style("width", 10)

        svg.selectAll("boxes")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d,i) { return x(d.time) })
            .attr("y", function(d,i) { return y(Math.max(d.open, d.close)); })
            .attr("height", function(d,i) { return y(Math.min(d.open, d.close)) - y(Math.max(d.open, d.close)) })
            .attr("width", 10 )
            .attr("stroke", "black")
            .style("fill", function(d){ return d.open > d.close ? "red" : "green"} )
    })

    return (
        <div id="LineChart">
            <svg ref={d3Chart}></svg>
        </div>
    )
}

export default LineChart