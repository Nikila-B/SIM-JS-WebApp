class Box
{
    constructor(name,size,pos)
    {
        if (typeof(size) === typeof(1))
            size = [size,size];
        if (typeof(pos) === typeof(1))
            pos = [pos,pos];
        this.name = name;
        this.size = size;
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
        var p_x_copy = this.p_x.clone()
        var p_y_copy = this.p_y.clone()
        this.p_x.dispose()
        this.p_y.dispose()
        this.p_x = tf.tidy(()=>tf.variable(tf.concat([p_x_copy,tf.randomUniform([num], this.pos[0], this.pos[0]+this.size[0],'float32')]),false));
        this.p_y = tf.tidy(()=>tf.variable(tf.concat([p_y_copy,tf.randomUniform([num], this.pos[1],this.pos[1]+this.size[1],'float32')]),false));
        p_x_copy.dispose()
        p_y_copy.dispose()
        for(let i =0; i<num;i++)
        {
            var i_s = Math.random()<=inf?1:0
            this.p_state.push(i_s)
            if (i_s===1)
                this.p_inf_time.push(this.now)
            else
                this.p_inf_time.push(-1)
        }
        this.num+=num;
    }
    get_info()
    {
        return tf.tidy(()=>tf.stack([this.p_x,this.p_y,tf.tensor1d(this.p_state)]).transpose().arraySync());
    }
    get_box_info()
    {
        return [this.pos,this.size];
    }
    bounce(dest,i)
    {
        let p=tf.scalar(this.pos[i])
        let s=tf.scalar(this.size[i])
        let b = p.add(s).sub(s.sub(dest.sub(p).mod(s.mul(2))).abs())
        dest.dispose()
        return b
    }
    move_people(displacement)
    {
        var sum_x = tf.tidy(()=>tf.add(this.p_x,displacement[0]));
        var sum_y = tf.tidy(()=>tf.add(this.p_y,displacement[1]));
        tf.tidy(()=>this.p_x.assign(this.bounce(sum_x,0)));
        tf.tidy(()=>this.p_y.assign(this.bounce(sum_y,1)));  
        this.now = this.now + 0.1;
    }

    update_state(r,t,p_r,p_t)
    {
        var inf_cur = tf.tidy(()=>{
            var dummy = tf.fill([this.num],-100)
            var index = tf.range(0,this.num,1)
            var inf = this.p_state.reduce((a,e,i)=> {if(e===1)a.push(i); return a},[])
            var sus = this.p_state.map((e,i)=>e===0)
            var sus_x =  tf.where(sus,this.p_x,dummy);
            var sus_y =  tf.where(sus,this.p_y,dummy);
            var inf_cur = new Set()
            for(let i =0; i<inf.length;i++)
            {   
                var id = inf[i]
                var x_inf = tf.slice(this.p_x,id,1)
                var y_inf = tf.slice(this.p_y,id,1)
                //calculating result this way is expensive
                //operations are performed on dummy values
                var result = tf.where(tf.greater(tf.sub(r*r,tf.add(tf.squaredDifference(sus_x,x_inf),tf.squaredDifference(sus_y,y_inf))),tf.zeros([this.num])),index,dummy)
                result.arraySync().filter(item=>item != -100).forEach(item=>inf_cur.add(item))
                if(this.now-this.p_inf_time[id] >= t)
                {
                    this.p_state[id]=Math.random()<=p_t?2:1;
                }
                
            }
            
            return inf_cur
        })
        for(let x of inf_cur)
        {
            this.p_state[x]=Math.random()<=p_r?1:0 //probability
            this.p_inf_time[x]=this.now
        }
    }

    set_dest(max)
    {
        var dest_x = []
        var dest_y = []
        for (let i =0;i<this.num;i++)
        {
            dest_x.push(tf.tidy(()=>tf.randomNormal([1],this.p_x.arraySync()[i],Math.random()*max).arraySync()[0]));
            dest_y.push(tf.tidy(()=>tf.randomNormal([1],this.p_y.arraySync()[i],Math.random()*max).arraySync()[0]));
            //dest_x.push(this.pos[0]+this.size[0]*Math.random());
            //dest_y.push(this.pos[0]+this.size[0]*Math.random());
        }
        this.p_dest_x.dispose()
        this.p_dest_y.dispose()
        this.p_dest_x = tf.tidy(()=>tf.tensor1d(dest_x));
        this.p_dest_y = tf.tidy(()=>tf.tensor1d(dest_y));
        this.set_dest_bounds()
    }

    set_dest_bounds()
    {
        this.p_dest_x = tf.tidy(()=>this.bounce(this.p_dest_x,0));
        this.p_dest_y = tf.tidy(()=>this.bounce(this.p_dest_y,1));
    }

    move_to_dest(speed)
    {
        var s = tf.scalar(speed);
        var disp_x = tf.tidy(()=>s.mul(this.p_dest_x.sub(this.p_x)));
        var disp_y = tf.tidy(()=>s.mul(this.p_dest_y.sub(this.p_y)));
        this.move_people([disp_x,disp_y]);
        disp_x.dispose()
        disp_y.dispose()
        s.dispose()
    }
}