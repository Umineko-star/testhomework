const multer = require("multer");
// const storage=multer({
//     diskStorage:{}
// });
const storage = multer.diskStorage({
    destination:function (req,file,cb){

            console.log(file)
        cb(null,'/Volumes/杂物间/webstudy/node/node/public/uploads');//用户保存上传文件
    },
    //给上传文件重命名，获取添加后缀名
    filename:function (req,file,cb){
        let fileFormat = (file.originalname).split(".");//[cake.jpg]
        cb(null,fileFormat[0]+'-'+Date.now()+"."+fileFormat[fileFormat.length-1]);

    }

});
const upload = multer({
    storage:storage
});
module.exports = upload;