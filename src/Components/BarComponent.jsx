import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "../CSS/BarComponent.css";
import { getNumberOfPosts } from "../function/getNumberOfPosts";

const defaultExample = [
  { letter: "a", frequency: 3 },
  { letter: "b", frequency: 0 },
  { letter: "c", frequency: 4 },
  { letter: "d", frequency: 2 },
];

export function BarComponent(props) {
  let data = defaultExample;
  if (props.data !== "") {
    data = getNumberOfPosts(props.data);
  }
  const d3Chart = useRef();
  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 60 };
    const chartWidth =
      parseInt(d3.select("#container").style("width")) -
      margin.left -
      margin.right;

    const chartHeight =
      parseInt(d3.select("#container").style("height")) -
      margin.top -
      margin.bottom;

    const svg = d3
      .select(d3Chart.current)
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom);
    const x = d3
      .scaleBand()
      //number of objects on x axis
      .domain(d3.range(data.length))
      .range([margin.left, chartWidth - margin.right])
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      //label of each tick on x axis
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].name)
          .tickSizeOuter(0)
      );

    const max = d3.max(data, function (d) {
      return d.posts;
    });

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([chartHeight, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("fill", "red")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d.posts))
      .attr("height", (d) => y(0) - y(d.posts))
      .attr("width", x.bandwidth());
  }, [data]);

  return (
    <div id="container">
      <svg ref={d3Chart}></svg>
    </div>
  );
}
