const Dao = require('../dao/orderDao')

const Controller={
  init(req,res){
    let sql='select * from userorder_t';
    let params=[] ;
    Dao.init(sql,params,(result)=>{
      console.log(result)
      res.send(result)
    })
  },
  initDetails(req,res){
    let id = req.body.id
    let sql='SELECT product_t.* FROM userorder_t LEFT JOIN product_t  ON userorder_t.userorder_id=? AND userorder_t.ProductId=product_t.ProductId';
    let params=[id] ;
    Dao.details(sql,params,(result)=>{
      res.send(result[0])
    })
  },
  deleteOrder(req,res){
    let id = req.body.id
    let sql='delete from userorder_t where userorder_id in (?)';
    let params = [id];
    console.log(params);
    Dao.delete(sql,params,(result)=>{
      console.log(result)
      res.send(result)
    })
  },
}
module.exports=Controller