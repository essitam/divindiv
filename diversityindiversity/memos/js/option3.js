
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    /*radius of circles*/
    radius = 1400;

/*range is number of circles*/
var circles = d3.range(20).map(function() {
  return {
    x: Math.round(Math.random() * (width - radius * 2) + radius),
    y: Math.round(Math.random() * (height - radius * 2) + radius)
  };
});

/*colour of circles*/
var color = d3.scaleOrdinal()
    /*.range(["#00FF00", "#DAF7A6", " #E52B71"]);*/
    .range(d3.schemeCategory20);


var voronoi = d3.voronoi()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .extent([[-1, -1], [width + .5, height + 5]]);

var circle = svg.selectAll("g")
  .data(circles)
  .enter().append("g")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));


var cell = circle.append("path")
  .data(voronoi.polygons(circles))
    .attr("d", renderCell)
    .attr("id", function(d, i) { return "cell-" + i; });

circle.append("clipPath")
    .attr("id", function(d, i) { return "clip-" + i; })
  .append("use")
    .attr("xlink:href", function(d, i) { return "#cell-" + i; });

	/*.attr("xlink:href", function(d, i) { return "url(#cell-" + i + ")"; });  ------> this didn't work.*/

circle.append("circle")
    .attr("clip-path", function(d, i) { return "url(#clip-" + i + ")"; })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", radius)
    .attr("xlink:href", "http://en.wikipedia.org/wiki/")
    .style("fill", function(d, i) { return color(i); }  );



function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  d3.select(this).select("circle").attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  cell = cell.data(voronoi.polygons(circles)).attr("d", renderCell);
}

function dragended(d, i) {
  d3.select(this).classed("active", false);
}

function renderCell(d) {
  return d == null ? null : "M" + d.join("L") + "Z";
}


	//ok. so changing the size of the image x= y= does change the size of image, but not without still pixelating.

	//changeing the pattern id height/width also does change the aspect ratio positioning, but still with pixelation. it also makes a difference.

//for moving boxes
