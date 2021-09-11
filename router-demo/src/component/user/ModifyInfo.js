import { Component } from "react";
import { Table, Space, Button, Pagination, Spin } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import api from "../../api/index";
import qs from "qs";
const columns = [
  {
    title: "员工姓名",
    dataIndex: "m_nikname",
    key: "m_nikname",
  },
  {
    title: "员工年龄",
    dataIndex: "m_age",
    key: "m_age",
  },
  {
    title: "员工工号",
    dataIndex: "m_account",
    key: "m_age",
  },
  {
    title: "联系方式",
    dataIndex: "m_tel",
    key: "m_tel",
  },
  {
    title: "操作",
    key: "action",
    render: (text, record, index) => (
      <Space size="middle">
        <Button
          style={{ display: btnCtrl.StaffInfo ? "block" : "none" }}
          type="primary"
          onClick={() => {
            MyProps.history.push({
              pathname: "/index/StaffInfo",
              state: record,
            });
          }}
        >
          查看
        </Button>
        <Button
          style={{ display: btnCtrl.StaffEdit ? "block" : "none" }}
          type="primary"
          onClick={() => {
            MyProps.history.push({
              pathname: "/index/StaffEdit",
              state: record,
            });
          }}
        >
          编辑
        </Button>
      </Space>
    ),
  },
];
var data = [];
var MyProps = "";
var btnCtrl = "";
@inject("user")
@observer
class ModifyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSizeOptions: [5, 10, 15, 20],
      haveDate: false,
      //pageSize:5,
      dataList: "",
      showList: "",
      pageTotle: "",
    };
  }
  componentWillMount() {
    if (
      sessionStorage.getItem("StaffInfo") &&
      sessionStorage.getItem("haveData")
    ) {
      // console.log('这是从sessionStorage拿数据')
      data = JSON.parse(sessionStorage.getItem("StaffInfo"));
      this.setState({
        haveDate: JSON.parse(sessionStorage.getItem("haveData")),
        pageTotle: data.length,
        showList: data.slice(0, this.state.pageSizeOptions[0]),
      });
    } else {
      // console.log('这是从服务器拿数据')
      axios({
        method: "post",
        url: api.user.StaffInfo,
        data: qs.stringify({ id: 1 }),
      }).then((res) => {
        data = res.data;
        this.setState({
          showList: res.data.slice(0, this.state.pageSizeOptions[0]),
        });
        //this.state.showList = res.data.slice(0, this.state.pageSizeOptions[0])
        // console.log('showList', this.state.showList)
        this.setState({
          haveDate: true,
          dataList: res.data,
          pageTotle: res.data.length,
          //showList:res.data.slice(0,this.state.pageSize)
        });
        sessionStorage.setItem("StaffInfo", JSON.stringify(res.data));
        sessionStorage.setItem("haveData", JSON.stringify("true"));
      });
    }
  }
  onChange(page, pageSize) {
    // console.log('this',this)
    this.setState({
      showList: data.slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      ),
    });
  }
  render() {
    MyProps = this.props;
    btnCtrl = this.props.user.btnCtrl;
    console.log("btnCtrl", btnCtrl);
    return this.state.haveDate ? (
      <>
        <Table
          columns={columns}
          dataSource={this.state.showList}
          pagination={false}
        />
        <Pagination
          style={{ textAlign: "center", marginTop: "20px" }}
          pageSizeOptions={this.state.pageSizeOptions} //指定每页可以显示多少条,数组形式
          //pageSize={this.state.pageSize}//每页显示多少条
          total={this.state.pageTotle} //数据总条数
          onChange={this.onChange.bind(this)} //页码或 pageSize 改变的回调，参数是改变后的页码及每页条数，function(page, pageSize)
          //onShowSizeChange={this.onShowSizeChange.bind(this)}//pageSize 变化的回调，function(current, size)
          showSizeChanger
          showQuickJumper
          defaultPageSize={5}
          showTotal={(total) => `总共 ${total} 页`}
        />
      </>
    ) : (
      <div className="example">
        <Spin />
      </div>
    );
  }
}
export default withRouter(ModifyInfo);
