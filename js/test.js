/* var data = tf.tensor([[10,50],[30,40],[50,30],[70,20],[90,10]])
const arr = data.arraySync();
var data2 = [[100,50],[300,400],[500,300],[70,200],[90,100]]
svg = create_svg(500,500);
circle = init_circles(svg,arr);
document.getElementById("start").addEventListener("click", function(){return move_circles(circle,data2)}); */
/* let obj = new Box("sim1",200,[300,300]);
obj.add_people(100,0.9);
const arr = obj.get_info();
const ar1 = obj.get_box_info(); */
/*const arr1 = obj1.get_info();
const arr2 = arr.concat(arr1);
const ar = obj.get_box_info();
console.log(ar)
const ar2 =[ar,ar1]
rect = init_rect(svg,[ar1]);
circle = init_circles(svg,arr); 
obj.move_people(obj.p_xy);
const arr2 = obj.get_info();
console.log(arr)
console.log(arr2)
document.getElementById("start").addEventListener("click", function(){return move_circles(circle,arr2)});*/
/*x = tf.tensor([0.9546541, 2.545654, 2.332415, 1.598741, -4.54653]);
y = tf.tensor([1.546541, 4.4264, 3.27453, 5.98741, -4.54653]);
state = [0,1,0,2,1]
p_inf_time=[-1,0,-1,0,0]*/
//x_inf = tf.fill([5],tf.slice(x,2,1).dataSync());
//y_inf = tf.fill([5],tf.slice(x,2,1).dataSync()); 
/*r = 2
R = tf.fill([5], r*r);
var now=2*/
// (x-x_inf)^2 + (y-y_inF)^2
//begin
/*var zeros = tf.zeros([5])
var ones = tf.fill([5],1)
var dummy = tf.fill([5],-100)
var index = tf.range(0,5,1)
var sus_x =  tf.where(tf.equal(state,zeros),x,dummy);
var sus_y =  tf.where(tf.equal(state,zeros),y,dummy);
var inf =  tf.where(tf.equal(state,ones),index,dummy);
var inf_cur = []
for(let i =0; i<2;i++){
    var id = tf.slice(inf,i,1).dataSync()[0]
    if(id!=-100){
        var x_inf = tf.fill([5],tf.slice(x,id,1).dataSync());
        var y_inf = tf.fill([5],tf.slice(x,id,1).dataSync()); 
        var result = tf.where(tf.greater(tf.sub(R,tf.add(tf.squaredDifference(sus_x,x_inf),tf.squaredDifference(sus_y,y_inf))),tf.zeros([5])),index,dummy)
        inf_cur = inf_cur.concat(result.arraySync())
        if(now-p_inf_time[id] >= 5){
            state[id]=2
        }
    }
}
inf_cur = [].concat(...inf_cur)
inf_cur = inf_cur.filter(item => item !== -100)
for(x in inf_cur){
    state[x]=1 //probability
    p_inf_time[x]=now
}*/
//end


// The code below works in a frame by frame fashion
/* var init = [[100,200,1],[500,350,0]]
svg = create_svg(500,500)
circle = svg.selectAll('circles')
    .data(init)
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
var dest=[[200,400,1],[100,50,0]]

circle.data(dest)
    .join('circle')
    .transition()
    .duration(100)
    .attr("cx", function(d) {
        return d[0]; // new data field
    })
    .attr("cy", function(d) {
            return d[1]; // new data field
    })
    .on('end',function(d){
        d3.select(this).attr('fill',function(d) {
        const colors = ['#00ff00','#ff0000','#0000ff'];
        return colors[d[2]];})
        if(d[2]==1){
            d3.select('svg').append('circle').attr('r',3.5)
                                            .attr('cx',d[0])
                                            .attr('cy',d[1])
                                            .attr('fill','#ff0000')
                                            .attr('fill-opacity',0.1)
                                            .attr('stroke','black')
                                            .transition()
                                            .duration(1000)
                                            .attr('r',10)
                                            .remove()
        }
        
    }) */

svg = create_svg(500,500);
let obj = new Box("sim1",0,500);
obj.add_people(50,0.4);
//obj.add_people(50,0.2)
var info = obj.get_info();
const ar1 = obj.get_box_info();
//const ar2 = obj[ar,ar1]
rect = init_rect(svg,[ar1]);
circle = init_circles(svg,info);
obj.set_dest(200);
//console.log(tf.memory().numTensors)
info_buffer=[]
info_buffer.push(info)
var n = 0
for(let i =1;i<n;i++){
    info_buffer.push(obj.get_info());
    obj.count_state(obj.p_state);
    /*console.log('inf'+obj.inf_c);
    console.log('sus'+obj.sus_c);
    console.log('rec'+obj.rec_c);*/
    console.log(obj.trend)
    obj.move_to_dest(0.01);
    obj.update_state(25,25,0.5,0.2)
    if (obj.update_dest(1) == true)
    {
        obj.set_dest(200);
    }
}
var button = document.getElementById("start")
document.getElementById("start").innerHTML='Start'
var animateTimer;
var isAnimating = false
var completed = false
var i=0;
button.addEventListener("click", function(){
        if(completed==true){
            i=0
            button.innerHTML="Start";
            completed=false
            move_circles(circle,info_buffer[0],0,0,0)
        }
        else if (isAnimating) {
            clearInterval(animateTimer)    
            button.innerHTML="Resume";
            isAnimating=false                                        
        }
        else {
            isAnimating=true
            button.innerHTML="Pause";
            animateTimer = setInterval(function(){
                if(i<n-1){
                        i++;
                        console.log(i)
                        move_circles(circle,info_buffer[i],30,i,25);
                }
                else{
                    clearInterval(animateTimer)
                    button.innerHTML="Reset";
                    isAnimating=false
                    completed=true
                }
            },30)
        }
    updateData(svg1,data2,x,y,xAxis,yAxis,valueLine)
});

var data1 = 
    {ser1: [0.3,2,3], ser2: [4,16,8]};
    //{ser1: 2, ser2: 16},
    //{ser1: 3, ser2: 8}
 
 
 var data1 = [
    {time: 1, inf: 7},
    {time: 4, inf: 1},
    {time: 6, inf: 8}
 ];
create_axis()
x = get_x()
y = get_y()
xAxis = get_xaxis(x)
yAxis = get_yaxis(y)
valueLine = get_line(x,y)
svg1 = create_trend_svg()
add_data(svg1,data1,x,y,xAxis,yAxis,valueLine)
var data2 = [
    {time: 1, inf: 7},
    {time: 4, inf: 1},
    {time: 6, inf: 8},
    {time: 10, inf:15}
 ];

/*
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.inf); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
function plot(data) {


  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.time; }));
  y.domain([0, d3.max(data, function(d) { return d.inf; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .attr('fill','none')
      .attr('stroke','black')

  // Add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

}
plot(data2)
*/