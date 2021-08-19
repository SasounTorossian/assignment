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

        const margin = {top: 50, right: 30, bottom: 30, left: 30}
        const width = parseInt(d3.select("#LineChart").style("width"))
        const height = parseInt(d3.select("#LineChart").style("height"))

        // Set up chart
        const svg = d3.select(d3Chart.current)
                        .attr("width", width)
                        .attr("height", height)
                        .style("background-color", "red")
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        const x = d3.scaleTime()
                    .domain(d3.extent(timeStamps, function(d){return d.date} ))
                    .range([0, width])

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")

        const max = d3.max(timeStamps, function(d){return d.date})

        const y = d3.scaleLinear()
                    .domain([0, max])
                    .range([height, 0])

        svg.append("g")
            .call(d3.axisLeft(y))

        svg.append("path")
            .datum(timeStamps)
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-wdth", 3)
            .attr("d", d3.line()
                        .x(function(d){return x(d.date)})
                        .y(function(d){return y(d.count)}))

    })

    return (
        <div id="LineChart">
            <svg ref={d3Chart}></svg>
        </div>
    )
}

export default LineChart