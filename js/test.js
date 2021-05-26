/* var data = tf.tensor([[10,50],[30,40],[50,30],[70,20],[90,10]])
const arr = data.arraySync();
var data2 = [[100,50],[300,400],[500,300],[70,200],[90,100]]
svg = create_svg(500,500);
circle = init_circles(svg,arr);
document.getElementById("start").addEventListener("click", function(){return move_circles(circle,data2)}); */
let obj = new Box("sim1",100,[0,0]);
obj.add_people(50,0.9);
const arr = obj.p_xy.arraySync();
console.log(arr);
svg = create_svg(500,500);
circle = init_circles(svg,arr);
