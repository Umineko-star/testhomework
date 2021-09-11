import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Upload,
} from "antd";
import { observer, inject } from "mobx-react";
import { UploadOutlined } from "@ant-design/icons";
const fileList = [];
@inject("productStore")
@observer
class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue1: "",
      selectValue2: "",
      selectValue3: "",
      imgUrl: "",
    };
  }

  componentWillMount() {
    // console.log(this.props.location.state.ProductId)
  }

  //提交按钮
  onFinish = (values) => {
    let productname = document.getElementById("myname").value;
    let productkind = this.state.selectValue1;
    let productbaozhiqi = this.state.selectValue2;
    let productyuanjia = document.getElementById("yuanjia").value;
    let productxianjia = document.getElementById("xianjia").value;
    let productguige = document.getElementById("guige").value;
    let productkucun = document.getElementById("kucun").value;
    let productkouwei = this.state.selectValue3;
    let productImg = this.state.imgUrl;
    let productmydate = document.getElementById("mydate").value;
    let productdes = document.getElementById("productdes").value;
    let addproductMessage = [
      {
        productname: productname,
        productkind: productkind,
        productbaozhiqi: productbaozhiqi,
        productyuanjia: productyuanjia,
        productxianjia: productxianjia,
        productguige: productguige,
        productkucun: productkucun,
        productkouwei: productkouwei,
        productmydate: productmydate,
        productdes: productdes,
        productImg: productImg,
      },
    ];
    console.log(addproductMessage);
    // console.log(productkouwei)
    console.log("Success:", values);
    if (window.confirm("确认添加吗？")) {
      this.props.productStore.addproduct(addproductMessage).then((res) => {
        console.log(res);
      });
      this.props.history.push("/index/productKind");
    }
  };

  //取消按钮
  quxiao = () => {
    console.log("取消");
    this.props.history.go(0);
  };

  handleUpload = (info) => {
    console.log(info);
    let that = this;
    if (info.file.status === "done") {
      console.log(info.file.response);
      this.state.imgUrl = info.file.response;
    } else if (info.file.status === "error") {
      console.log("上传失败");
    }
  };
  onChange = (info) => {
    // console.log(5555)
    let that = this;
    if (info.file.status === "done") {
      console.log("上传成功");
    } else if (info.file.status === "error") {
      console.log("上传失败");
    }
  };
  render() {
    return (
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          onFinish={this.onFinish}
          layout="horizontal"
        >
          <Form.Item
            rules={[
              { required: false, message: "Please input your username!" },
            ]}
            label="产品名称"
          >
            <Input id="myname" allowClear="true" />
          </Form.Item>
          <Form.Item
            label="产品类型"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              defaultValue=""
              onChange={(value) => {
                this.setState({
                  selectValue1: value,
                });
              }}
            >
              <Select.Option value="蛋糕">蛋糕</Select.Option>
              <Select.Option value="冰淇淋">冰淇淋</Select.Option>
              <Select.Option value="咖啡下午茶">咖啡下午茶</Select.Option>
              <Select.Option value="冻与焗/轻蛋糕">冻与焗/轻蛋糕</Select.Option>
              <Select.Option value="设计师礼品">设计师礼品</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="保质期" width="200">
            <Select
              defaultValue=""
              onChange={(value) => {
                this.setState({
                  selectValue2: value,
                });
              }}
            >
              <Select.Option value="一个星期">一个星期</Select.Option>
              <Select.Option value="两个星期">两个星期</Select.Option>
              <Select.Option value="三个星期">三个星期</Select.Option>
              <Select.Option value="一个月">一个月</Select.Option>
              <Select.Option value="两个月">两个月</Select.Option>
              <Select.Option value="三个月">三个月</Select.Option>
              <Select.Option value="六个月">六个月</Select.Option>
              <Select.Option value="十二个月">十二个月</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="产品原价">
            <Input id="yuanjia" name="555" llowClear="true" />
          </Form.Item>
          <Form.Item label="产品现价">
            <Input id="xianjia" llowClear="true" />
          </Form.Item>
          <Form.Item label="产品图片">
            <Upload
              action="/myupload.do"
              name="myfile"
              onChange={(e) => this.handleUpload(e)}
              listType="picture"
              defaultFileList={[...fileList]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="产品规格">
            <Input id="guige" llowClear="true" />
          </Form.Item>
          <Form.Item label="库存">
            <InputNumber id="kucun" />
          </Form.Item>
          <Form.Item label="产品口味">
            <Cascader
              id="kouwei"
              onChange={(value) => {
                this.setState({
                  selectValue3: value,
                });
              }}
              options={[
                {
                  value: "蛋糕",
                  label: "蛋糕",
                  children: [
                    {
                      value: "乳脂奶油",
                      label: "乳脂奶油",
                    },
                    {
                      value: "慕斯",
                      label: "慕斯",
                    },
                    {
                      value: "乳酪",
                      label: "乳酪",
                    },
                    {
                      value: "巧克力",
                      label: "巧克力",
                    },
                    {
                      value: "坚果",
                      label: "坚果",
                    },
                    {
                      value: "水果",
                      label: "水果",
                    },
                    {
                      value: "咖啡",
                      label: "咖啡",
                    },
                    {
                      value: "应季",
                      label: "应季",
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="上架时间">
            <DatePicker id="mydate" />
          </Form.Item>
          <Form.Item
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
            label="产品描述"
          >
            <Input.TextArea
              id="productdes"
              placeholder="请输入要产品所需要的描述"
              allowClear="true"
            />
          </Form.Item>
          <Form.Item style={{ margin: "0 320px" }}>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
            <Button
              htmlType="button"
              type="primary"
              style={{ margin: "0 30px" }}
              onClick={this.quxiao.bind(this)}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ProductAdd;
