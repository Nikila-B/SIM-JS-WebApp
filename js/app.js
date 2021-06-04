/*
//Button loop 
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
var n =500
for(let i =1;i<n;i++){
    info_buffer.push(obj.get_info());
    obj.move_to_dest(0.01);
    obj.update_state(25,25,0.5,0.2)
    console.log(obj.update_dest(1))
    if (obj.update_dest(1) == true)
    {
        console.log('present');
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
});
*/