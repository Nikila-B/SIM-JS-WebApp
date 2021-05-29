class Box
{
    constructor(name,size,pos)
    {
        this.name = name;
        if (typeof(size) === typeof(1))
            size = [size,size];
        this.size = size;
        this.pos = pos;
        this.num = 0;
        this.inf_c = 0;
        this.sus_c = 0;
        this.rec_c = 0;
        this.now = 0;
        this.p_xy = tf.zeros([2,0]);
        this.p_state = []
        this.p_dest = tf.zeros([2,0]);
        this.p_inf_time = []
    }

    add_people(num,inf)
    {
        this.p_xy= tf.concat([this.p_xy,tf.concat(
                       [tf.randomUniform([1,num], this.pos[0], 
                                        this.pos[0]+this.size[0],'float32'),
                        tf.randomUniform([1,num], this.pos[1], 
                                        this.pos[1]+this.size[1],'float32')]
                                        ,0)
                   ],1);
        this.p_state=tf.concat([tf.tensor(this.p_state),tf.multinomial(tf.tensor([.9,.1]),num)],1).reshape([1,num]).arraySync();
        this.num+=num;
    }
    get_info(){
        return tf.concat([this.p_xy,this.p_state],0).transpose().arraySync();
    }
    get_box_info(){
        return [this.pos,this.size];
    }
    
    bounce_x(ar){
        var arb = [];
        for(var i = 0; i<this.num;i++){
            arb.push(this.pos[0]+this.size[0] - Math.abs(this.size[0]- ((ar[i]-this.pos[0]) % (2*this.size[0]))));
        }
        return tf.tensor(arb,[1,this.num])
    }

    bounce_y(ar){
        var arb = [];
        for(var i = 0; i<this.num;i++){
            arb.push(this.pos[1]+this.size[1] - Math.abs(this.size[1]- ((ar[i]-this.pos[1]) % (2*this.size[1]))));
        }
        return tf.tensor(arb,[1,this.num]);
    }

    move_people(displacement)
    {
        var sum = tf.add(this.p_xy , displacement);
        this.p_xy = tf.concat([this.bounce_x(tf.gather(sum, 0).arraySync()),
                               this.bounce_y(tf.gather(sum ,1).arraySync())],0);
        this.now = this.now + 0.1;
    }
}