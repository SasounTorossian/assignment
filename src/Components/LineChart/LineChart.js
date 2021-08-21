import React, { useEffect } from "react"
import * as d3 from "d3"
import "./LineChart.css"
import dataObject from "./data.json"

const LineChart = () => {

    useEffect(() => {
        // Import JSON file and extract data.
        const data = dataObject.Data.Data
        // console.log(data);

        // Convert unix timestamp into Date objects.
        data.forEach((d) => d.time = new Date(d.time * 1000));

        // Set constants for svg canvas size and margins.
        const margin = {top: 100, right: 100, bottom: 100, left: 100}
        const width = 1000 - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom
        const widthSvg = width + margin.left + margin.right
        const heightSvg = height + margin.left + margin.right

        // Set up chart
        const svg = d3.select("svg")
                        .attr("width", widthSvg) 
                        .attr("height", heightSvg)
                        .style("background-color", "rgba(51,51,51,1)")
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        //**** X AXIS ****/
        // Find low and high x values to determine min/max values on x axis.
        let xMin = d3.min(data, (d) => Math.min(d.time) );
        let xMax = d3.max(data, (d) => Math.max(d.time) );               

        // Function to subtract days to the first data point, in order to shift it away from y axis.
        const subtractDays = (date, days) => {
            let result = new Date(date);
            result.setDate(result.getDate() - days);
            return result;
          }

        // X Scale. Use scaleTime to map input times to x axis width.
        const xScale = d3.scaleTime() 
                        .domain([subtractDays(xMin, 1), xMax])
                        .range([0, width])

        // Format the x axis ticks.
        let timeFormat = d3.timeFormat("%d-%m-%y")

        // X Axis. Use xScale to generate x axis markings
        const xAxis = d3.axisBottom(xScale)
                        .ticks(d3.timeDay.every(1))
                        .tickFormat(timeFormat)

        // Generate bottom x axis using xScale function.
        svg.append("g") 
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")") 
            .attr("color", "white")
            .selectAll("text")	
            .attr("text-anchor", "end")
            .attr("dx", "-8px")
            .attr("dy", "1px")
            .attr("transform", "rotate(-50)")
            .attr("font-size", "15px")
            .attr("color", "white")

        // Create label for x axis
        svg.append("text")             
            .attr("y", height + margin.top)
            .attr("x", width/2)
            .attr("dy", "-0.5em")
            .attr("fill", "white")
            .text("Date")

        //**** Y AXIS ****/
        // Find low and high y values to determine min/max values on y axis.
        let yMin = d3.min(data, (d) => Math.min(d.low) );
        let yMax = d3.max(data, (d) => Math.max(d.high) );
            
        // Y Scale. Use scaleLinear to map input values to y axis height.
        const yScale = d3.scaleLinear()
                        .domain([(yMin*0.95), yMax]) // Add 5% buffer to start y axis
                        .range([height, 0])

        // X Axis. Use yScale to generate y axis markings
        const yAxis = d3.axisLeft(yScale)

        // Generate left y axis using yScale function.
        svg.append("g")
            .call(yAxis)
            .attr("font-size", "15px")
            .attr("color", "white")

        // Create label for y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - (height/2))
            .attr("y", 0 - margin.left)
            .attr("dy", "1.1em")
            .attr("fill", "white")
            .text("Value"); 

        //**** RENDER DATA POINTS ****/
        // Create vertical lines based on input data.
        svg.selectAll("verticalLines")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", (d) => xScale(d.time) )
            .attr("x2", (d) => xScale(d.time) )
            .attr("y1", (d) => yScale(d.low) )
            .attr("y2", (d) => yScale(d.high) )
            .attr("stroke", "white")
            .style("width", 10)

        // Superimpose boxes on previously rendered lines.
        const boxWidth = 10
        svg.selectAll("boxes")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d,i) => xScale(d.time) )
            .attr("y", (d,i) => yScale(Math.max(d.open, d.close)) )
            .attr("width", boxWidth )
            .attr("height", (d,i) => yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)) )
            .attr("fill", (d) => d.open > d.close ? "red" : "green" )
            .attr("transform", "translate("+ (-boxWidth/2) + ", 0)") 
    })

    return (
        <div id="LineChart">
            <svg></svg>
        </div>
    )
}

export default LineChart