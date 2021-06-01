class Box
{
    constructor(name,size,pos)
    {
        this.name = name;
        if (typeof(size) === typeof(1))
            size = [size,size];
        this.size = size;
        if (typeof(pos) === typeof(1))
            pos = [pos,pos];
        this.pos = pos;
        this.num = 0;
        this.inf_c = 0;
        this.sus_c = 0;
        this.rec_c = 0;
        this.now = 0;
        this.p_y = tf.zeros([0]);
        this.p_x = tf.zeros([0])
        this.p_state = []
        this.p_dest_x= tf.zeros([2]);
        this.p_dest_y = tf.zeros([0]);
        this.p_inf_time = []
    }

    add_people(num,inf)
    {
        this.p_x = tf.tidy(()=>tf.concat([this.p_x,tf.randomUniform([num], this.pos[0], this.pos[0]+this.size[0],'float32')]));
        this.p_y = tf.tidy(()=>tf.concat([this.p_y,tf.randomUniform([num], this.pos[1],this.pos[1]+this.size[1],'float32')]));
        this.p_state = tf.tidy(()=>tf.concat([tf.tensor(this.p_state),tf.multinomial(tf.tensor([.9,.1]),num)]).arraySync());
        this.num+=num;
    }
    get_info()
    {
      
        return tf.tidy(()=>tf.stack([this.p_x,this.p_y,tf.tensor(this.p_state)]).transpose().arraySync());
    }
    get_box_info(){
        return [this.pos,this.size];
    }
    mod(n, m) {
        return ((n % m) + m) % m;
    }
    bounce_x(ar){
        var arb = [];
        for(var i = 0; i<this.num;i++)
        {
            arb.push(this.pos[0]+this.size[0] - Math.abs(this.size[0]- this.mod(ar[i]-this.pos[0] , 2*this.size[0])));
        }
        return tf.tensor(arb)
    }

    bounce_y(ar){
        var arb = [];
        for(var i = 0; i<this.num;i++){
            arb.push(this.pos[1]+this.size[1] - Math.abs(this.size[1]- this.mod(ar[i]-this.pos[1] , 2*this.size[1])));
        }
        return tf.tensor(arb);
    }

    move_people(displacement)
    {
        var sum_x = tf.tidy(()=>tf.add(this.p_x,displacement[0]));
        var sum_y = tf.tidy(()=>tf.add(this.p_y,displacement[1]));
        this.p_x.dispose()
        this.p_y.dispose()
        this.p_x = tf.tidy(()=>this.bounce_x((sum_x).arraySync()));
        this.p_y = tf.tidy(()=>this.bounce_x((sum_y).arraySync()));  
        sum_x.dispose()
        sum_y.dispose()             
        this.now = this.now + 0.1;
    }

    update_state(r,t,p_r,p_t)
    {
        var inf_cur = tf.tidy(()=>{
            var zeros = tf.zeros([this.num])
            var ones = tf.fill([this.num],1)
            var dummy = tf.fill([this.num],-100)
            var index = tf.range(0,this.num,1)
            var state_t = tf.tensor(this.p_state)
            var sus_x =  tf.where(tf.equal(state_t,zeros),this.p_x,dummy);
            var sus_y =  tf.where(tf.equal(state_t,zeros),this.p_y,dummy);
            var inf =  tf.where(tf.equal(state_t,ones),index,dummy);
            var inf_cur = []
            for(let i =0; i<inf.size;i++)
            {
                var id = tf.slice(inf,i,1).dataSync()[0]
                if(id!=-100)
                {
                    var x_inf = tf.fill([this.num],tf.slice(this.p_x,id,1).dataSync());
                    var y_inf = tf.fill([this.num],tf.slice(this.p_y,id,1).dataSync()); 
                    var result = tf.where(tf.greater(tf.sub(r*r,tf.add(tf.squaredDifference(sus_x,x_inf),tf.squaredDifference(sus_y,y_inf))),tf.zeros([this.num])),index,dummy)
                    inf_cur = inf_cur.concat(result.arraySync())
                    if(this.now-this.p_inf_time[id] >= t)
                    {
                        this.p_state[id]=1+tf.multinomial(tf.tensor([1-p_t,p_t]),1).arraySync()[0]
                    }
                }
            }
            inf_cur = [].concat(...inf_cur)
            inf_cur = [...new Set(inf_cur.filter(item => item != -100))]
            return inf_cur
        })
        
        var x;
        for(x in inf_cur)
        {
            this.p_state[inf_cur[x]]=tf.tidy(()=>tf.multinomial(tf.tensor([1-p_r,p_r]),1).arraySync()[0]) //probability
            this.p_inf_time[inf_cur[x]]=this.now
        }
    }

    set_dest(max)
    {
        var dest_x = []
        var dest_y = []
        var i 
        var x 
        var y 
        for (i in [...Array(this.num).keys()])
        {
            x = tf.tidy(()=>tf.randomNormal([1],this.p_x.arraySync()[i],tf.randomUniform([1],0,max).arraySync()[0]).arraySync()[0]);
            y = tf.tidy(()=>tf.randomNormal([1],this.p_y.arraySync()[i],tf.randomUniform([1],0,max).arraySync()[0]).arraySync()[0]);
            dest_x.push(x);
            dest_y.push(y);
        }
        this.p_dest_x.dispose()
        this.p_dest_y.dispose()
        this.p_dest_x = tf.tidy(()=>tf.tensor(dest_x));
        this.p_dest_y = tf.tidy(()=>tf.tensor(dest_y));
        this.set_dest_bounds()
    }

    set_dest_bounds()
    {
        this.p_dest_x = tf.tidy(()=>this.bounce_x(this.p_dest_x.arraySync()));
        this.p_dest_y = tf.tidy(()=>this.bounce_y(this.p_dest_y.arraySync()));
    }

    move_to_dest(speed)
    {
        var s = tf.scalar(speed);
        var disp_x = tf.tidy(()=>tf.mul(s,tf.sub(this.p_dest_x,this.p_x)));
        var disp_y = tf.tidy(()=>tf.mul(s,tf.sub(this.p_dest_y,this.p_y)));
        this.move_people([disp_x,disp_y]);
        disp_x.dispose()
        disp_y.dispose()
        s.dispose()
    }
}