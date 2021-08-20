import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import "./LineChart.css"
import dataObject from "./data.json"

const LineChart = () => {

    const d3Chart = useRef()

    useEffect(() => {
        const data = dataObject.Data.Data
        console.log(data);

        const timeStamps = [...new Set(data.map(dataPoint => dataPoint.time))]

        console.log(timeStamps);

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
        const max = d3.max(data, function(d){return d.high})

        const y = d3.scaleLinear()
                    .domain([0, max])
                    .range([height, 0])

        svg.append("g")
            .call(d3.axisLeft(y))

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                        .x(function(d){return x(d.time)})
                        .y(function(d){return y(d.low)}))

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                        .x(function(d){return x(d.time)})
                        .y(function(d){return y(d.open)}))

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                        .x(function(d){return x(d.time)})
                        .y(function(d){return y(d.high)}))
    })

    return (
        <div id="LineChart">
            <svg ref={d3Chart}></svg>
        </div>
    )
}

export default LineChart