const dbpool = require ( '../config/dbconfig' )

const reactDao = {
    getRoutesInfo(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{            
            if( !err ) {  
                if(data.length>0){
                    cb(data)
                }  else{
                    cb(false)
                }                                                             
            }
        })
    },
    getRoutes(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{
            if(!err && data.length>0){
                cb(data)
            }else {
                cb(err)
            }
        })
    },

    getStaffInfo(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{
            if(!err){
                if(data.length>0) {
                    cb(data)
                }
            }else{
                cb(err)
            }
        })
    },
    editStaffInfo(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{
            if(!err){
                cb(true)
            }else{
                cb(err)
            }
        })
    },
    searchStaffInfo(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{
               if(!err){
                   if(data.length>0){
                       cb(data)
                   }else{
                       cb(false)
                   }
               }else{
                   cb(err)
               }
        })
    },
    configPermissions(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{
            if(!err){
                console.log('configPermissions',data)
                cb(true)
            }else{
                cb(err)
            }
        })
    },
    staffAdd(sql,params,cb){
        dbpool.connect(sql,params,(err,data)=>{
                if(!err){
                    cb('新增成功')
                }else{
                    cb(false)
                }
        })
    }
}

module.exports = reactDao