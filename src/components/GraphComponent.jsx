import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import abs from '@stdlib/math/base/special/abs';

const GraphComponent = ({ 
  data, 
  xAxisLabel = 'X', 
  yAxisLabel = 'Y', 
  color = 'steelblue',
  xDomain,
  yDomain 
}) => {
  const svgRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    
    d3.select(svgRef.current).selectAll("*").remove();
    
    const margin = { top: 20, right: 30, bottom: 42, left: 48 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
      .domain(xDomain || d3.extent(data, d => d.x))
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .domain(yDomain || d3.extent(data, d => d.y))
      .range([height, 0]);
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style("font-size", "12px");
    
    svg.append("g")
      .call(d3.axisLeft(y))
      .style("font-size", "12px");
    
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .text(xAxisLabel)
      .attr("fill", "#666");
    
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -height / 2)
      .text(yAxisLabel)
      .attr("fill", "#666");
    
    svg.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""));
    
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .attr("opacity", 0.1)
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(""));
    
    const yDomainValues = yDomain || d3.extent(data, d => d.y);
    if (yDomainValues[0] <= 0 && yDomainValues[1] >= 0) {
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", width)
        .attr("y2", y(0))
        .attr("stroke", "#999")
        .attr("stroke-width", 1);
    }
    
    const xDomainValues = xDomain || d3.extent(data, d => d.x);
    if (xDomainValues[0] <= 0 && xDomainValues[1] >= 0) {
      svg.append("line")
        .attr("x1", x(0))
        .attr("y1", 0)
        .attr("x2", x(0))
        .attr("y2", height)
        .attr("stroke", "#999")
        .attr("stroke-width", 1);
    }
    
    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);
    
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line);
    
    const hoverGroup = svg.append("g")
      .attr("class", "hover-group")
      .style("display", "none");
    
    hoverGroup.append("line")
      .attr("class", "hover-line")
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#999")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3");
    
    hoverGroup.append("circle")
      .attr("class", "hover-point")
      .attr("r", 5)
      .attr("fill", color);
    
    svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0)
      .on("mousemove", function(event) {
        const mouseX = d3.pointer(event)[0];
        const xValue = x.invert(mouseX);
        
        let closestPoint = data[0];
        let minDistance = abs(xValue - closestPoint.x);
        
        for (let i = 1; i < data.length; i++) {
          const distance = abs(xValue - data[i].x);
          if (distance < minDistance) {
            minDistance = distance;
            closestPoint = data[i];
          }
        }
        
        hoverGroup.style("display", null);
        hoverGroup.select(".hover-line")
          .attr("x1", x(closestPoint.x))
          .attr("x2", x(closestPoint.x));
        
        hoverGroup.select(".hover-point")
          .attr("cx", x(closestPoint.x))
          .attr("cy", y(closestPoint.y));
        
        setTooltipData({
          x: closestPoint.x,
          y: closestPoint.y,
          mouseX: event.offsetX,
          mouseY: event.offsetY
        });
      })
      .on("mouseleave", function() {
        hoverGroup.style("display", "none");
        setTooltipData(null);
      });
    
  }, [data, xAxisLabel, yAxisLabel, color, xDomain, yDomain]);

  return (
    <div className="bg-white p-4 rounded-lg shadow relative">
      <svg ref={svgRef} className="w-full max-w-4xl mx-auto"></svg>
      
      {tooltipData && (
        <div 
          className="absolute bg-white px-3 py-2 text-sm rounded shadow-md border border-gray-200 z-10 pointer-events-none"
          style={{
            left: tooltipData.mouseX + 10,
            top: tooltipData.mouseY - 40,
            transform: tooltipData.mouseX > 700 ? 'translateX(-100%)' : 'none'
          }}
        >
          <div className="font-semibold text-gray-700">{xAxisLabel}: {tooltipData.x.toFixed(2)}</div>
          <div className="font-semibold" style={{ color: color }}>{yAxisLabel}: {tooltipData.y.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
