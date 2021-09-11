const db = require('../config/dbconfig')

const Dao={
  init(sql,params,callback){
    db.connect(sql,params,(err,data)=>{
      if (!err){
        if (data.length>0){
          callback(data)
        }

      }else {
        callback(err.message)
      }
    })
  },
  details(sql,params,callback){
    db.connect(sql,params,(err,data)=>{
      if (!err){
        if (data.length>0){
          callback(data)
        }
      }else {
        callback(err.message)
      }
    })
  },
  delete(sql,params,callback){
    db.connect(sql,params,(err,data)=>{
      if (!err){
        if (data.length>0){
          callback(data)
        }
      }else {
        callback(err.message)
      }
    })
  }
}
module.exports=Dao