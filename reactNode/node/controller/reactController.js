const reactDao = require('../dao/reactDao')
const reactController = {
    getRoutesInfo(req, res) {
        let returnData = ''//验证用户权限并返回相应路由
        let userInfo = ''//用户信息
        //查询用户信息sql
        let usersql = 'select m_id,m_name,m_password,m_account,m_routes,m_age,m_tel,m_address,m_state,m_remarks,m_nikname from manager_t where m_name=? and m_password=?'
        //查询路由sql
        let routersql = 'select * from routes_t'
        let params = [req.body.username, req.body.password]
        //验证用户是否存在
        new Promise((resolve, reject) => {
            reactDao.getRoutesInfo(usersql, params, (result) => {              
                if (result) {
                    userInfo = result
                    resolve(result)
                }else{
                    console.log('result',result)
                    res.send(result)
                }
            })
        }).then(data => {//用户存在后拿路由返回前台
            // console.log('2222222222')
            // console.log('data',data)
            reactDao.getRoutes(routersql, [], (result) => {
                // console.log('result',result)
                //用户路由权限id拆分为相应数组
                let routesArr = userInfo[0].m_routes.slice(0, userInfo[0].m_routes.length).split(',')
                //用户权限对应路由展示数组
                let routersInfo = []
                //将用户拥有路由放入其数组
                routesArr.map(p => {
                    result.map(c => {
                        if (Number(p) === c.menuId) {
                            routersInfo.push(c)
                        }
                    })
                })
                //拷贝一份防止破坏原数组
                let myRoutersInfo = JSON.parse(JSON.stringify(routersInfo))
                // 返回前台的数据
                returnData = {
                    data: {
                        menuInfo: myRoutersInfo,
                        userInfo: userInfo[0]
                    },
                    token: '111',
                    returnCode: 200
                }
                // console.log(returnData)
                res.send(JSON.stringify(returnData))
            })
        })

    },
    getStaffInfo(req,res) {
        let sql = 'select m_id,m_name,m_account,m_age,m_tel,m_address,m_nikname,m_remarks,m_state from manager_t where m_id != ? limit 50'
        let params = [1]
        reactDao.getStaffInfo(sql,params,(result)=>{
            let InfoList = []            
             result.map(item=>{
                item.key = item.m_id
                InfoList.push(item)      
            })
            res.send(result)
        }) 
    },
    editStaffInfo(req,res) {
        // console.log(req.body)
        const { m_account,m_address,m_age,m_nikname,m_remarks,m_tel,m_id } = req.body
        let sql = 'update manager_t set m_account=?,m_address=?,m_age=?,m_nikname=?,m_remarks=?,m_tel=?,m_id=? where m_id=?'
        let params = [m_account,m_address,m_age,m_nikname,m_remarks,m_tel,m_id,m_id]
        reactDao.editStaffInfo(sql,params,(result)=>{
            // console.log('编辑成功',result)
            if(result){
                res.send(true)
            }else{
                res.send(false)
            }
        })
    },
    searchStaffInfo(req,res){
        let sql = "select m_id,m_name,m_account,m_age,m_tel,m_address,m_nikname,m_remarks,m_state from manager_t where 1=1 "
        let params = []
        for(let key in req.body){
            sql += ' and '+ [key] +'=?'
            params.push(req.body[key])
        }
        sql = sql + " and " + " m_id != 1 limit 50" 
        // console.log('sql',sql)
        // console.log('params',params)
        reactDao.searchStaffInfo(sql,params,(result)=>{
            // console.log('result',result)
            if(result.length>0){
                result.map(item=>{
                    item.key = item.m_id
                })    
                // console.log('+++++++++++++')
                // console.log('result',result)         
                res.send(result)
            }else{
                res.send(false)
            }

        })

    },
    configPermissions(req,res){
        // console.log('configPermissions',req.body)
        let sql = ' update manager_t set m_routes = ? where m_account = ?'
        let params = [req.body.m_routes,req.body.m_account]
        reactDao.configPermissions(sql,params,result=>{
            // console.log(result)
            if(result){
                res.send(true)
            }else{
                res.send(false)
            }            
        })
    },
    staffAdd(req,res){
        // console.log('staffAdd',req.body)
        const { m_account,m_address,m_name,m_password,m_remarks,m_routes,m_state,m_tel,nikname,m_age } = req.body
        let sql = 'insert into manager_t values (?,?,?,?,?,?,?,?,?,?,?)'
        let params = [null,m_name,m_account,m_password,m_routes,m_age,m_tel,m_address,m_state,m_remarks,nikname]
        // console.log('sql',sql)
        // console.log('params',params)
        reactDao.staffAdd(sql,params,(result)=>{
            if(result){
                res.send(true)
            }else{
                res.send(false)
            }
        })
    } 
}
module.exports = reactController