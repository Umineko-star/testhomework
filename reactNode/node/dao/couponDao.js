const dbPool = require('../config/dbconfig');
const fs = require('fs')
const path = require('path')
const couponDao ={
    getCouponMsg(sql,params,callback){
        dbPool.connect(sql,
            params,
            (err,data)=>{
                if(!err){
                    callback(data);
                }else{
                    callback(err.message);
                }
            })
    },
    addCouponMsg (sql,params,callback) {
        dbPool.connect(sql,
            params,
            (err,data)=>{
                if(!err){
                    callback("success");
                }else{
                    callback(err.message);
                }
            })
    },
    updateUserMsg (sql, params, callback) {
        dbPool.connect(sql,
            params,
            (err,data)=>{
                if(!err){
                    callback("success");
                }else{
                    callback(err.message);
                }
            })
    },
    deleteUserMsg (sql, params, callback, user_headImg) {
        dbPool.connect(sql,
            params,
            (err,data)=>{
                if(!err){
                    // fs.unlinkSync('./public/uploads/'+user_headImg)
                    try{
                        fs.unlinkSync(path.join(__dirname,'../../node/public/uploads/'+user_headImg));
                        console.log('successfully deleted');
                    }catch(err){
                        console.log('err ocurred');
                        console.log(err);
                    }
                    callback("success");
                }else{
                    callback(err.message);
                }
            })
    },
    deleteChoiceMsg (sql, params, callback, user_headImgArr) {
        dbPool.connect(sql,
            params,
            (err,data)=>{
                if(!err){
                    try{
                        user_headImgArr.map((item) => {
                            fs.unlinkSync(path.join(__dirname,'../../node/public/uploads/'+item));
                        })
                        console.log('successfully deleted');
                    }catch(err){
                        console.log('err ocurred');
                        console.log(err);
                    }
                    callback("success");
                }else{
                    callback(err.message);
                }
            })
    }
}
module.exports=couponDao;