const dbpool=require('../config/dbconfig')


EController={
    //企业表获取信息
    getDataE(req,resp){
        dbpool.connect("select * from enterprise_t",[null],(err,data)=>{
            if (!err){
                // console.log(data)
                resp.send(data)
            }
        })
    },
    //企业删除信息
    deleteDataE(req,resp){
        console.log(req.body.id)
        let id=req.body.id
        dbpool.connect('delete from enterprise_t where EnterpriseId=?',[id],(err,data)=>{
            if (!err){
                resp.send('删除成功')
            }
        })
    },
    //留言表获取信息
    getDataL(req,resp){
        dbpool.connect("select * from leave_words",[null],(err,data)=>{
            if (!err){
                // console.log(data)
                resp.send(data)
            }
        })
    },
    //留言信息删除
    deleteDataL(req,resp){
        console.log(req.body.id)
        let id=req.body.id
        dbpool.connect('delete from leave_words where l_id=?',[id],(err,data)=>{
            if (!err){
                resp.send('删除成功')
            }
        })
    },
    //添加企业信息
    addData(req,resp){
        console.log(req.body.name)
        let name=req.body.name;
        let phone=req.body.phone;
        let email=req.body.address;
        let address=req.body.address;
        dbpool.connect("insert into enterprise_t value (?,?,?,?,?)",[null,name,phone,email,address],(err,data)=>{
            if (!err){
                resp.send('添加成功')
            }
        })
    }
}

module.exports=EController;