import { Component } from "react";
import { Layout } from "antd";
import { Alert } from "antd";
import { inject, observer } from "mobx-react";
import "./App.css";
import "whatwg-fetch";
// import api  from '../api'
import { Form, Input, Button, Checkbox } from "antd";
const { Header, Footer, Content } = Layout;
@inject("user")
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  render() {
    const onFinish = (values) => {
      // console.log('Success:', values);
      this.props.user
        .userLogin(values)
        .then((data) => {
          // console.log('0000')
          console.log("this.props", data);
          if (data === false) {
            this.setState({
              isShow: true,
            });
            setTimeout(() => {
              this.setState({
                isShow: false,
              });
            }, 3000);
          } else {
            this.props.history.push("/index");
          }
        })
        .catch((message) => {
          console.log(message);
        });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout className="container">
          <div style={{ display: this.state.isShow ? "block" : "none" }}>
            <Alert
              className="alert"
              message="Error"
              description="您输入的用户不存在，请重新输入"
              type="error"
              showIcon
            />
          </div>
          <Header className="header">美食后台管理系统</Header>
          <Content className="loginContent">
            <Form
              className="content-from"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                className="form-item"
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入您的用户名" }]}
              >
                <Input className="contentInput" />
              </Form.Item>

              <Form.Item
                className="form-item"
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入你的密码" }]}
              >
                <Input.Password className="contentInput" />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  登陆
                </Button>
              </Form.Item>
            </Form>
          </Content>
          <Footer className="footer">
            I am currently using DatePicker Component of antd for displaying
          </Footer>
        </Layout>
      </>
    );
  }
}
export default Login;
