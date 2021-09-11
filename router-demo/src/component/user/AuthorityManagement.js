import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Checkbox, Row, Col, Input, Button, Divider } from "antd";
import axios from "../../util/axios";
import qs from "qs";
import api from "../../api/index";
class AuthorityManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routesList: [],
      staffNum: "",
      value1: "", //员工管理权限
      value2: "", //优惠券管理权限
      value3: "", //订单管理权限
      value4: "", //企业管理权限
      value5: "", //产品管理权限
      value6: "", //用户管理
    };
  }

  getChangeUser(e) {
    // console.log("this", this);
    this.setState({
      staffNum: e.target.value,
    });
  }
  //配置员工权限
  configPermissions() {
    this.setState(
      {
        routesList: this.state.routesList.concat(
          this.state.value1,
          this.state.value2,
          this.state.value3,
          this.state.value4,
          this.state.value5
        ),
      },
      () => {
        let arr = this.state.routesList
          .filter((item) => item !== "")
          .toString();
        // console.log("arr", arr);
        if (arr.length < 0 || this.state.StaffNum === "") {
          alert("员工工号和权限配置不能为空！！！");
        } else {
          const { staffNum } = this.state;
          let obj = {
            m_account: staffNum,
            m_routes: arr,
          };
          // console.log("obj", obj);
          axios({
            method: "post",
            url: api.user.configPermissions,
            data: qs.stringify(obj),
          }).then((res) => {
            if (res.data) {
              alert("修改成功");
              this.props.history.go(-1);
            } else {
              alert("修改失败");
            }
          });
        }
      }
    );

    //this.state.routesList = this.state.routesList.concat(this.state.value1,this.state.value2,this.state.value3).toString()
  }

  onChange(checkedValues) {
    if (checkedValues) {
      //员工管理
      checkedValues.push("1");
    }
    this.setState({
      value1: checkedValues,
    });

    // this.state.value1 = checkedValues
  }
  onChangeOne(value1) {
    if (value1) {
      value1.push("9");
    }
    this.setState({
      value2: value1,
    });
    //this.state.value2 = value1
  }
  onChangeTwo(value2) {
    if (value2) {
      value2.push("19");
    }
    this.setState({
      value3: value2,
    });
    //this.state.value3 = value2
  }
  onChangeThree(value3) {
    if (value3) {
      value3.push("14");
    }
    this.setState({
      value4: value3,
    });
  }
  onChangeFour(value4) {
    if (value4) {
      value4.push("22");
    }
    this.setState({
      value5: value4,
    });
  }
  onChangeFive(value5) {
    if (value5) {
      value5.push("26");
    }
    this.setState({
      value6: value5,
    });
  }

  render() {
    return (
      <>
        <Input
          style={{ width: "260px" }}
          placeholder="请输入员工工号"
          onChange={this.getChangeUser.bind(this)}
        />
        <Divider />
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onChange.bind(this)}
        >
          <h3>员工管理</h3>
          <Row>
            <Col span={6}>
              <Checkbox value="2">查询员工</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="3">员工信息列表</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="6">编辑员工信息</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="5">查看详情</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="7">添加员工</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>

        <Divider />
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onChangeFive.bind(this)}
        >
          <h3>用户管理</h3>
          <Row>
            <Col span={6}>
              <Checkbox value="27">用户列表</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="28">用户订单</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="29">用户评论</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="30">用户优惠券</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="31">用户地址</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>

        <Divider />
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onChangeOne.bind(this)}
        >
          <h3>优惠券管理</h3>
          <Row>
            <Col span={6}>
              <Checkbox value="10">新增优惠券</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="11">预发优惠券</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="12">现行优惠券</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="13">失效优惠券</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Divider />

        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onChangeThree.bind(this)}
        >
          <h3>企业管理</h3>
          <Row>
            <Col span={6}>
              <Checkbox value="15">企业信息</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="16">企业留言</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="17">新增企业</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="18">企业留言详情</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Divider />

        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onChangeFour.bind(this)}
        >
          <h3>产品管理</h3>
          <Row>
            <Col span={6}>
              <Checkbox value="23">添加产品</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="24">产品种类</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="25">编辑产品</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Divider />

        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={this.onChangeTwo.bind(this)}
        >
          <h3>订单管理</h3>
          <Row>
            <Col span={6}>
              <Checkbox value="20">订单列表</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value="21">订单详情</Checkbox>
            </Col>
          </Row>
          <div
            style={{ float: "right", marginRight: "15%", marginTop: "40px" }}
          >
            <Button type="primary" onClick={this.configPermissions.bind(this)}>
              提交
            </Button>
          </div>
        </Checkbox.Group>
      </>
    );
  }
}

export default withRouter(AuthorityManagement);
