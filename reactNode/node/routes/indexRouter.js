const express = require("express");
const reactController = require("../controller/reactController");
const couponController = require("../controller/couponController");
const EController = require("../controller/EController");
const orderController = require("../controller/orderController");
const productController = require("../controller/productController");
const upload = require("../config/upload");
const router = express.Router();
//react登陆拦截
router.post("/Rlogin.do", reactController.getRoutesInfo);
//员工信息获取
router.post("/StaffInfo.do", reactController.getStaffInfo);
//员工信息修改
router.post("/StaffEdit.do", reactController.editStaffInfo);
//多条件搜索员工信息
router.post("/SearchStaff.do", reactController.searchStaffInfo);
//配置员工信息
router.post("/configPermissions.do", reactController.configPermissions);
//添加员工、
router.post("/StaffAdd.do", reactController.staffAdd);
//libiao 优惠券
router.get("/getCouponMsg.do", couponController.getCouponMsg);
router.post("/addCouponMsg.do", couponController.addCouponMsg);
//zhujiuyu 企业管理
//企业信息获取
router.get("/getDataE.do", EController.getDataE);
//留言信息获取
router.get("/getDataL.do", EController.getDataL);
//企业信息删除
router.post("/deleteDataE.do", EController.deleteDataE);
//留言信息删除
router.post("/deleteDataL.do", EController.deleteDataL);
//添加企业信息
router.post("/addEnterprise.do", EController.addData);

//weijian 产品管理
router.post("/getAllproduct.do", productController.getAllproduct);
router.post("/addproduct.do", productController.addproduct);
router.post(
  "/myupload.do",
  upload.single("myfile"),
  productController.myupload
);
router.post("/editproduct.do", productController.editproduct);
//liheiwei 订单管理
router.post("/OrderList.do", orderController.init);
router.post("/OrderDetails.do", orderController.initDetails);
router.post("/DeleteOrder.do", orderController.deleteOrder);
module.exports = router;
