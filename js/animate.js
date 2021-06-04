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

function infected_circles(svg,info_inf,rad,dur){
	svg.append('g')
        .selectAll("circle")
		.data(info_inf)
		.join("circle")
		.attr("cx", function(d) {
				return d[0]; // new data field
		})
		.attr("cy", function(d) {
				return d[1]; // new data field
		})
		.attr("r", 0)
		.attr("fill",'#ff0000')
		.attr('stroke','#ff0000')
		.attr("fill-opacity", 0.2)
        .style("stroke-width", 1)
        .transition()
         .duration(dur)
		.attr("r", rad)
		
        .remove() 	
}

function move_circles(circle,data,dur,frame,r){
		circle.data(data)
			.join("circle")
			.transition()
			.duration(0)
			.attr("cx", function(d) {
				return d[0];
			})
			.attr("cy", function(d) {
				return d[1];
			})
			.on('end',function(d){d3.select(this).attr('fill',function(d) {
				const colors = ['#00ff00','#ff0000','#0000ff'];
				return colors[d[2]];})
				 if(d[2]==1){
					d3.select('svg').append('circle')
									.attr('r',3.5+(frame)%(r-3.5))
									.attr('cx',d[0])
									.attr('cy',d[1])
									.attr('fill','#ff0000')
									.attr('fill-opacity',0.1)
									.attr('stroke','black')
									.transition()
									.duration(dur)
									.attr('r',3.5+(frame+1)%(r-3.5))
									.remove()
        		} 
			})
}

function mousedown(event) {
	if(document.getElementById('rect-create').checked==true){
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
}


function mousemove(event) {
	if(document.getElementById('rect-create').checked==true){
    var m = d3.pointer(event);
    rect.attr("width", Math.max(0, m[0] - +rect.attr("x")))
        .attr("height", Math.max(0, m[1] - +rect.attr("y")));
	}
}

function mouseup() {
	if(document.getElementById('rect-create').checked==true){
    	svg.on("mousemove", null);
	}
}