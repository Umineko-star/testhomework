const Dao = require("../dao/couponDao");
couponController = {
  getCouponMsg(req, res) {
    console.log("++++++++++++++");
    let sql = "select * from coupon_t";
    let params = [];
    Dao.getCouponMsg(sql, params, (callback) => {
      res.send(callback);
    });
  },
  addCouponMsg(req, res) {
    let newCoupon = req.body;
    let sql =
      "insert into coupon_t(coupon_name,coupon_circulation,coupon_validity,coupon_callableUser,coupon_restrictGet,coupon_restrictUse,coupon_faceValue,coupon_canUse) values(?)";
    let params = [];
    // console.log(req.body)
    for (let item in newCoupon) {
      params.push(newCoupon[item]);
    }
    params = [params];
    Dao.addCouponMsg(sql, params, (callback) => {
      res.send(callback);
    });
  },
  updateUserMsg(req, res) {
    let updateUser = req.body;
    /*UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值*/
    let sql =
      "update user_t set user_name=?,user_pwd=?,user_sex=?,user_phone=?,user_email=?,user_address=?,user_remark=?,user_headImg=? where user_id=?";
    let params = [];
    for (let item in updateUser) {
      params.push(updateUser[item]);
    }
    Dao.updateUserMsg(sql, params, (callback) => {
      res.send(callback);
    });
  },
  deleteUserMsg(req, res) {
    let user_id = req.body.user_id;
    let sql = "delete from user_t where user_id=?";
    let params = [];
    let user_headImg = req.body.user_headImg;
    params.push(user_id);
    Dao.deleteUserMsg(
      sql,
      params,
      (callback) => {
        res.send(callback);
      },
      user_headImg
    );
  },
  deleteChoiceMsg(req, res) {
    let sql = "delete from user_t where user_id in (?)";
    let params = [req.body.delUser_idArr];
    let user_headImgArr = req.body.delUser_headImgArr;
    Dao.deleteChoiceMsg(
      sql,
      params,
      (callback) => {
        res.send(callback);
      },
      user_headImgArr
    );
  },
};

module.exports = couponController;
