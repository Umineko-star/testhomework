const express = require('express');
const app = express();
const route = require("./routes/indexRouter");
const path = require("path");
//cookie session引入;
const cookie = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const favicon = require('serve-favicon');
const bodyparse = require('body-parser');
app.use(favicon(__dirname+"/public/images/bitbug_favicon.ico"));
//使用cookie
// app.use(session({
//     name:"demo",//cookie的名称，默认connect.sid
//     secret:"123",//密匙
//     cookie:{
//         maxAge:1000*60*60*24*45//cookie有效时间，以毫秒为单位
//     },
//     resave:true,//更新session-cookie失效的时间
//     rolling:true,// 更新保存
//     saveUninitialized:true
// }));
app.use(cookie());
//通用拦截
//允许跨域
app.use("*",(req,resp,next)=>{
    // resp.header("Access-Control-Allow-Origin", "*");//允许所有来源访问
    // resp.header("Access-Control-Allow-Headers", "X-Requested-With");//响应头的设置
    // resp.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//允许访问的形式
    // resp.header("Content-type","application/json;charset=utf-8");//服务器支持application/json
    resp.header("Access-Control-Allow-Origin","*");//允许所有来源访问
    resp.header("Access-Control-Allow-Headers","X-Requested-With");//响应头设置
    resp.header("Access-Control-Allow-Headers","Origin");//响应头设置
    resp.header("Access-Control-Allow-Headers","Content-Type");//响应头设置
    resp.header("Access-Control-Allow-Method","POST,GET,PUT,DELETE,OPTIONS");//允许访问的形式
    resp.header("Content-Type","application/json;charset=utf-8");//针对post请求

//Access-Control-Allow-Headers
    next();

})
// app.use("/",(req,res,next)=>{
//     //console.log("通用拦截"+req.session.username);
//     //console.log(req.headers.referer);
//     //console.log(req.path)
//     // console.log(req.url);
//     //判断用户是否登录
//     //如果用户已经登录的话 ， req.session.username 里面就会存有用户名
//     //可以把所有的状况都作为条件判断一个一个写（不推荐）
//     //req.headers.referer:是http请求Header中的一部分，当浏览器向服务器发送请求的时候，请求头一般需要包含referer,referer告诉服务器我是从哪个页面连接过来的
//     req.headers.referer= req.headers.referer||"";
//
//     if (req.session.username||req.path=="/mylogin.html"||req.headers.referer.match(/mylogin.html$/)){
//         //req.session.username 存在全局，让所有相关文件中都能使用
//         next();
//     }else {//用户未登录
//         req.session.preUrl = req.url;
//         res.redirect("/mylogin.html"); // “/”到根目录下去找login.html 否则 路径会在css/login.html
//     }
//
//
//
//
// });


app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public/html'));
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());




//====================EJS配置===============
app.set("views",path.join(__dirname,"views"));//视图文件路径；
app.set("view engine","ejs");//视图解析的引擎；

app.use(morgan('dev'));
app.use(route);





app.use((req,res)=>{
    res.status(404);
    //res.redirect("404.html");//重定向，将页面定向到指定的位置，跳转302
    /*302--跳转
    * 404
    * */
    res.sendFile(path.join(__dirname,"public","html","err404.html"))
})


app.set('port',8888);
app.listen(8888,(req,resp)=>{
console.log('helloworld');
})


//=====================================================
//引入websocket
// const ws = require("ws").Server;
// let server = new ws ({
//     host:"172.16.5.17",
//     port:8080
// });
// let arr = new Array();//存放链接的数组；
// server.on('connection',(ws)=>{
//     //每次与客户端连接，就会触发此事件  ws当前连接对象
//     console.log('登录成功');
//     arr.push(ws);//新链接压入数组；
//     ws.on('message',(data)=>{
//         //当收到发送的消息，触发data接受数据
//         for (let i=0;i<arr.length;i++){
//             //将收到的消息发送给其他用户
//             arr[i].send(data);//data为string类型，不能以字符串的类型发给用户；
//
//         }
//     })
// })