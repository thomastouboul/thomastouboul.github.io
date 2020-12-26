function plotSkillsRadarChart() {

  var dimensions = [
    {
      dimension : 'Data processing',
      name : 'data_processing',
      value : 84,
      height : 130,
      width : 120,
      content : "<tspan x='8' dy='0' class='bold'>R : </tspan>" +
        "<tspan x='8' dy='18'>- data.table</tspan>" +
        "<tspan x='8' dy='18'>- magrittr</tspan>" +
        "<tspan x='8' dy='24' class='bold'>Python : </tspan>" +
        "<tspan x='8' dy='18'>- pandas</tspan>" +
        "<tspan x='8' dy='18'>- NumPy</tspan>"
    },
    {
      dimension : 'Data analysis',
      name : 'data_analysis',
      value : 78,
      height : 110,
      width : 100,
      content : "<tspan x='8' dy='0' class='bold'>R : </tspan>" +
        "<tspan x='8' dy='18'>- MASS</tspan>" +
        "<tspan x='8' dy='18'>- FactoMineR</tspan>" +
        "<tspan x='8' dy='24' class='bold'>Python : </tspan>" +
        "<tspan x='8' dy='18'>- SciPy</tspan>"
    },
    {
      dimension : 'Machine learning',
      name : 'machine_learning',
      value : 61,
      height : 145,
      width : 120,
      content : "<tspan x='8' dy='0' class='bold'>R : </tspan>" +
        "<tspan x='8' dy='18'>- caret</tspan>" +
        "<tspan x='8' dy='18'>- e1071</tspan>" +
        "<tspan x='8' dy='18'>- nnet</tspan>" +
        "<tspan x='8' dy='24' class='bold'>Python : </tspan>" +
        "<tspan x='8' dy='18'>- scikit-learn</tspan>" +
        "<tspan x='8' dy='18'>- statsmodels</tspan>"
    },
    {
      dimension : 'Big data',
      name : 'big_data',
      value : 27,
      height : 70,
      width : 100,
      content : "<tspan x='8' dy='0' class='bold'>Hadoop</tspan>" +
        "<tspan x='8' dy='18' class='bold'>MapReduce</tspan>" +
        "<tspan x='8' dy='18' class='bold'>Spark</tspan>"
    },
    {
      dimension : 'Visualization',
      name : 'visualization',
      value : 69,
      height : 130,
      width : 100,
      content : "<tspan x='8' dy='0' class='bold'>R : </tspan>" +
        "<tspan x='8' dy='18'>- ggplot2</tspan>" +
        "<tspan x='8' dy='18'>- Plotly</tspan>" +
        "<tspan x='8' dy='18'>- Shiny</tspan>" +
        "<tspan x='8' dy='24' class='bold'>JavaScript : </tspan>" +
        "<tspan x='8' dy='18'>- d3.js</tspan>"
    },
    {
      dimension : 'Data storage',
      name : 'data_storage',
      value : 57,
      height : 105,
      width : 100,
      content : "<tspan x='8' dy='0' class='bold'>SQL : </tspan>" +
        "<tspan x='8' dy='18'>- Oracle SQL</tspan>" +
        "<tspan x='8' dy='18'>- SQLite</tspan>" +
        "<tspan x='8' dy='24' class='bold'>NoSQL : </tspan>" +
        "<tspan x='8' dy='18'>- MongoDB</tspan>"
    }
  ];

  var stats_data_points = dimensions.map(x => x.value);
  var stats_data_points_loop = stats_data_points;
  stats_data_points_loop.push(stats_data_points_loop[0]);

  var r = 180;
  var margin = { left: 70, top: 30, right: 100, bottom: 30 };
  var svg = d3.select("#technicalChart")
    .append("svg")
    .attr("width", r * 2 + margin.left + margin.right)
    .attr("height", r * 2 + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var ticks = [20, 40, 60, 80, 100];

  var radialLine = d3.lineRadial();
  var yScale = d3.scaleLinear().range([0, r]).domain([0, 100]);

  /* Axes, labels, grid */
  dimensions.forEach((dimension, i) => {

    var g = svg.append('g')
      .attr('transform', `translate(${r}, ${r}) rotate(${i * 60})`)

    g.append('g').call(d3.axisLeft(yScale).tickFormat('').tickValues(ticks).tickSize(3));
    g.append('g').call(d3.axisRight(yScale).tickFormat('').tickValues(ticks).tickSize(4));
    g.append('text')
      .text(dimension.dimension)
      .attr('text-anchor', function() {
        if (i == 0 | i == 3) {
          return 'middle';
        } else if (i == 1 | i == 2) {
          return 'start';
        } else {
          return 'end';
        }
      })
      .attr("font-size", 12)
      .attr("fill", "rgba(60, 60, 60, 1)")
      .attr('transform', function() {
        if (dimension.dimension == 'Big data') {
          return `translate(0, -${r + 20}) rotate(${-i * 60})`;
        } else {
          return `translate(0, -${r + 10}) rotate(${-i * 60})`;
        }
      });

  });

  /* Grid color */
  svg.append('g')
    .selectAll('path')
    .data(ticks)
    .enter()
    .append('path')
      .attr('d', d =>
        radialLine([1, 2, 3, 4, 5, 6, 7].map((v, i) => [Math.PI * 2 * i / 6, yScale(d)]))
      )
      .attr('transform', `translate(${r}, ${r})`)
      .attr('stroke', 'grey')
      .attr('opacity', 0.5)
      .attr('fill', "rgba(255, 255, 255, 0.05)");

  /* Area */
  svg.append('g')
    .selectAll('path')
    .data([0])
    .enter()
    .append('path')
      .attr('d', d =>
        radialLine(stats_data_points_loop.map((v, i) => [Math.PI * 2 * i / 6, yScale(v)]))
      )
      .attr('transform', `translate(${r}, ${r})`)
      .attr('stroke', 'rgba(70, 200, 240, 1)')
      .attr('stroke-width', 2)
      .attr('fill', 'rgba(70, 200, 240, 0.4)');

  /* Dots */
  svg.append('g')
    .selectAll("circle")
    .data(stats_data_points)
    .enter()
    .append("circle")
    .attr("cx", 0)
    .attr("cy", function(d) { return yScale(-d); })
    .attr('transform', function(d, i) {
      return `translate(${r}, ${r}) rotate(${i * 60})`;
    })
    .attr("r", 5)
    .attr("fill", "rgba(70, 200, 240, 1)");

  /* Tooltip overlay */
  var focus = svg.append("g")
    .attr("class", "focus")
    .style("display", "none");
  focus.append("rect")
    .attr("class", "tooltip")
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("stroke", "rgb(70, 200, 240)")
    .attr('stroke-width', 1)
    .attr("fill", "rgba(255, 255, 255, 0.8)");
  focus.append("text")
    .attr("class", "tooltip-text")
    .attr("x", 8)
    .attr("y", 20)
    .attr("fill", "rgb(60, 60, 60)");

  /* Path */
  var arc = d3.arc().innerRadius(0).outerRadius(r*2);
  var pie = d3.pie().value(function(d) { return d; }).sort(null).padAngle(0.01);

  svg.append('g')
    .selectAll('path')
	  .data(pie([1/6,1/6,1/6,1/6,1/6,1/6]))
	  .enter()
	  .append('path')
	  .attr('d', arc)
    .attr('transform', function(d, i) {
      return `translate(${r}, ${r}) rotate(30)`;
    })
    .attr('opacity', 0)
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", function(d,i) { if (i==5) {mousemove(0)} else {mousemove(i+1)}; });

  function mousemove(i) {
    focus.attr("transform", `translate(${r}, ${r}) rotate(` + i * 60 + `)`);
    focus.select(".tooltip")
      .attr("transform", `translate(0, ` + yScale(-stats_data_points[i]) + `) rotate(` + (-i * 60) + `)`)
      .attr("height", dimensions[i]["height"])
      .attr("width", dimensions[i]["width"]);
    focus.selectAll("text")
      .attr("transform", `translate(0, ` + yScale(-stats_data_points[i]) + `) rotate(` + (-i * 60) + `)`);
    focus.select(".tooltip-text")
      .html(dimensions[i]["content"]);
  }

}
