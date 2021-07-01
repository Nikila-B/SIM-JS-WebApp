var margin,width,height;

  
function create_axis()
{
    margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;
}

function get_x()
{
    return d3.scaleLinear().range([0, width]);
}

function get_y()
{
    return d3.scaleLinear().range([height, 0]);
}

function get_xaxis(x)
{
    return d3.axisBottom(x)
}
    //.orient("bottom").ticks(5);
function get_yaxis(y)
{
    return d3.axisLeft(y)
}
    //.orient("left").ticks(5);
function get_line_inf(x,y)
{
    return d3.line(x,y)
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.inf); });
}

function get_line_sus(x,y)
{
    return d3.line(x,y)
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.inf); });
}

function get_line_rec(x,y)
{
    return d3.line(x,y)
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.inf); });
}

function get_line_rec(x,y)
{
    return d3.line(x,y)
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.inf); });
}

function create_trend_svg()
{
    return d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

// Get the data
function add_data(svg,data,x,y,xAxis,yAxis,valueline1,valueline2,valueline3,num)
{

    // Scale the range of the data
    //x.domain(d3.extent(data,function(d){return d.time}));
    //y.domain([0,d3.max(data,function(d){return d.inf})]);
    x_lim = 50;
    x.domain([0,x_lim]);
    y.domain([0,num]);


    svg.append("path")
        .data([data])         // Add the valueline path.    
        .attr("class", "line1")  
        .attr("d", valueline1)
        .attr('fill','none')
        .attr('stroke','red')

    svg.append("path")
        .data([data])         // Add the valueline path.    
        .attr("class", "line2")  
        .attr("d", valueline2)
        .attr('fill','none')
        .attr('stroke','green')

    svg.append("path")
        .data([data])         // Add the valueline path.    
        .attr("class", "line3")  
        .attr("d", valueline3)
        .attr('fill','none')
        .attr('stroke','blue')


    svg.append("g")                     // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Time");

    svg.append("g")                     // Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Count"); 

}

function updateData(svg,data1,data2,data3,x,y,xAxis,yAxis,valueline1,valueline2,now) {
    // Scale the range of the data again
    if(now>=x_lim-5)
    {   
        x_lim+=25; 
        x.domain([0,x_lim]);
    }
        

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
    svg.select(".line1")   // change the line
        .duration(50)
        .attr("d", valueline1(data1));
    svg.select(".line2")   // change the line
        .duration(50)
        .attr("d", valueline2(data2));
    svg.select(".line3")   // change the line
        .duration(50)
        .attr("d", valueline2(data3));
    svg.select(".x.axis") // change the x axis
        .duration(50)
        .call(xAxis);
    svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(yAxis);

}