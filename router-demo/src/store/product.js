import { observable, action } from "mobx";
import api from "../api/index";
import axios from "../util/axios";

class ProductStore {
  constructor() {
    this.product = [];
  }
  @observable product;

  @action
  getAllproduct = () => {
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: api.product.getAllproduct,
      }).then((res) => {
        console.log(res);
        resolve(res.data);
      });
    });
  };

  @action
  addproduct = (addproductMessage) => {
    console.log(addproductMessage);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: api.product.addproduct,
        data: { addproductMessage: addproductMessage },
      }).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  };

  @action
  myuploads = () => {
    console.log(555555);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: api.product.myuploads,
        // data:{addproductMessage:addproductMessage}
      }).then((res) => {
        console.log(res);
        resolve(res);
        this.product = res;
      });
    });
  };

  @action
  editproduct = (addproductMessage) => {
    console.log(addproductMessage);
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: api.product.editproduct,
        data: { addproductMessage: addproductMessage },
      }).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  };
}

export default new ProductStore();
