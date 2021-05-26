function create_svg(width,height){
	return  d3.select("body")
			.append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("style", "outline: thin solid black;");
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
		.attr("r", 3)
		.attr('stroke', 'black')
		.attr('fill',function(d) {
			return d[2]; // new data field
		});
}

function move_circles(circle,data){
	circle.data(data)
		.join("circle")
		.transition()
		.attr("cx", function(d) {
			return d[0];
		})
		.attr("cy", function(d) {
			return d[1];
		});
	
}