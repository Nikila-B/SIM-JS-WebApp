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
x = tf.tensor([0.9546541, 2.545654, 2.332415, 1.598741, -4.54653]);
y = tf.tensor([1.546541, 4.4264, 3.27453, 5.98741, -4.54653]);
state = [0,1,0,2,1]
p_inf_time=[-1,0,-1,0,0]
//x_inf = tf.fill([5],tf.slice(x,2,1).dataSync());
//y_inf = tf.fill([5],tf.slice(x,2,1).dataSync()); 
r = 2
R = tf.fill([5], r*r);
var now=2
// (x-x_inf)^2 + (y-y_inF)^2
//begin
var zeros = tf.zeros([5])
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
}
//end
svg = create_svg(500,500);