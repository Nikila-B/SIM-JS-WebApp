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
        this.p_state = tf.zeros([1,0]);
        this.p_dest = tf.zeros([2,0]);
    }

    add_people(num,inf)
    {
        this.p_xy= tf.concat([this.p_xy,tf.concat(
                       [tf.randomUniform([1,num], this.size[0], 
                                        this.size[0]+this.size[0],'float32',123),
                        tf.randomUniform([1,num], this.size[1], 
                                        this.size[1]+this.size[1],'float32',123)]
                                        ,0)
                   ],1);

   this.p_xy.print();
        tf.concat([this.p_state,tf.multinomial(tf.tensor([.9,.1]),num)],1);
        this.num+=num;
    }


}