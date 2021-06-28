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
function get_line(x,y)
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
function add_data(svg,data,x,y,xAxis,yAxis,valueline,num)
{

    // Scale the range of the data
    //x.domain(d3.extent(data,function(d){return d.time}));
    //y.domain([0,d3.max(data,function(d){return d.inf})]);
    x_lim = 50;
    x.domain([0,x_lim]);
    y.domain([0,num]);


    svg.append("path")
        .data([data])         // Add the valueline path.    
        .attr("class", "line")  
        .attr("d", valueline)
        .attr('fill','none')
        .attr('stroke','black')

    svg.append("g")                     // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")                     // Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

}

function updateData(svg,data,x,y,xAxis,yAxis,valueline,now) {
    // Scale the range of the data again
    if(now>=x_lim-5)
    {   
        x_lim+=25; 
        x.domain([0,x_lim]);
    }
        

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
    svg.select(".line")   // change the line
        .duration(50)
        .attr("d", valueline(data));
    svg.select(".x.axis") // change the x axis
        .duration(50)
        .call(xAxis);
    svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(yAxis);

}