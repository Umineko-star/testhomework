import React, { Component } from "react";
import { Table, Space, Button, Tooltip } from "antd";
import { inject, observer } from "mobx-react";
import axios from "axios";
import qs from "qs";
const { Column, ColumnGroup } = Table;
@inject("user")
@observer
class EnterpriseInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  getData = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "http://localhost:8888/getDataE.do",
      })
        .then((res) => {
          // console.log(res.data)
          this.setState({
            data: res.data,
          });
          resolve(res);
        })
        .catch((message) => message);
    });
  };
  componentDidMount() {
    // axios.get("http://localhost:8888/getData.do").then(function (res) {
    //     // console.log(response);
    //     // data=res.data
    //     this.setState({
    //         data:res.data
    //     })
    //     console.log(data)
    // })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .then(function () {
    //         // always executed
    //     });
    this.getData().then((res) => {
      // console.log(res)
    });
  }

  handleDelete(id) {
    // console.log(id)
    return new Promise((req, resp) => {
      axios({
        method: "post",
        url: "http://localhost:8888/deleteDataE.do",
        data: qs.stringify({ id: id }),
      })
        .then((res) => {
          console.log(res);
          alert(res.data);
          this.getData().then((res) => {
            // console.log(res)
          });
        })
        .catch((message) => message);
    });
  }
  addEnterprise() {
    this.props.history.push("/index/firm/AddEnterprise");
  }
  render() {
    console.log("this.props", this.props);
    return (
      <>
        <div>
          <Button
            style={{
              display: this.props.user.btnCtrl.AddEnterprise ? "block" : "none",
            }}
            type="primary"
            onClick={this.addEnterprise.bind(this)}
          >
            添加企业信息
          </Button>
          <Table dataSource={this.state.data}>
            <ColumnGroup
              title="企业名称"
              dataIndex="EnterpriseName"
              key="EnterpriseName"
              align="center"
              width="20%"
            ></ColumnGroup>
            <Column
              title="联系方式"
              dataIndex="EnterpriseTel"
              key="EnterpriseTel"
              align="center"
              width="20%"
            />
            <Column
              title="邮箱"
              dataIndex="EnterpriseEamil"
              key="EnterpriseEamil"
              align="center"
              width="20%"
            />
            <Column
              title="联系地址"
              dataIndex="EnterpriseAdress"
              key="EnterpriseAdress"
              align="center"
              width="40%"
            />

            <Column
              align="center"
              title="操作"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  {/*<a key="" onClick={this.findMessage.bind(this,record.EnterpriseId)}>查看</a>*/}
                  {/*<button onClick={this.handleDelete.bind(this,record.EnterpriseId)}>删除</button>*/}
                  <Tooltip title="删除">
                    <Button
                      type="primary"
                      danger
                      onClick={this.handleDelete.bind(
                        this,
                        record.EnterpriseId
                      )}
                    >
                      删除
                    </Button>
                  </Tooltip>
                </Space>
              )}
            />
          </Table>
        </div>
      </>
    );
  }
}

export default EnterpriseInformation;
