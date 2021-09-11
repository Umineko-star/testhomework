const mysql = require('mysql');
const dbpool = {
    pool:{},
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root1234',
        database:'react_cake'
    },
    create(){
       // console.log('创建连接池');
        this.pool=mysql.createPool(this.config);
        //console.log(this.pool);
    },
    connect(sql,arr,fn){
        this.pool.getConnection((err,connection)=>{
            //sql语句 sql参数 回调函数
            connection.query(sql,arr,fn);
            connection.release();
        })
    }
}
dbpool.create();
module.exports=dbpool;