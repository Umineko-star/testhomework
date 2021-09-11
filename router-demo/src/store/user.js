import { observable, action, computed } from "mobx";
import api from "../api/index";
import axios from "../util/axios";
import qs from "qs";
import { FormatToTree } from "../util/routersTotree";
class user {
  user;
  token;
  @observable
  isLogin = false;
  btnCtrl = {};
  @observable searchData = [];
  @computed get user() {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    }
    return {};
  }
  set user(value) {
    console.log("value", value);
    sessionStorage.setItem("user", JSON.stringify(value));
  }

  @computed get token() {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    }
    return {};
  }
  set token(value) {
    // console.log('token',value)
    sessionStorage.setItem("token", JSON.stringify(value));
  }
  @action
  userLogin(userInfo) {
    //用户名，密码，记住密码
    //进行异步请求
    // console.log("stroe",userInfo)
    sessionStorage.clear();
    // console.log('user', this.user)
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: api.user.UserLogin,
        data: qs.stringify(userInfo),
      }).then((res) => {
        if (res.data === false) {
          // console.log('res.data',res.data)
          resolve(res.data);
        } else {
          console.log(res);
          //接受后台数据并添加menuChilds属性为[]
          res.data.data.menuInfo.map((item) => {
            item.menuChilds = [];
            //将请求回来的isContainChildren，menuIsShow属性的字符串类型转为boolean类型
            //这一步是必要的！！！
            item.isContainChildren = eval(item.isContainChildren.toLowerCase());
            item.menuIsShow = eval(item.menuIsShow.toLowerCase());
            //控制页面按钮
            if (!item.menuIsShow) {
              this.btnCtrl[item.pathname] = true;
            }
            // console.log("btnCtrl", this.btnCtrl);
            // console.log('item.isContainChildren',item.isContainChildren)
            // console.log('item.menuIsShow',item.menuIsShow)
          });
          // console.log('res.data.data.menuInfo',res.data.data.menuInfo)
          //引入util里的routersTotree.js将后台的路由树形结构化!!!
          res.data.data.menuInfo = FormatToTree(res.data.data.menuInfo);
          // console.log('axios',res)
          if (res.data.returnCode === 200) {
            this.user = res.data.data;
            this.token = res.data.token;
            resolve(res.data);
          } else {
            reject(res.data);
          }
        }
      });
    });
  }
}
export default new user();
