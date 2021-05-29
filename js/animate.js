function create_svg(width,height){
	return  d3.select("body")
			.append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("style", "outline: thin solid black;")
			.on("mousedown", mousedown)
    		.on("mouseup", mouseup);
}
function init_circles(svg, data){
	return svg.selectAll("circle")
		.data(data)
		.join("circle")
		.attr("cx", function(d) {
				return d[0]; // new data field
		})
		.attr("cy", function(d) {
				return d[1]; // new data field
		})
		.attr("r", 3.5)
		.attr('stroke', 'black')
		.attr('fill',function(d) {
			const colors = ['#00ff00','#ff0000','#0000ff'];
			return colors[d[2]]; // new data field
		});
}
function init_rect(svg, data){
 	return svg.selectAll("rect")
		.data(data)
		.join("rect")
		.attr("x", function(d) {
				return d[0][0]; // new data field
		})
		.attr("y", function(d) {
				return d[0][1]; // new data field
		})
		.attr("width", function(d) {
				return d[1][0]; // new data field
		})
		.attr("height", function(d) {
				return d[1][1] // new data field
		})
		.attr('stroke', 'black')
		.attr('fill',function(d) {
			return '#ffffff'; // new data field
		}); 

		
}
function move_circles(circle,data){
	circle.data(data)
		.join("circle")
		.attr('fill',function(d) {
			const colors = ['#00ff00','#ff0000','#0000ff'];
			return colors[d[2]]; // new data field
		})
		.transition()
		.attr("cx", function(d) {
			return d[0];
		})
		.attr("cy", function(d) {
			return d[1];
		});
}

function mousedown(event) {
    var [x,y] = d3.pointer(event);
	console.log(x,y)
    rect = svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("height", 0)
        .attr("width", 0)
		.attr('stroke', 'black')
		.attr('fill','#ffffff')
		.attr('fill-opacity',0)

    svg.on("mousemove", mousemove);
}


function mousemove(event) {
    var m = d3.pointer(event);

    rect.attr("width", Math.max(0, m[0] - +rect.attr("x")))
        .attr("height", Math.max(0, m[1] - +rect.attr("y")));
}

function mouseup() {
    svg.on("mousemove", null);
}