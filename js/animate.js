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
	if(document.getElementById('add').checked==true){
		var [x,y] = d3.pointer(event);
		rects=[]
		mouse=[]
		safe_arr = [[],[]]
		svg.selectAll('rect').each(function(d,i) { 
			rx = parseInt(d3.select(this).attr('x'))
			ry = parseInt(d3.select(this).attr('y'))
			w  = parseInt(d3.select(this).attr('width'))
			h = parseInt(d3.select(this).attr('height'))
			rects.push([rx,ry,w,h])
		});
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
	if(document.getElementById('add').checked==true){
		var m = d3.pointer(event);
		if (mouse[0]==undefined){
			mouse[0]=m
		}
		else{
			mouse[1]=mouse[0]
			mouse[0]=m
			d_y = (mouse[0][1]-mouse[1][1]) 
			d_x =(mouse[0][0]-mouse[1][0])
			if(d_y ==0 && d_x !=0)
				mouse[3] = 'left'
			else if(d_y !=0 && d_x ==0)
				mouse[3] = 'top'		
			else if (d_y!=0 && d_x !=0)
				dir = d_y/d_x >=1 ? 'top':'left'		
		}
		console.log(mouse[3])
		rect_cur = [parseInt(rect.attr('x')),parseInt(rect.attr('y')),Math.max(0, m[0] - +rect.attr("x")),Math.max(0, m[1] - +rect.attr("y")),parseInt(rect.attr('width')),parseInt(rect.attr('height'))]
		let point_inside = (p,r)=>{
			return p[0]>=r[0] && p[0]<=r[0]+r[2] && p[1]>=r[1] && p[1]<=r[1]+r[3]
		}
		
		let rect_inside = (r1,r2)=>{
			return point_inside([r1[0],r1[1]],r2)||point_inside([r1[0]+r1[2],r1[1]],r2)||point_inside([r1[0],r1[1]+r1[3]],r2)||point_inside([r1[0]+r1[2],r1[1]+r1[3]],r2)
		}
		let rect_int_full=(r1,r2)=>{
			return (r1[0]<=r2[0] && r1[0]+r1[2]>=r2[0]+r2[2] && r1[1]>=r2[1] && r1[1]<=r2[1]+r2[3]) || (r1[1]<=r2[1] && r1[1]+r1[3]>=r2[1]+r2[3]&& r1[0]>=r2[0] && r1[0]<=r2[0]+r2[2] ) 
		} 
		let type_int = (cur)=>{
			if(rect_cur[0]>cur[0] && rect_cur[1]<cur[1]){
				return 'top'
			}
			else if(rect_cur[1]>cur[1] && rect_cur[0]<cur[0]){
				return 'left'
			}
			else{
				/* if(rect_cur[0]+rect_cur[4]>=cur[0])
					return 'top'
				if(rect_cur[1]+rect_cur[5]>=cur[1])
					return 'left' */
				return mouse[3]
			}
		}
		
		//checks for new intersections
		NoInters=[true,true]
		for (const cur of rects){
			if((rect_inside(rect_cur,cur) || rect_inside(cur,rect_cur)|| rect_int_full(rect_cur,cur))){
				let ti = type_int(cur)
				if(ti=='left'){
					NoInters[0]=false
					if (safe_arr[0].indexOf(ti)==-1){
			  				safe_arr[0].push(ti);
							safe_arr[1].push(cur);
					}	
				}
				
				if(ti=='top'){
					NoInters[1]=false
					if (safe_arr[0].indexOf(ti)==-1){
			  				safe_arr[0].push(ti);
							safe_arr[1].push(cur);
					}
				}
				
			}
		}
		//console.log(NoInters)
		let left = safe_arr[1][safe_arr[0].indexOf('left')]
		let top = safe_arr[1][safe_arr[0].indexOf('top')]
		
		 if (NoInters[0]){
			let index = safe_arr[0].indexOf('left')
			if(index!=-1){
				safe_arr[1].splice(index,1)
				safe_arr[0].splice(index,1)
			}
		}
		
		if(NoInters[1]){
			let index = safe_arr[0].indexOf('top')
			if(index!=-1){
				safe_arr[1].splice(index,1)
				safe_arr[0].splice(index,1)
			}
		} 

		 if(left==undefined && top!=undefined){
			rect.attr("width", Math.max(0, m[0] - rect.attr("x")));
			rect.attr("height", Math.max(0, top[1] - rect.attr("y")));
		}
		
		else if (left!=undefined&&top==undefined){
			rect.attr("width", Math.max(0, left[0] - rect.attr("x")));	
			rect.attr("height", Math.max(0, m[1] - rect.attr("y"))); 	
		}
		else if(top!=undefined&&left!=undefined){
			rect.attr("width", Math.max(0, left[0] - rect.attr("x")));
			rect.attr("height", Math.max(0, top[1] - rect.attr("y")));	
		} 
		else{
			rect.attr("width", Math.max(0, m[0] - rect.attr("x")));
			rect.attr("height", Math.max(0, m[1] - rect.attr("y")));
		}
	}
}

function mouseup() {
	if(document.getElementById('add').checked){
		if(rect.attr('width') * rect.attr('height')<=1000)
			rect.remove()
    	svg.on("mousemove", null);
		rect_config(svg)
	}
}

function rect_config(svg)
{
	let dragHandler = d3.drag()
    .on("drag", function (d) {
		if(document.getElementById('move').checked){
        d3.select(this)
            .attr("x", parseInt(d3.select(this).attr('x'))+d.dx)
            .attr("y",parseInt(d3.select(this).attr('y'))+d.dy)  ;
		}	
    });
	dragHandler(svg.selectAll('rect'))

	svg.selectAll('rect')
		.on('click', function(d){
			if(document.getElementById('remove').checked)
				d3.select(this).remove();
		})

	

}


