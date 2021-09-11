import { Component } from "react";
import { Layout } from "antd";
// import { Route } from "react-router-dom"
import LeftMenu from "../component/LeftMenu";
// import StaffInfo from "../component/staff/StaffInfo";
// import StaffEdit from "../component/staff/StaffEdit"
import { Popconfirm } from "antd";
import { withRouter } from "react-router-dom";
import "../asset/Home.css";
import { inject, observer } from "mobx-react";
import NewBreadcrumb from "../component/NewBreadcrumb";
import { UserOutlined, ImportOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
@inject("user")
@observer
class Home extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };
  loginOut() {
    sessionStorage.clear();
    this.props.user.btnCtrl = {};
    console.log("this.props.user.btnCtrl", this.props.user.btnCtrl);
    this.props.history.push("/Login");
  }
  staffInfo() {
    let user = JSON.parse(sessionStorage.getItem("user")).userInfo;
    console.log("user", user);
    this.props.history.push({ pathname: "/index/userInfo", state: user });
  }
  render() {
    // console.log(this.props)
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          {/* 左边菜单栏 */}
          <LeftMenu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="IconBox">
              <UserOutlined
                className="myIcon"
                onClick={this.staffInfo.bind(this)}
              />
              <Popconfirm
                title="您确定要退出吗？"
                onConfirm={this.loginOut.bind(this)}
                okText="Yes"
                cancelText="No"
              >
                <ImportOutlined className="myIcon" />
              </Popconfirm>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            {/* 面包屑 */}
            <NewBreadcrumb></NewBreadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {/* 右边内容 */}
              {/* <Route path='/index/StaffInfo' component={StaffInfo}></Route>
              <Route path='/index/StaffEdit' component={StaffEdit}></Route> */}
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Cake_Manager ©2021 Created by w256 Five Team
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Home);
