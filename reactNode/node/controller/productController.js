const dbpool = require("../config/dbconfig");

const product = {
  //获取全部产品信息
  getAllproduct(req, res) {
    dbpool.connect(
      "SELECT  DISTINCT *   FROM productall_t JOIN product_t  JOIN producttype_t JOIN specifications_t\n" +
        "ON productall_t.ProductId=product_t.ProductId\n" +
        "&&productall_t.ProductCategoryId=producttype_t.ProductCategoryId\n" +
        "&&productall_t.SpecificationsId=specifications_t.SpecificationsId ORDER BY ProductOtherId  ASC",
      [],
      (err, data) => {
        // console.log(data)
        data = JSON.stringify(data);
        res.send(data);
      }
    );
  },

  //添加产品
  addproduct(req, res) {
    let addproductmessage = req.body.addproductMessage;
    console.log(addproductmessage);
    let productkind = [
      { cake: "蛋糕", id: 1 },
      { cake: "冰淇淋", id: 2 },
      { cake: "咖啡下午茶", id: 3 },
      { cake: "冻与焗/轻蛋糕", id: 4 },
      { cake: "设计师礼品", id: 5 },
    ];
    let productkindID = productkind.filter((item, index) => {
      return addproductmessage[0].productkind === item.cake;
    })[0].id;
    console.log(productkindID);
    let productguige = addproductmessage[0].productguige + "g";
    new Promise((resolve, reject) => {
      dbpool.connect(
        "INSERT INTO specifications_t VALUES(NULL,?,?)",
        [productguige, addproductmessage[0].productkucun],
        (err, data) => {
          if (!err) {
            // console.log(data.insertId)
            resolve(data.insertId);
          } else {
            console.log(err);
          }
        }
      );
    }).then((res) => {
      // console.log(res)
      new Promise((resolve, reject) => {
        dbpool.connect(
          "INSERT INTO product_t VALUES(NULL,NULL,?,?,?,?,?,?,?,?)",
          [
            addproductmessage[0].productname,
            addproductmessage[0].productyuanjia,
            addproductmessage[0].productxianjia,
            addproductmessage[0].productImg,
            addproductmessage[0].productdes,
            addproductmessage[0].productmydate,
            addproductmessage[0].productkouwei[1],
            addproductmessage[0].productbaozhiqi,
          ],
          (err, data) => {
            if (!err) {
              let arrid = [res, data.insertId];
              arrid = JSON.stringify(arrid);
              console.log(arrid);
              resolve(arrid);
            } else {
              console.log(err);
            }
          }
        );
      }).then((res) => {
        let res1 = JSON.parse(res);
        dbpool.connect(
          "INSERT INTO productall_t  VALUES(NULL,?,?,?)",
          [res1[1], res1[0], productkindID],
          (err, data) => {
            if (!err) {
              console.log("添加成功");
            }
          }
        );
      });
    });
  },

  //编辑产品
  editproduct(req, res) {
    let addproductmessage = req.body.addproductMessage;
    console.log(addproductmessage);
    let productkind = [
      { cake: "蛋糕", id: 1 },
      { cake: "冰淇淋", id: 2 },
      { cake: "咖啡下午茶", id: 3 },
      { cake: "冻与焗/轻蛋糕", id: 4 },
      { cake: "设计师礼品", id: 5 },
    ];
    let productkindID = productkind.filter((item, index) => {
      return addproductmessage[0].productkind === item.cake;
    })[0].id;
    console.log(productkindID);
    let productguige = addproductmessage[0].productguige + "g";
    new Promise((resolve, reject) => {
      dbpool.connect(
        "UPDATE specifications_t  SET ProductSize=?,ProductNum=?  WHERE SpecificationsId=?",
        [
          productguige,
          addproductmessage[0].productkucun,
          addproductmessage[0].SpecificationsId,
        ],
        (err, data) => {
          if (!err) {
            // console.log(data.insertId)
            console.log(data);
            resolve(data);
          } else {
            console.log(111111111);
            console.log(err);
          }
        }
      );
    }).then((res) => {
      // console.log(res)
      new Promise((resolve, reject) => {
        dbpool.connect(
          "UPDATE product_t  SET ProductName=?,OriginalPrice=?,MemberPrice=?,ProductSrc=?,ProductDes=?,ShelfTime=? ,kouwei=?,baozhiqi=? WHERE ProductId=?",
          [
            addproductmessage[0].productname,
            addproductmessage[0].productyuanjia,
            addproductmessage[0].productxianjia,
            addproductmessage[0].productImg,
            addproductmessage[0].productdes,
            addproductmessage[0].productmydate,
            addproductmessage[0].productkouwei[1],
            addproductmessage[0].productbaozhiqi,
            addproductmessage[0].ProductId,
          ],
          (err, data) => {
            if (!err) {
              resolve("修改成功");
            } else {
              console.log(2222222222);
              console.log(err);
            }
          }
        );
      });
    });
  },

  //图片请求
  myupload(req, resp) {
    console.log("图片请求成功");
    let pathname = "uploads/" + req.file.filename;
    let picName = req.file.originalname.split(".")[0]; //获取源文件名的前部分cake.jpg[cake,jpg]
    // console.log(pathname)
    // console.log(picName)
    // console.log(pathname)
    // console.log(req.file.originalname)
    resp.send(pathname);
  },
};

module.exports = product;
